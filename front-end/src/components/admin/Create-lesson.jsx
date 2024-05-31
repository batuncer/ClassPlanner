import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CssBaseline } from '@mui/material';
import axios from "../../utils/axios"

const CreateLesson = () => {
  const [module, setModule] = useState('');
  const [moduleNo, setModuleNo] = useState('');
  const [weekNo, setWeekNo] = useState('');
  const [lessonTopic, setLessonTopic] = useState('');
  const [syllabusLink, setSyllabusLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('create-lesson', {
        module,
        module_no: moduleNo,
        week_no: weekNo,
        lesson_topic: lessonTopic,
        syllabus_link: syllabusLink,
      });
      alert('Lesson created successfully!');
    } catch (error) {
      console.error('There was an error creating the lesson!', error);
      alert('Failed to create lesson.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Create Lesson Content
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="module"
            label="Module"
            name="module"
            autoComplete="module"
            autoFocus
            value={module}
            onChange={(e) => setModule(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="moduleNo"
            label="Module No"
            type="number"
            id="moduleNo"
            autoComplete="moduleNo"
            value={moduleNo}
            onChange={(e) => setModuleNo(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="weekNo"
            label="Week No"
            type="number"
            id="weekNo"
            autoComplete="weekNo"
            value={weekNo}
            onChange={(e) => setWeekNo(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lessonTopic"
            label="Lesson Topic"
            type="text"
            id="lessonTopic"
            autoComplete="lessonTopic"
            value={lessonTopic}
            onChange={(e) => setLessonTopic(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="syllabusLink"
            label="Syllabus Link"
            type="url"
            id="syllabusLink"
            autoComplete="syllabusLink"
            value={syllabusLink}
            onChange={(e) => setSyllabusLink(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Lesson
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateLesson;
