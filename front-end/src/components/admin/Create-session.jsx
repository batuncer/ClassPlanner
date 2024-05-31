import React, { useState, useEffect } from 'react';
import axios from "../../utils/axios";
import { TextField, Button, Box, Typography, Container, CssBaseline, MenuItem, Card, CardContent, CardActions } from '@mui/material';

const CreateSession = () => {
  const [date, setDate] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [leadTeacher, setLeadTeacher] = useState('');
  const [cohort, setCohort] = useState('');
  const [module, setModule] = useState('');
  const [moduleNo, setModuleNo] = useState('');
  const [region, setRegion] = useState('');
  const [regions, setRegions] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch available regions from the server
    const fetchRegions = async () => {
      try {
        const response = await axios.get('/cities');
        setRegions(response.data);
      } catch (error) {
        console.error('There was an error fetching the regions!', error);
      }
    };
    fetchRegions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/create-session', {
        date,
        time_start: timeStart,
        time_end: timeEnd,
        meeting_link: meetingLink,
        lead_teacher: leadTeacher,
        cohort,
        lesson_content: { module, module_no: moduleNo },
        region,
      });
      alert('Session created successfully!');
      setSessions([...sessions, response.data]);
    } catch (error) {
      console.error('There was an error creating the session!', error);
      alert('Failed to create session.');
    }
  };

  const handlePublish = async (sessionId) => {
    try {
      await axios.post(`/publish-session/${sessionId}`);
      alert('Session published successfully!');
    } catch (error) {
      console.error('There was an error publishing the session!', error);
      alert('Failed to publish session.');
    }
  };

  return (
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
            id="cohort"
            label="Cohort"
            value={cohort}
            onChange={(e) => setCohort(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="module"
            label="Module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="moduleNo"
            label="Module Number"
            type="number"
            value={moduleNo}
            onChange={(e) => setModuleNo(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="region"
            label="Region"
            select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regions.map((reg) => (
              <MenuItem key={reg.id} value={reg.name}>
                {reg.name}
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
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sessions
        </Typography>
        {sessions.map((session) => (
          <Card key={session.id} sx={{ mt: 3, width: '100%' }}>
            <CardContent>
              <Typography variant="h6">Date: {session.date}</Typography>
              <Typography variant="h6">Start Time: {session.time_start}</Typography>
              <Typography variant="h6">End Time: {session.time_end}</Typography>
              <Typography variant="h6">Meeting Link: {session.meeting_link}</Typography>
              <Typography variant="h6">Lead Teacher: {session.lead_teacher}</Typography>
              <Typography variant="h6">Cohort: {session.cohort}</Typography>
              <Typography variant="h6">Module: {session.lesson_content.module}</Typography>
              <Typography variant="h6">Module No: {session.lesson_content.module_no}</Typography>
              <Typography variant="h6">Region: {session.region}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handlePublish(session.id)}>Publish</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default CreateSession;
