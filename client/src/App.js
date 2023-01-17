//Importing the dependancies
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";

//Establishing a connection to the back end which is the port on the server index.js
const socket = io.connect("http://localhost:3002");

function App() {
  //Setting states for username and room for the input form
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  //This function is to make sure the username and room name are available before joining
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room); //<-- the room in this case of the function socket.emit and join room is the data variable that will be pushed to the data variable in socket.on in the server. So look for case #1 to know where it goes.
      socket.emit("username_info", username); // This is for demonstration and is not actually needed. But if we look here we used username as the key name that would identify what the data will be in case #2. That is because we linked username as the data.
    }
  };

  return (
    <div className="App">
      <h4>Join A Chat</h4>
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room ID"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}

export default App;
