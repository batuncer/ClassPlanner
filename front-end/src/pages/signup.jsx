import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/auth-components/SignUpForm";
import Box from '@mui/material/Box';
import BottomCard from "../components/main-bottom/BottomCard"
import LoginGuard from "../auth/LoginGuard";
import { useAuthContext } from "../auth/useAutContext";


export default function SignUp() {
    const navigate = useNavigate();
    const { loginWithSlack, loginGuest } = useAuthContext();

    const handleSignup = () => {
        navigate("/main");
    }

    const handleSlackSignup = (token) => {
        loginWithSlack(token);
    }

    const handleLogin = async (email) => {
        await loginGuest(email);
        navigate("/main");
    };

    return (
        <LoginGuard>
            <Box  style={{minHeight: 'calc(100vh - 200px)'}}>
                <div>
                    <SignUpForm handleSignup={handleSignup} handleSlackSignup={handleSlackSignup} handleLogin={handleLogin} />
                </div>
                <div style={{ border: "1px solid grey", marginRight: "200px", marginLeft:"200px", marginBottom: "90px", marginTop: "90px" }}></div>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center'}}>
                    <BottomCard h1={"Become a Trainee"} image={"https://img.freepik.com/free-vector/organic-flat-people-business-training_23-2148919413.jpg"} link={"https://codeyourfuture.io/become-a-student/"}
 />
                    <BottomCard h1={"Become a Mentor"} link={"https://codeyourfuture.io/become-a-student/"} image={"https://assets-global.website-files.com/5ea704591b73e7337746aa7b/639365c66ee8963de7d8e288_How%20to%20Create%20a%20Slack%20Group_%20A%20Painless%20Tutorial-p-800.png"} />
                    <BottomCard h1={"Employee Wellness"} link={"https://codeyourfuture.io/hire-a-graduate/"} image={"https://www.culturemonkey.io/employee-engagement/content/images/2023/05/benefits-of-employee-wellness-programs.png"} />
                </div>
            </Box>
        </LoginGuard>
    );
}
