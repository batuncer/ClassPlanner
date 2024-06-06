# ClassPlanner

## Table of Contents
* [General Info](#general-info)
* [Development Process](#development-process-info)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)

## General Info
ClassPlanner is a web application designed to manage and organize class sessions. It allows users to view upcoming classes, sign up for roles, and for admins to add new lessons and manage sign-ups.

## Development Process
  * **Code Refactoring:** Significant effort has been put into refactoring the existing codebase to enhance its structure and readability. This includes adhering to best practices for clean code and improving the overall maintainability of the application.
  * **Route Optimization:** Routes have been streamlined and optimized to reduce redundancy and improve the efficiency of the application's navigation.
  * **Admin Function Enhancements:** New functionalities have been added for administrators to provide them with more control and flexibility in managing classes 
  * **Filter Function Improvements:** The filtering logic has been revisited and optimized to allow users to more easily find classes that meet their specific needs.
  * **Database Schema Updates:** Database tables have been modified to better support the application's new features and functionalities. This includes adding new tables for enhanced role management, updating existing tables for better data integrity, and optimizing table relationships for improved query performance.

## Features
### 1. Overview of Upcoming Classes
* **As a user,** view an overview of all upcoming classes.
* **As a user,** register for classes.
* **As a user,** See profile details, view registration history, and cancel registered classes.

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
  * **Coordinator** 
  * **Lead Teacher** (1)
  * **Assistant Lead Teacher** (5)
  * **Teaching Assistant** (6)
  * **Personal Development Rep** (2)

### 5. User/Admin: View Sign-ups
* **As an admin, user** view the full names and email addresses of the people signed up for each course.
* **As an admin, user** filter by region and, Search with module name and region.

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
* **Router :** React Router and EWxpress Routing

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
```sql
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    slack_photo_link VARCHAR(250),
    slack_firstname VARCHAR(250),
    slack_lastname VARCHAR(250),
    slack_email VARCHAR(250) UNIQUE,
    slack_title VARCHAR(250),
);

### Region Table
```sql
CREATE TABLE region (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);



### Session Table
```sql
CREATE TABLE session (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP,
    time_start TIMESTAMP,
    time_end TIMESTAMP,
    meeting_link VARCHAR(250),
    syllabus_link VARCHAR(250),
    lead_teacher VARCHAR(250),
    lesson_content_id INT REFERENCES lesson_content(id)
    region_id INT REFERENCES region(id),
    cohort_id INT REFERENCES cohort(id),
    week_id INT REFERENCES week(id),
    module_id INT REFERENCES module(id),
    module_number_id INT REFERENCES module_number(id),
);


### Role Table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
    
);

### Week Table
CREATE TABLE week (
    id SERIAL PRIMARY KEY,
    number INT UNIQUE
);

### Module Table
CREATE TABLE module (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);

### Module Number Table
CREATE TABLE module_number (
    id SERIAL PRIMARY KEY,
    number INT UNIQUE
);

### Cohort Table
CREATE TABLE cohort (
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

