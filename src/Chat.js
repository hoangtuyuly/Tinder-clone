import React, { useState } from 'react';


function Chat() {
    const [input, setInput] = useState('');
    const sendMessage = () => {
        
    }

    return (
      <div className="App">
        <form>
            <input value={input} placeholder="Enter message..." onChange={(e) => setInput(e.target.value)}/>
            <button onClick={sendMessage}>Send Message</button>
        </form>
      </div>
    );
  }
  
  export default Chat;