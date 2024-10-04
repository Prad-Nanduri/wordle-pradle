import './app.css';
import Header from './components/header.js';
import Grid from './components/grid.js';
import Keyboard from './components/keyboard.js';
import { useState } from 'react';

function App() {
  const All_English_Words = ["MATCH", "CATCH", "TOUCH", ]
  const [mysteryWord, setMysteryWord] = useState("CATCH")
  const [currentRow, setCurrentRow] = useState(0)
  const [currentWord, setCurrentWord] = useState("")
  const [guessedWords, setGuessedWords] = useState([])
  const width = 5
  const height = 6
  // const getContent() {

  //   return [
  //     []
  //   ]
  // }


  return (
    <div className="app-container">
     <Header />
     <Grid 
        width={width}
        height={height}
        content={getContent()}
        />
     <Keyboard />

    </div>                                                                                                            
  );
}

export default App;
