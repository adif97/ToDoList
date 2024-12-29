**To-Do List Project**  
In this project, I built a simple To-Do List application.  

**Features:**  
* Users can see the current task list.  
* Add, edit, and delete tasks.  
* All tasks are stored in a database, including deleted tasks.  

**How It Works?**  
***Client Side:***  
Built with React and Bootstrap  
* Create Component: Responsible for creating new tasks.
* Home Component: Responsible for displaying existing tasks and managing the overall view.
* httpUtil: Contains the functions to connect with the server.
  
***Server Side:***  
Node.js and Express  
* Models > todo: Defines the structure of a task in the database.
* index.js: Handles the database connection and server logic.
  
***Database:***  
MongoDB  
All tasks are stored and retrieved from MongoDB.

**Prerequisites:**  
* Download and install node.js
* Make sure npm is running > npm -v
* Install MongoDB and make sure it runs locally
* Download the files
  
***Running the Project:***
Client Side:  
* Navigate to the todolist folder.
* Open a terminal and run:  
npm install  
npm run dev  
* Open the URL provided in the terminal output to access the app.  
Server Side:  
* Navigate to the server folder.
* Open a terminal and run:  
npm install  
npm start

**If there is any missing module or library, install it using npm install**
