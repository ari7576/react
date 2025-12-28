import{Fragment} from 'react';
import './App.css';

function App() {
    const name = '리액트';
    const style = {
        backgroundColor: 'black',
        color: 'aqua',
        fonstSize: '48px',
        fonstWeight:'bold',
        padding: 16
    }
  return (
      <>
          <div className = 'react'>{name}</div>
          <input/>
      </>
  )
}

export default App;
