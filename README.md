In this project I built a simple ToDo List. 
The user can see the current tasks list, add, edit and delete tasks. 
All tasks stored in DB, including the deleted tasks.

How it works?
client side: (React and use of bootstrap)
  Create - responsible for creation of new task
  Home - responsible for the exsiting tasks and the view
  httpUtil - includes the functions which connected to the server
Server side: (Node.js, Express)
  Models > todo - contains the structure of a task in the DB
  index - responsible for the connection with the DB 
Database: MongoDB

Prerequisites:
  download and install node.js
  make sure npm is running > npm -v
  install MongoDB and make sure it runs locally 
  download the files
  in the project folder > npm run
  for the client side: todolist > open the terminal > npm run dev > go to the interface you got 
  for the server side: server > open the terminal > npm start 

