import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const SessionCard = ({ session }) => {
  const {
    date,
    timeStart,
    timeEnd,
    meetingLink,
    leadTeacher,
    region,
    cohort,
    module,
    moduleNo,
    week,
    syllabusLink
  } = session;

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Date: {date}
        </Typography>
        <Typography gutterBottom>
          Time: {timeStart} - {timeEnd}
        </Typography>
        <Typography gutterBottom>
          Meeting Link: <a href={meetingLink}>{meetingLink}</a>
        </Typography>
        <Typography gutterBottom>
          Lead Teacher: {leadTeacher}
        </Typography>
        <Typography gutterBottom>
          Region: {region}
        </Typography>
        <Typography gutterBottom>
          Cohort: {cohort}
        </Typography>
        <Typography gutterBottom>
          Module: {module}
        </Typography>
        <Typography gutterBottom>
          Module No: {moduleNo}
        </Typography>
        <Typography gutterBottom>
          Week: {week}
        </Typography>
    
        <Typography gutterBottom>
          Syllabus Link: <a href={syllabusLink}>{syllabusLink}</a>
        </Typography>
        <Button variant="outlined" color="primary">
          Publish
        </Button>
      </CardContent>
    </Card>
  );
};

export default SessionCard;