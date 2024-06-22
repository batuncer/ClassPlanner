import React, { useState, useEffect } from 'react';
import axios from "../../utils/axios";
import { TextField, Button, Box, Typography, Container, CssBaseline, MenuItem } from '@mui/material';
import { useAuthContext } from '../../auth/useAutContext';

const CreateSession = () => {
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [leadTeacher, setLeadTeacher] = useState('');
  const [regionId, setRegionId] = useState('');
  const [cohortId, setCohortId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [moduleNumberId, setModuleNumberId] = useState('');
  const [weekId, setWeekId] = useState('');
  const [syllabusLink, setSyllabusLink] = useState('');
  const [regions, setRegions] = useState([]);
  const [cohorts, setCohorts] = useState([]);
  const [modules, setModules] = useState([]);
  const [moduleNumbers, setModuleNumbers] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const {isAuthenticated}= useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated){
        const regionsResponse = await axios.get('/cities');
        setRegions(regionsResponse.data);

        const cohortsResponse = await axios.get('/cohorts');
        setCohorts(cohortsResponse.data);

        const modulesResponse = await axios.get('/modules');
        setModules(modulesResponse.data);

        const moduleNumbersResponse = await axios.get('/module-numbers');
        setModuleNumbers(moduleNumbersResponse.data);

        const weeksResponse = await axios.get('/weeks');
        setWeeks(weeksResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create-session', {
        date,
        time_start: timeStart,
        time_end: timeEnd,
        meeting_link: meetingLink,
        lead_teacher: leadTeacher,
        region_id: regionId,
        cohort_id: cohortId,
        module_id: moduleId,
        module_number_id: moduleNumberId,
        week_id: weekId,
        syllabus_link: syllabusLink
      });
      alert('Session created successfully!');
      setSessions([...sessions, response.data.session]);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('You must be an admin to create a session.');
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create Session
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="date"
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="timeStart"
              label="Start Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              value={timeStart}
              onChange={(e) => setTimeStart(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="timeEnd"
              label="End Time"
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              value={timeEnd}
              onChange={(e) => setTimeEnd(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="meetingLink"
              label="Meeting Link"
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="leadTeacher"
              label="Lead Teacher"
              value={leadTeacher}
              onChange={(e) => setLeadTeacher(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="syllabusLink"
              label="Syllabus Link"
              type="url"
              value={syllabusLink}
              onChange={(e) => setSyllabusLink(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="regionId"
              label="Region"
              select
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
            >
              {regions.map((region) => (
                <MenuItem key={region.id} value={region.id}>
                  {region.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cohortId"
              label="Cohort"
              select
              value={cohortId}
              onChange={(e) => setCohortId(e.target.value)}
            >
              {cohorts.map((cohort) => (
                <MenuItem key={cohort.id} value={cohort.id}>
                  {cohort.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              id="moduleId"
              label="Module"
              select
              value={moduleId}
              onChange={(e) => setModuleId(e.target.value)}
            >
              {modules.map((module) => (
                <MenuItem key={module.id} value={module.id}>
                  {module.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              id="moduleNumberId"
              label="Module Number"
              select
              value={moduleNumberId}
              onChange={(e) => setModuleNumberId(e.target.value)}
            >
              {moduleNumbers.map((moduleNumber) => (
                <MenuItem key={moduleNumber.id} value={moduleNumber.id}>
                  {moduleNumber.number}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              id="weekId"
              label="Week"
              select
              value={weekId}
              onChange={(e) => setWeekId(e.target.value)}
            >
              {weeks.map((week) => (
                <MenuItem key={week.id} value={week.id}>
                  {week.number}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Session
            </Button>
          </Box>
        </Box>
      </Container>

    </>
  );
};

export default CreateSession;
