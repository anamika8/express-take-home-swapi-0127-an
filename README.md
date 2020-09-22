# Express Take Home Task

In this project you’ll be creating a REST API using Express. We have already started the project, some of the code and written the tests for you. Complete the tests and submit your code.

## YourTask

Your task is to finish this simplified Star Wars API. Use [SWAPI](https://swapi.co/) as your source data.

Fetch the information live from the SWAPI API and transform the response to the expected response by the tests.

You have one week to complete the task.

You can use any NPM packages to help in the assignment.

---

## About the app

A simple API to read from the Star Wars API and return some basic information about people and planets
from the Star Wars universe using their `id`.

## Pre-requisites

- Download and install Node.js

- Read and understand the SWAPI API from https://swapi.co/

## Getting Started

First, clone the repository

```bash
# Get the latest snapshot
git clone https://github.com/anamika8/express-take-home-swapi-0127-an.git

# Change directory
cd express-take-home-swapi-0127-an

# Install NPM dependencies
npm install

# Start up the server
npm start
```

> All existing tests were previously failing. After making appropriate changes to the router file - `people.js` and adding a new router file - `planet.js`, all tests should now be passing.

```bash
# Run the tests
npm test
```
