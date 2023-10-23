import { useState } from 'react';
import Shu from './components/Shu';

function App() {
  const [show, setShow] = useState(false);
function clickMe(){
  setShow(true);
}
  return (
    <>
      <h1>hello</h1>
      <Shu show = {show} setShow = {setShow} />
      <button onClick={clickMe}>click</button>
    </>
  );
}

export default App;