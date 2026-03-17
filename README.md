# Exercise Tracker v0.2.0

## Description
This project grew out of a class (CS 290 - Web Development at Oregon State University) portfolio project that overlapped heavily with a personal project I had been dragging my feet on starting. The project is a single-page-app built using the full MERN stack and JavaScript.

The app accepts inputs of individual exercise motions (e.g. squats or curls) with weight, reps, and date, along with additional details like muscle group exercised and user name (both intended for use in future features). It also accepts links to external resources to keep track of articles and videos demonstrating exercises. 

## Installation
Clone the repository
Run `npm install` from BOTH the Front End and Back End folders
Create a MongoDB database titled "exercises_db" and copy the connection string into a new `.env` file in the Back End folder
From the Back End directory in the terminal, run `npm start`
From the Front End directory in the terminal, run `npm run dev`

## Usage
Navigate to `http://localhost:5173` in your browser to access the application

## Roadmap
Support for additional exercise types (current design intended for strength training/calisthenics)
Auto-population of input fields based on current date and autocompleted exercise name
Creation of multiple exercises at once
Pagination of exercise table and resources list
Sorting and filtering of exercise table and resources list
Additional database of exercise motions to track and autofill previous weight used and muscle group worked (e.g. "Curls" auto-fills 24 lbs upper body with the date)
Data visualizations

## License
MIT License