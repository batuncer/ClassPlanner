import React, { useEffect, useState } from 'react';
import Navbar from "../components/barComponents/Navbar";
import { makeStyles } from '@mui/styles';
import ClassCard from "../components/classes/ClassCard";
import UserGuard from "../auth/UserGuard";
import axios from '../utils/axios';
import { useAuthContext } from "../auth/useAutContext";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const Main = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuthContext();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get("/sessions");
                const sessionsData = response.data;
                setData(sessionsData);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        if (isAuthenticated) {
            fetchSessions();
        }
    }, [isAuthenticated]);

    return (
        <UserGuard>
            <div className="main-container" style={{ marginTop: "200px" }}>
                <Navbar />
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {!loading && data.map((s) => (
                    <ClassCard
                        key={s.id}
                        sessionId={s.id}
                        className={classes.root}
                        date={s.date}
                        time_start={s.time_start}
                        time_end={s.time_end}
                        lead_teacher={s.lead_teacher}
                        city={s.region}
                        cohort={s.cohort}
                        module_name={s.module}
                        module_number = {s.module_number}
                        module_week={s.week}
                        syllabus_link={s.syllabus_link}
                    />
                ))}
            </div>
        </UserGuard>
    );
};

export default Main;