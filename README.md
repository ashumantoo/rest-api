# express api

A Task REST API in Node.js build using Typescript.

Node Version >= 18

API Endpoints

| Methods     | Urls              |Description             |
| ----------- | -----------       | -----------            |
| GET         | api/task          |Get all tasks           |
| GET         | api/task/taskId   |Get a specific task     |
| POST        | api/task          |Create a new task       |
| PUT         | api/task/taskId   |Update an existing task |
| DELETE      | api/task/taskId   |Delete an existing task |

## Quick Start

Clone the repo.

```bash
https://github.com/ashumantoo/task-manager-api.git
cd task-manager-api
```
Create the .env file.

```bash
MONGODB_URI = mongodb://localhost:27017/task-manager
```
Install the dependencies.

```bash
npm install
```
First build the project, run the following.

```bash
npm run build
```
Then to start the express server, run the following.

```bash
npm start
```
To run the test, run the following.

```bash
npm run test
```