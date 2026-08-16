# Exam Ready

Design and build a frontend-only Online Exam Portal as a 2nd-year IT student portfolio project.

The project should look professional, clean, and well-designed, but not overly advanced or like it was built by a large software company.

Tech

React.js

Vite

CSS or Tailwind CSS

React Router

Use mock/static JSON data

No real backend

No real authentication

No real payment system

No external database

Simulate backend functionality using local/mock data and React state.

Design Style

Create a modern but simple student-friendly UI.

Clean white/light background

Blue or purple as the primary accent

Rounded cards

Subtle shadows

Simple animations

Professional typography

Responsive design

Clear navigation

Avoid excessive gradients

Avoid overly complicated dashboards

Avoid excessive animations

Make it look achievable by a good 2nd-year IT student

The UI should be impressive enough for a placement portfolio while remaining realistic.

Student Side

1. Login Page

Create a simple login screen.

Fields:

Email / Student ID

Password

Remember me

Buttons:

Login

Forgot Password

Use mock authentication.

Any valid-looking credentials can lead to the dashboard.

2. Student Dashboard

Create a simple dashboard with:

Welcome message

Upcoming exams

Exams completed

Average score

Pending exams

Example cards:

Upcoming Exams       3
Completed Exams      8
Average Score       78%
Pending Exams        2


Show an "Upcoming Exams" section with exam cards.

Each card contains:

Subject

Exam name

Date

Duration

Number of questions

Start Exam button

3. My Exams

Create a page showing all available exams.

Add:

Search bar

Subject filter

Status filter

Exam cards should have:

Exam name

Subject

Date

Duration

Questions

Status

View Details button

Use static mock data.

4. Exam Instructions

When the user selects an exam, show:

Exam title

Subject

Duration

Number of questions

Total marks

Instructions:

Read every question carefully

Do not refresh during the exam

Submit before the timer ends

Unanswered questions will not receive marks

Add:

Start Exam

button.

5. Exam Page

This is the main screen of the application.

Create a clean examination interface.

Top:

Computer Networks

Question 5 / 20                     42:35


Main area:

Question 5

Which protocol is used to transfer
web pages over the internet?

○ FTP
○ HTTP
○ SMTP
○ SSH


Buttons:

Previous

Save & Next

Mark for Review

Right side:

Question navigation:

1  2  3  4  5
6  7  8  9 10
11 12 13 14 15
16 17 18 19 20


Use different colors/states for:

Current

Answered

Unanswered

Marked for review

Use a static countdown timer or a simple React timer.

6. Submit Exam

When clicking Submit:

Show a confirmation modal:

Submit Exam?

Answered: 16
Unanswered: 3
Marked for Review: 1

Are you sure you want to submit?


Buttons:

Continue Exam

Submit Exam

7. Result Page

After submission, show a result screen.

Example:

Congratulations!

78 / 100

78%

Correct       16
Incorrect      3
Unanswered     1


Add a simple performance chart.

Buttons:

Review Answers

Back to Dashboard

Use static result data.

8. Results History

Create a simple table/card layout showing previous exams.

Columns:

Exam

Subject

Date

Score

Percentage

Status

Add a "View Result" button.

9. Profile Page

Create a basic student profile.

Fields:

Name

Student ID

Email

Phone

Department

Allow editing the profile using local React state.

Optional Teacher Section

Add a simple Teacher Dashboard to demonstrate role-based UI.

Teacher can:

View exams

Create an exam

View questions

View student results

Create Exam Page

Simple form:

Exam name

Subject

Date

Duration

Number of questions

Add questions manually.

Since there is no backend, save everything temporarily using React state/localStorage.

Navigation

Student sidebar:

Dashboard

My Exams

Results

Profile

Settings

Logout

On mobile, convert the sidebar into a hamburger menu or bottom navigation.

Mock Data

Create realistic static data for:

Students

Exams

Questions

Results

Example exams:

Data Structures

Database Management Systems

Computer Networks

Object-Oriented Programming

Web Technology

Use around 5–8 mock exams and 20 mock questions.

UI Components

Create reusable React components:

Navbar

Sidebar

ExamCard

StatCard

QuestionCard

QuestionNavigator

Timer

ResultCard

Modal

Button

Input

Select

LoadingState

EmptyState

Keep the component structure understandable for a 2nd-year student.

Important

This is only a frontend project.

Do NOT build:

Real backend

MongoDB

Real authentication

Payment system

Complex AI

Microservices

WebSockets

Advanced security systems

Use mock data and localStorage where necessary.

The goal is to demonstrate:

React

Components

Props

State

Hooks

React Router

Forms

Conditional rendering

Responsive CSS

API-style mock data

Basic frontend architecture

Final Goal

The final website should look like a well-made 2nd-year IT student project:

Simple enough to explain in an interview, but polished enough to put on a resume and GitHub.

Do not over-engineer it. Prioritize clean UI, good UX, responsive design, reusable components, and working navigation.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/61b62513-f14e-4929-9320-808859e6c430).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
