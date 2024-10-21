import './app.css';
import Header from './components/header.js';
import Grid from './components/grid.js';
import Keyboard from './components/keyboard.js';
import { useState } from 'react';

function App() {
  const All_English_Words = ["MATCH", "CATCH", "TOUCH", ]
  // const [mysteryWord, setMysteryWord] = useState("CATCH")
  // const [currentRow, setCurrentRow] = useState(0)
  // const [currentWord, setCurrentWord] = useState("")
  // const [guessedWords, setGuessedWords] = useState([])

  const [mysteryWord, setMysteryWord] = useState("CATCH")
  const [currentRow, setCurrentRow] = useState(0)
  const [currentWord, setCurrentWord] = useState("TOU")
  const [guessedWords, setGuessedWords] = useState(["PATCH"])
  const width = 5
  const height = 6

  const getContent = () => {

    // guessedWords.forEach

    guessedWords.each((guessedWord, rowNum) => {
      for (let guessedWordIndex = 0; guessedWordIndex < guessedWord.length; guessedWordIndex++){
        const gridRowNum = rowNum
        const gridColumnNum = guessedWordIndex
        const character = guessedWord[guessedWordIndex]
        let color;
         if (!mysteryWord.includes(character)) {
          color = "grey"
        } else if (mysteryWord[guessedWordIndex] == character) {
          color = 'green'
        }else {
          color = 'yellow'
        } 
        }
        //letter in the AnswerWord = > GREY
        //Letter in the AnswerWord but different position
      }
    })

    return {
      
        "0,0": {
          color: "green",
          text: "T"
        },
        "0,1":{
          color:"grey",
          text:"O"
        },
        "0,2":{
          color:"grey",
          text:"U"
        },
      
      }
  }


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
