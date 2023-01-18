import React from "react";
// Socket, username and room are all props that have been added to keep track of all elements in the chat room


function Chat({ socket,username, room }) {
  return (
    <div>
      <div className="header"></div>
      <p>Chat { room}</p>
      <div className="body"></div>
      <div className="footer">
        <input type="text" placeholder="Message...." />
        <button>send</button>
      </div>
      
    </div>
  );
}
export default Chat