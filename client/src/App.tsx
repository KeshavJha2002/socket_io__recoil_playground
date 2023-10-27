import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import {io} from 'socket.io-client'

const App:React.FC = () => {
  const [data, setData] = useState<Array<number>>([]);
  
  useEffect(() => {
    const socket = io('http://localhost:8000/'); 
    socket.emit('greet',"Hello there");
    socket.on('reply',(message) => {
      console.log("received message",message);
    })
  },[data] );

  const onClick = async () => {
    const response = await axios.get('/api/numbers');
    setData(response.data);
    
  }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <button className='p-6 text-center bg-none rounded-lg border bg-blue-500 text-white' onClick={onClick}>Click me</button>
      
      <div>
        { data ? (data.map((value)=> `${value} `)) : ("Nothing to display") }
      </div>
    </div>
  )
}

export default App;
