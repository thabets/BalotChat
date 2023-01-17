//Importing the dependancies
import "./App.css";
import io from "socket.io-client";

//Establishing a connection to the back end which is the port on the server index.js
const socket = io.connect("http://localhost:3002");

function App() {
  return <div className="App"></div>;
}

export default App;
