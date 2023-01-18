//Importing the dependancies
import "./App.css";
import Chat from "./Chat";
import io from "socket.io-client";
import { useState } from "react";

//Establishing a connection to the back end which is the port on the server index.js
const socket = io.connect("http://localhost:3002");

function App() {
  //Setting states for username and room for the input form
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  //We are setting another state to hight the inputs if someone has joined a chat boolean
  const [disableChat, setDisableChat] = useState(true);

  //This function is to make sure the username and room name are available before joining
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room); // *<-- "Emit" is the process of sending, so in this case we are sending the room state to who ever is listening. To listen to emit you will use "Join" which is placed in the server side. This will cause the socket to send the data variable (in this case it is the room with key:"join_room") to any socket.join with key set to "join_room" and so on. So look for case #1 to know where it goes.
      socket.emit("username_info", username); // This is for demonstration and is not actually needed. But if we look here we used username as the key name that would identify what the data will be in case #2. That is because we linked username as the data.
      setDisableChat(false); //We are setting the disable chat to false so we are able to view the chat once signed in to a room
    } else if (username == "") {
      alert("Please Add A Username");
    } else if (room == "") {
      alert("Please Enter the Balot Chat Room You Would Like To Access");
    }
  };

  return (
    <div className="App">
      {/* We are setting a boolean condition on showing either chat or sign in. */}
      {disableChat ? (
        <div>
          <h4>Join A Chat</h4>

          <input
            type="text"
            placeholder="Name"
            //OnChange is an even handler that will change the state or set the state to the event target value specified. Ex, when we set name to sam, it will setUsername state to sam.
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
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
