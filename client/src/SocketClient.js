import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function SocketClient(){
    const [receiveMessageStack, setReceiveMessageStack] = useState([]); // State to store received message
    const backendBport = 9013
    const localBackendUrl = `http://localhost:${backendBport}`;
    const socket = io.connect(localBackendUrl);

    const setReceiveMessageStacker = (data) => {
        setReceiveMessageStack((prev) => [...prev, data]); // Append new message to the stack
    }

    const drawBroadcasters = (data) => {
        // Function to format the received messages for display
        // return data.map((item, index) => {
        //     return <div key={index}>{item}</div>; // Return a div for each message with a unique key
        // });
        let text = data.map((item, index) => {
            return item + "\n"; // Append a newline character after each message
        })
        return text.join(""); // Join the array of messages into a single string
        
    }

    const scrollToBottom = (id) => {
        window.setInterval(function() {
            var elem = document.getElementById(id);
            elem.scrollTop = elem.scrollHeight;
          }, 1000);
    };

    useEffect(() => {
      
      // Listen for incoming messages from the server
      socket.on("broadcast", (data) => {
        console.log(data); // Log the received message data to the console
        setReceiveMessageStacker(data); // Set the received message data to state
        scrollToBottom('txt-area');
      }); // Bind the scrollToBottom function to the current context
      
     
      // Cleanup the effect by removing the event listener when the component unmounts
      return () => {
        socket.off("broadcast");
      };
      

    }, []); // Empty dependency array ensures this runs only once when the component mounts
  
    return (
      <div>
        <textarea 
        id="txt-area"
        defaultValue={drawBroadcasters(receiveMessageStack)} 
        readOnly={true}
        style={{width:'500px', height:'250px', borderRadius:'8px', margin:10, border: '1px silver solid', boxShadow: '2px 2px 10px rgba(97, 97, 97, 0.4)' }}></textarea>
        <br/>
        {/* <button onClick={()=>callBroadcast()} className="skipiButton">Call Broadcasting</button> */}
      </div>
    );
};

