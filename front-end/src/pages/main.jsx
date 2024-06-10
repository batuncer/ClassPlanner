// Main.js
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import ClassCard from "../components/classes/ClassCard";
import UserGuard from "../auth/UserGuard";
import axios from '../utils/axios';
import { useAuthContext } from "../auth/useAutContext";
import Skeleton from '@mui/material/Skeleton';
import "../styles/ClassCard.scss";
import Navbar from "../components/barComponents/Navbar"

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
    skeletonContainer: {
        width: '80%',
        margin: 'auto',
        background: '#9da9ad',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        padding: '25px',
        borderRadius: '25px',
        height: '300px',
        transition: 'all 0.3s',
        marginTop: '50px',
        position: 'relative',
    },
    mainContainer: {
        marginTop: '200px', // Adjust as needed
        minHeight: 'calc(100vh - 200px)', // Subtracting the height of Navbar
    },
}));

const Main = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuthContext();
    const [searchData, setSearchData] = useState([]);
    const [selectedRegions, setSelectedRegions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get("/sessions");
                const sessionsData = response.data;
                setData(sessionsData);
                setSearchData(sessionsData); // Preserve original data for searching
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
                setLoading(false);
            }
        };
        if (isAuthenticated) {
            fetchSessions();
        }
    }, [isAuthenticated]);

    const searchHandler = (text) => {
        const lowerCaseText = text.toLowerCase();
        setData(searchData.filter(e => text === "" || (e.module.toLowerCase().includes(lowerCaseText) || e.region.toLowerCase().includes(lowerCaseText))));
    }

    const regionBoxHandler = (regions) => {
        setSelectedRegions(regions);
    }
    
    return (
        <UserGuard>
            <div className={classes.mainContainer} style={{ marginTop: "200px" }}>
                <Navbar onChangeSearch={searchHandler} onSelectRegions={regionBoxHandler} />
                {loading &&  Array.from(new Array(6)).map((_, index) => (
                        <div key={index} className={classes.skeletonContainer}>
                            <Skeleton animation="wave"  variant="rectangular" width="100%" height="100%" />
                        </div>
                    ))}
                {error && <div>Error: {error}</div>}
                {!loading && data
                    .filter(s => selectedRegions.length === 0 || selectedRegions.includes(s.region))
                    .map((s) => (
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
                            module_number={s.module_number}
                            module_week={s.week}
                            syllabus_link={s.syllabus_link}
                        />
                    ))}
            </div>
        </UserGuard>
    );
};

export default Main;
