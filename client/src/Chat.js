import React, { useEffect, useState } from "react";
// Socket, username and room are all props that have been added to keep track of all elements in the chat room

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");

  //This is an async message function that would be initiated with then send button is clicked. It is async so that it will not run until called upon.
  const sendMessage = async () => {
    //We are checking if the message is empty for it not to send.
    if (message !== "") {
      //we are creating a message data object that stores the room, username who will send the message, and message itself.
      const messageData = {
        room: room,
        author: username,
        message: message,
        //We are adding a time element as a stamp for when the message is sent.
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      //we are adding the messageData info as data for it to be sent through socket io in the server
      await socket.emit("send_message", messageData);
    }
  };
//We use the use effect to listen if there is any changes that occur within the socket. If you wonder why it is because we want it to identify everytime a person sends a message and refreshes it to show up.
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
    })
  },[socket])//* this will call the function within the parenthesis whenever there are changes that happen to the socket, hence we put it in []
  return (
    <div>
      <div className="header"></div>
      <p>You Have Joined Room: {room}</p>
      <div className="body"></div>
      <div className="footer">
        <input
          type="text"
          placeholder="Message...."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
}
export default Chat;
