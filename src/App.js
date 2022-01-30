import './App.css';
import {useState ,useEffect } from 'react'



function App() {
  // const keys = [
  //   'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o','p',
  //   'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
  //   'z','x','c','v','b','n','m'
  // ]
  // const [keyGrid, setKeyGrid] = useState([]);
  const [wordGrid, setWordGrid] = useState([]);
  const [activeRow, setActiveRow] = useState(0)
  const [gameOver, setGameOver] = useState(false);
  const word = "smile";
  function uniqueID() {
  return Math.floor(Math.random() * Date.now())
  }
  useEffect(() => {
    function setUpGrid()
    {
      let newWordGrid = [];
      for (let i = 0; i < 6; i++)
      {
        newWordGrid.push([]);
      }
      for (let i = 0; i < 6; i++)
      {
        for (let j = 0; j < 5; j++)
        {
          newWordGrid[i].push({id:uniqueID(), letter: "", state: 'empty' });
          }
      }
     
      setWordGrid(newWordGrid);
    }
    // function setUpKeyGrid() {
    //   let newKeyGrid = [];
    //    for (let i = 0; i < 26; i++)
    //    {
    //      newKeyGrid.push({ id: uniqueID(), letter: keys[i], status:"unclicked" });
    //    }
    //   setKeyGrid(newKeyGrid);
    //   }
    if (wordGrid.length === 0)
    {
      setUpGrid();
      // setUpKeyGrid();
      }
  });

  const handleChange = (e, rowIndex, colIndex) => {
    const newWordGrid = [...wordGrid];

    newWordGrid[rowIndex][colIndex].letter =  e.target.value.toLowerCase();
    setWordGrid(newWordGrid);
  }
  const handleSubmit = () => {
    const newWordGrid = [...wordGrid];
    const currentWord = newWordGrid[activeRow];
    console.log(currentWord)
    for (let i = 0; i < currentWord.length; i++)
    {
      if (currentWord[i].letter === word[i])
      {
        currentWord[i].state = 'correct';
      } else if (word.includes(currentWord[i].letter))
      {
        currentWord[i].state = "wrongPosition";
        }else
      {
        currentWord[i].state = "incorrect";
        }
    }
    // setWordGrid(newWordGrid);
    let flag = true;
     for (let i = 0; i < currentWord.length; i++)
     {
       if (currentWord[i].letter !== word[i])
       {
         flag = false;
         setActiveRow(activeRow + 1);
         break;
       }
   
     }
    
    setGameOver(flag);
  }
  return (
    <div className="App">
        <>
         <h1>WORDLE</h1>
         <div className='wordGrid'>
          {wordGrid.map((row ,rowIndex) => <div className='rowWrap' key={uniqueID()}>
            {row.map((col, colIndex) =>
              <input key={col.id} className={`letter ${wordGrid[rowIndex][colIndex].state}`} value={wordGrid[rowIndex][colIndex].letter} onChange={(e) => handleChange(e, rowIndex, colIndex) }    />)}
            </div>)
          }
         {!gameOver && <button type="submit" className='btn'
            onClick={handleSubmit}>Submit</button>}
        </div>
        {gameOver && <div>
          <h2> Game Over Refresh to play again </h2>
           <button type="submit" className='btn1'
            onClick={() => window.location.reload(false)}>Refresh</button>
        </div>}
        {/* <div className='keyboard'>
          {keyGrid.map((item,index) => {
            return (
             <button  key={item.id} className={`key`}>{item.letter}</button>
              );
          })}
        </div> */}
        </>
       
      
      
    </div>
  );
}

export default App;
