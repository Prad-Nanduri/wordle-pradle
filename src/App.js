import './app.css';
import Header from './components/header.js';
import Grid from './components/grid.js';
import Keyboard from './components/keyboard.js';
import ALL_WORDS from './components/english.json';
import {useState, useEffect} from 'react';

function App() {


  const width = 5
  const height = 6
  const validEnglishWords = Object.keys(ALL_WORDS)
  .filter((word) =>  (word.length === width))
  .map((word) => word.toUpperCase())
  const [answerWord, setAnswerWord] = useState(validEnglishWords[Math.floor(Math.random()*(validEnglishWords.length))]
)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentWord, setCurrentWord] = useState("")
  const [guessedWords, setGuessedWords] = useState([])
  const [pressedKey, setPressedKey] = useState("")
  const [flashMessage, setFlashMessage] = useState(null)

  const onKeyPress = (key) => {
    setPressedKey(key);
    }

    // useEffect(() => {
    //   if(flashMessage != null){
        
    //   }
    // }, [flashMessage])



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
        flash("Not enough letters!")
        console.log ("Not enough letters!")
      } else {
        if (validEnglishWords.includes(currentWord)){
          setCurrentRow(currentRow + 1)
          setGuessedWords(guessedWords.concat(currentWord))
          setCurrentWord("")
        } else {
          flash("Not in word list")
          console.log("Not in word list")
        }
      }
    }
    setPressedKey("")
  }, [pressedKey])


  const flash = (message) => {
    setFlashMessage(message)
    setTimeout(() => {
      setFlashMessage(null)
    }, 1000)
  }


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
          color = "green"
        }else {
          color = "yellow"
        }
        objToReturn[`${gridRowNumber},${gridColNumber}`] = {
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
     {flashMessage != null && <div className="flash">{flashMessage}</div>}
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
