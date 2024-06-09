const { pool } = require("../config/dbConfig");
const express = require("express");
const { WebClient } = require("@slack/web-api");
const client_id = process.env.VITE_SLACK_CLIENT_ID;
const client_secret = process.env.SLACK_CLIENT_SECRET;
const redirect_uri = `${process.env.BACK_END_URL_SLACK}/auth/redirect`;
const client = new WebClient();
const frontendUrl = process.env.BACK_END_URL;
const reminderEmail = require("../services/reminder");
const {insertSignUp,updateTitle,createToken,getSignUpDetailsFromDatabase,cancelSignUp} = require("../services/user")
const app = express();

const slackSingUp = async (req, res) => {
  try {
    const { code } = req.query;
    console.log(redirect_uri);
    // Exchange the code for an OAuth token
    const result = await client.oauth.v2.access({
      code,
      client_id,
      client_secret,
      redirect_uri,
    });

    // Use the token to get user information
    const userProfile = await client.users.profile.get({
      user: result.authed_user.id,
      token: result.authed_user.access_token,
    });

    const existingUser = await executeQuery(
      "SELECT * FROM person WHERE slack_email = $1",
      [userProfile["profile"]["email"]]
    );

    let jwtToken = "";
    const role = userProfile["profile"]["title"].toLowerCase();

    if (existingUser.rows.length > 0) {
      //login
      if (
        existingUser.rows[0]["slack_firstname"] !==
          userProfile["profile"]["first_name"] ||
        existingUser.rows[0]["slack_photo_link"] !==
          userProfile["profile"]["image_original"] ||
        existingUser.rows[0]["slack_lastname"] !==
          userProfile["profile"]["last_name"]
      ) {
        updateUser(
          existingUser.rows[0]["id"],
          userProfile["profile"]["last_name"],
          userProfile["profile"]["first_name"],
          userProfile["profile"]["image_original"]
        );
      }
      if (
        existingUser.rows[0]["slack_title"].toLowerCase() !== "admin" &&
        role !== existingUser.rows[0]["slack_title"].toLowerCase() &&
        role !== "admin"
      ) {
        updateTitle(existingUser.rows[0]["id"], role);
      } else if (
        role == "admin" &&
        existingUser.rows[0]["slack_title"] !== "admin"
      ) {
        res
          .status(401)
          .json({ error: "You can not change your role as admin" });
      }

      jwtToken = createToken(existingUser.rows[0]["id"], role);
      return res.redirect(`${frontendUrl}/oauthdone?code=${jwtToken}`);
    } else {
      //signup
      if (role == "admin") {
        res.status(401).json({
          error: "You can not register as admin",
        });
      }
      const insertResult = await createUser(
        userProfile["profile"]["image_original"],
        userProfile["profile"]["first_name"],
        userProfile["profile"]["last_name"],
        role,
        userProfile["profile"]["email"]
      );

      jwtToken = createToken(insertResult.rows[0]["id"], role);

      // redirect back to frontend so that it can run setSession with this token
      res.redirect(`${frontendUrl}/oauthdone?code=${jwtToken}`);
    }
  } catch (error) {
    console.error("Error during OAuth process:", error);
    res.status(500).send("Something went wrong!");
  }
}

const login = async (req, res) => {
  const { slack_email } = req.body;
  console.log(req)
  try {
    const userQuery = await executeQuery("SELECT * FROM person WHERE slack_email = $1", [slack_email]);
    const user = userQuery.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }
    console.log(userQuery)
    const token = createToken(user.id, user.role);
    return res.json({ token });
  } catch (error) {
    console.error("Error during login process:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch user profile details from the database
    const userProfile = await executeQuery(
      "SELECT id, slack_firstname, slack_lastname, slack_email, slack_title, slack_photo_link FROM person WHERE id = $1",
      [userId]
    );

    if (userProfile.rows.length === 0) {
      // User not found
      return res.status(404).json({ error: "User not found." });
    }

    // Respond with the user's profile details
    res.status(200).json({
      id: userProfile.rows[0].id,
      slack_firstname: userProfile.rows[0].slack_firstname,
      slack_lastname: userProfile.rows[0].slack_lastname,
      email: userProfile.rows[0].slack_email,
      slack_title: userProfile.rows[0].slack_title,
      slack_photo_link: userProfile.rows[0].slack_photo_link,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

const userActivity = async (req, res) => {
  const userId = req.userId;
  const sessionId = req.body.sessionId;
  try {
    const signUpDetails = await getSignUpDetailsFromDatabase(userId, sessionId);

    res.json(signUpDetails.rows);
  } catch (error) {
    console.error("Error fetching sign-up details:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

const registerSession = async (req, res) => {
  try {
    const sessionId = req.body.sessionId;
    const userId = req.userId;
    const role = req.body.role;

    await insertSignUp(sessionId, role, userId);
    try {
      // email service
      await reminderEmail(userId, sessionId);
    } catch (error) {
      console.error("Error sending reminder email:", error);
      res.status(500).json({ error: "Something went wrong." });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error insert sign-up:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}

const cancelRegister = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const userId = req.userId;
    await cancelSignUp(sessionId, userId);

    res.json({ success: true });
  } catch (error) {
    console.error("Error canceling sign-up:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}




module.exports = {
  slackSingUp,
  userProfile,
  userActivity,
  registerSession,
  cancelRegister,
  login

}
