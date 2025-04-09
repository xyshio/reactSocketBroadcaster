import './App.css';
import SocketClient from './SocketClient.js';


const App = () => {
  return (
      <div style={{backgroundColor:'#61AFFE'}}>
          <h1>Socket.io Broadcasting Service</h1>
          <SocketClient />
      </div>
  );
};

export default App;