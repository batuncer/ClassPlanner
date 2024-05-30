# ClassPlanner

## Table of Contents
* [General Info](#general-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)

## General Info
ClassPlanner is a web application designed to manage and organize class sessions. It allows users to view upcoming classes, sign up for roles, and for admins to add new lessons and manage sign-ups.

## Features
### 1. Overview of Upcoming Classes
* **As a user,** view an overview of all upcoming classes.

### 2. Details of Next Upcoming Class
* **As a user,** see the next upcoming class, including:
  * **Date** of the class
  * **Time** of the class
  * **Module name** and **week number**
  * A **link** to the content that will be taught
  * The **name** of the person leading the class

### 3. View Role Sign-ups
* **As a user,** see the names of people who have signed up for each role.

### 4. Role Sign-up
* **As a user,** sign up for a role in the class using your full name and email address.
* Each role can have multiple people fulfilling it in a class. The roles are:
  * **Coordinator** (4)
  * **Lead Teacher** (1)
  * **Assistant Lead Teacher** (5)
  * **Teaching Assistant** (6)
  * **Personal Development Rep** (2)

### 5. User/Admin: View Sign-ups
* **As an admin,** view the full names and email addresses of the people signed up for each course.

### 6. Admin: Add New Lessons
* **As an admin,** add new lessons that admin can create a session with locations and  cohort.

### 7. Admin: Add New Sessions
* **As an admin,** add new sessions that volunteers can sign up for.

## Technologies
Project is created with:
* **Frontend:** React, React Hooks
* **Backend:** Node.js, Express
* **Database:** PostgreSQL
* **Authentication:** JWT, Slack Authentication
* **Email Service:** Nodemailer
* **Unique Identifiers:** UUID

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ClassPlanner.git
cd ClassPlanner

### 2. Install Backend Dependencies
```bash
cd back-end
npm install

### 3. Clone the Repository
Create a .env file in the back-end directory with the following variables:
```env
VITE_SLACK_CLIENT_ID=your_slack_client_id
SLACK_CLIENT_SECRET=your_slack_client_secret
BACK_END_URL_SLACK=your_backend_url_slack
BACK_END_URL=your_backend_url
LOCAL_DEVELOPMENT=true


## DATABASE SHEMA
### Person Table
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    slack_photo_link VARCHAR(250),
    slack_firstname VARCHAR(250),
    slack_lastname VARCHAR(250),
    slack_email VARCHAR(250) UNIQUE,
    slack_title VARCHAR(250),
);
### Region Table
CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);


### Lesson Content Table
```sql
CREATE TABLE lesson_content (
    id SERIAL PRIMARY KEY,
    module VARCHAR(250),
    module_no INT,
    week_no INT,
    lesson_topic VARCHAR(250),
    syllabus_link VARCHAR(250)
);

### Session Table
```sql
CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP,
    time_start TIMESTAMP,
    time_end TIMESTAMP,
    meeting_link VARCHAR(250),
    lead_teacher VARCHAR(250),
    lesson_content_id INT REFERENCES lesson_content(id)
);


### Role Table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
    
);

### Attendance Table
CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    person_id INT REFERENCES person(id),
    session_id INT REFERENCES session(id),
    role_id INT REFERENCES role(id)
);

