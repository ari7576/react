import logo from './logo.svg';
import './App.css';

function App() {
    const array = [1,2,3,4,5];

    const nextArrayBad = array;

    nextArrayBad[0] = 100;
  return (
    <>
        {console.log(nexArrayBad)}
    </>
  );
}

export default App;
