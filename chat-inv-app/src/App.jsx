import React, { useState } from 'react';
import Chat from './Chat';
import Result from './Result';

function App() {
  const [page, setPage] = useState(0);

  const allPages = [<Chat goPage={setPage}/>, <Result/>];
  return (
    <div className="App">
      <span id="btn-arrow" onClick={() => {
        if(page === 0){
          setPage(1);
        }else{
          setPage(0);
        }
      }}>
        <img src={ page === 0 ? "./assets/icons/front-arrow.png": "./assets/icons/back-arrow.png"} alt="arrow" />
      </span>
      <div>
        {allPages[page]}
      </div>
    </div>
  );
}


export default App;
