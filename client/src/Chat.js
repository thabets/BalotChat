import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// Socket, username and room are all props that have been added to keep track of all elements in the chat room

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [theMessages, setTheMessages] = useState([]);

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
      //we are adding the messageData info as data for it to be sent through socket io to the server and back
      await socket.emit("send_message", messageData);
      setTheMessages((rasayel) => [...rasayel, messageData]);
      setMessage("");
    }
  };
  //We use the use effect to listen if there is any changes that occur within the socket. If you wonder why it is because we want it to identify every time a person sends a message and refreshes it to show up.
  useEffect(() => {
    //Whenever a message event in emitted, this will setTheMessages to whatever is in the ...rasayel(list) and in the end add on to it the extra data that we just sent.
    socket.on("receive_message", (data) => {
      setTheMessages((rasayel) => [...rasayel, data]);
    });
  }, [socket]); //* this will call the function within the parenthesis whenever there are changes that happen to the socket, hence we put it in []

  return (
    <div>
      <div className="header"></div>
      <h4>You Have Joined Room: {room}</h4>
      <div>
        <ScrollToBottom className="chatbox">
          {theMessages.map((messageContent) => {
            return (
              <div className="hidden">
                <p
                  id={
                    username === messageContent.author
                      ? "messageContentS"
                      : "messageContentR"
                  }
                >
                  {messageContent.message}
                </p>

                <div>
                  <p id="time">{messageContent.time}</p>
                  <p id="author">
                    {username === messageContent.author
                      ? "you"
                      : messageContent.author}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="footer">
        <input
          type="text"
          placeholder="Message...."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="button" onClick={sendMessage}>
          Send &#8686;
        </button>
      </div>
    </div>
  );
}
export default Chat;
