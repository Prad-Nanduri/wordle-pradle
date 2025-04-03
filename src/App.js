import './app.css';
import Header from './components/header.js';
import Grid from './components/grid.js';
import Keyboard from './components/keyboard.js';
import {useState, useEffect} from 'react';

function App() {

  const ALL_WORDS = ["MATCH", "PATCH", "TOUCH", "GREEN"]

  const [answerWord, setAnswerWord] = useState("MATCH")
  const [currentRow, setCurrentRow] = useState(0)
  const [currentWord, setCurrentWord] = useState("")
  const [guessedWords, setGuessedWords] = useState([""])
  const [pressedKey, setPressedKey] = useState("")
  const width = 5
  const height = 6

  const onKeyPress = (key) => {
    setPressedKey(key);
    }

  useEffect(() => {

    if (pressedKey === ""){
      return;
    }

    if (pressedKey !== 'ENTER' && pressedKey !== 'BACKSPACE'){
      if (currentWord === width) {
        //do nothing
      } else {
        setCurrentWord (currentWord + pressedKey)
      }
    }

    if (pressedKey === "BACKSPACE"){
      if (currentWord === ""){
        //do nothign
      } else {
        setCurrentWord (currentWord.slice(0,-1))
      }
    }

    if (pressedKey === "ENTER"){
      if (currentWord.length < width) {
        console.log ("Not enough letters!")
      } else {
        if (ALL_WORDS.includes(currentWord)){
          setCurrentRow(currentRow + 1)
          setGuessedWords(guessedWords.concat(currentWord))
          setCurrentWord("")
        } else {
          console.log("Not in word list")
        }
      }
    }
    setPressedKey("")
  }, [pressedKey])

  const getContent = () => {
    const objToReturn = {}
    for (let currentWordIndex = 0; currentWordIndex < currentWord.length; currentWordIndex++) {
      objToReturn[`${currentRow},${currentWordIndex}`] = {
        color: 'black',
        text: currentWord[currentWordIndex]
      }
    }

    guessedWords.forEach ((guessedWord, rowNumber) => {
      for (let guessedWordIndex = 0; guessedWordIndex < guessedWord.length; guessedWordIndex++) {
        const gridRowNumber = rowNumber
        const gridColNumber = guessedWordIndex
        const character = guessedWord[guessedWordIndex]
        let color;
        if (!answerWord.includes(character)){
          color = "grey"
        }else if (answerWord[guessedWordIndex] === character){
          color = "background-green"
        }else {
          color = "yellow"
        }
        objToReturn[`${gridRowNumber}, ${gridColNumber}`] = {
          color: color,
          text: character
        }
      }
    })

    return objToReturn;
  }

  const userWon = guessedWords.includes(answerWord)
  const userLost = !guessedWords.includes(answerWord) && guessedWords.length === height
  return (
    <div className="app-container">
     <Header />
     {userWon && <div className="winner"> You win! </div>}
     {userLost && <div className="loser"> You lost! </div>}
     <Grid 
      width={width}
      height={height}
      content={getContent()}
     />
      <Keyboard 
        onKeyPress={(key) => onKeyPress(key)}
      />
    </div>                                                                                                            
  );
}

export default App;
