# TodoApp

### About The Project
TodoApp is a simple web application to save Your daily tasks in order not to miss anything.
you can create new tasks with status and date, edit all information and delete tasks.

### Features
there are three filtering options:
* filter by task name.
* sort/filter by status
* sort by date

### how to install it localy
#### Server side
* Install those dependencies in the server directory 
```
npm install body-parser cors express mysql nodemon 
```
* To run Server side 
```
npm run devstart
```
#### Client side
* Install those dependencies in the client directory
```
npm install @ant-design/icons antd axios react react-dom react-scripts table
npm start
```

#### Mysql
* create a schema called todoapp.
* create a table called tasklists.
* in thr table create the following columns:
* * id (auto incriment),Task , Date, Status


