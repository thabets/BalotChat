//Importing the dependencies
const express = require("express");
const app = express();
const http = require("http"); // This is importing the http library because it is required to build our server with socket.io
const cors = require("cors"); //Importing cors to handle errors that would arise with socket.io
const { Server } = require("socket.io"); //Importing the class server functionality from socket.io library

app.use(cors());

//Generating the server for us utilizing express and http
const server = http.createServer(app);
//This is a connection that we establish between socket.io, cors and express server
const io = new Server(server, {
  cors: {
    //Using cors key and the origin to communicate with socket.io and telling it which server is acceptable to connect with it.
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});
//Listening to an event
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  //setting the connection to the front end and giving it a specific connection
  socket.on("join_room", (data) => {
    socket.join(data); //*case #1
    console.log(`User ${socket.id} joined room:${data}`);
  });
  //This is for example but we can see that the data that was pulled from here was the information that was passed into the username because we linked it as such.
  socket.on("username_info", (data) => {
    socket.join(data); //case #2
    console.log(`User ${data} is king`);
  });
  //This is to transfer the message data through socket.io
  socket.on("send_message", (data) => {
    //this uses the emit function of socket io to send a message to everyone listening within data.room utilizing the "to" function
    socket.to(data.room).emit("receive_message", data);
  });
  //This is to identify when the user has left
  socket.on("disconnect", () => {
    console.log("User Left", socket.id);
  });
});

//Call back function for when the server runs and letting the user know on what port
server.listen(3002, () => {
  console.log("Server is Running on Port 3002");
});
