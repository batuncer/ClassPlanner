const nodemailer = require("nodemailer");
const { pool } = require("../config/dbConfig");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "classplanner-cyf@hotmail.com",
    pass: process.env.REMINDER_EMAIL_PASSWORD,
  },
});

const getUserData = async (userId) => {
  try {
    const result = await pool.query("SELECT * FROM person WHERE id = $1", [
      userId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const getSessionData = async (sessionId) => {
  try {
    const result = await pool.query(
      `SELECT 
         session.*, 
         module.name AS module,
         module_number.number AS module_number,
         week.number AS week_no
       FROM 
         public.session
       INNER JOIN 
         public.module ON session.module_id = module.id
       INNER JOIN 
         public.module_number ON session.module_number_id = module_number.id
       INNER JOIN 
         public.week ON session.week_id = week.id
       WHERE 
         session.id = $1`,
      [sessionId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching session data:", error);
    throw error;
  }
};

const reminderEmail = async (userId, sessionId) => {
  try {
    const userData = await getUserData(userId);
    const sessionData = await getSessionData(sessionId);

    // convert date to the format ex: "Tue Dec 05 2023"
    const formattedDate = new Date(sessionData.date).toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );

    const formattedStartTime = new Date(
      `1970-01-01T${sessionData.time_start}`
    ).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/London",
    });

    const formattedEndTime = new Date(
      `1970-01-01T${sessionData.time_end}`
    ).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/London",
    });

    const emailSubject = "Class Reminder";
    const emailText = `Hi ${userData.slack_firstname}, this is a reminder for your upcoming class.`;
    const emailHTML = `
      <div style="text-align: center;">
        <img src="https://codeyourfuture.io/wp-content/uploads/2019/03/cyf_brand.png" alt="Codeyourfuture Logo" style="max-width: 100%;" />
      </div>
      <p>Hi ${userData.slack_firstname},</p>
      <p>I hope this email finds you well. I wanted to confirm that we've received your registration for the upcoming Infosys mentoring class scheduled for <b>${formattedDate}</b>.</p>
      <p>We're thrilled to have you on board!</p>
      <h2>Class Details:</h2>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${formattedStartTime} - ${formattedEndTime}</p>
      <p><strong>Class Leader:</strong> ${sessionData.lead_teacher}</p>
      <p><strong>Module and Week:</strong> ${sessionData.module} - ${sessionData.week_no}</p>
      <p><strong>Content Link:</strong> <a href="${sessionData.syllabus_link}">${sessionData.syllabus_link}</a></p>
      <p>Your commitment to participating in our classes is greatly appreciated, and we look forward to an engaging and enriching learning experience.</p>
      <p>If you have any questions or if there are any changes to your availability, please don't hesitate to reach out. Thank you for being a part of CodeYourFuture!</p>
      <p>Best regards,</p>
      <p>Baki Tuncer</p>
    `;

    await transporter.sendMail({
      from: "classplanner-cyf@hotmail.com",
      to: userData.slack_email,
      subject: emailSubject,
      text: emailText,
      html: emailHTML,
    });

    console.log(
      `Reminder email sent to ${userData.slack_email} address successfully.`
    );
  } catch (error) {
    console.error("Error sending reminder email:", error);
  }
};

module.exports = reminderEmail;
