import './game.scss';
import Header from '../components/new-game';
import Grid from '../components/new-game';
import Keyboard from '../components/new-game';
import getLanguageConfigs from "../components/language-configs";
import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';

export default function Game(props) {
    const [searchParams] = useSearchParams();
    const width = parseInt(searchParams.get("width"))
    const height = parseInt(searchParams.get("height"))
    const language = searchParams.get("language")
  const [answerWord, setAnswerWord] = useState(null)
  const [currentRow, setCurrentRow] = useState(0)
  const [currentWord, setCurrentWord] = useState("")
  const [guessedWords, setGuessedWords] = useState([])
  const [pressedKey, setPressedKey] = useState("")
  const [flashMessage, setFlashMessage] = useState(null)
  const [validWords, setValidWords] = useState([])
  const [keyboard, setKeyboard] = useState([])


  const onKeyPress = (key) => {
    setPressedKey(key);
    }

   useEffect(() => {
    const config = getLanguageConfigs()[language]
    fetch(config.wordsUrl, {
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const validWords = Object.keys(data).filter (word => word.length === width).map(word => word.toUpperCase())
            setValidWords(validWords)
            setAnswerWord(validWords[Math.floor(Math.random()*validWords.length)])
            setKeyboard(config.keyboard)
        })
    }, [])

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
        if (validWords.includes(currentWord)){
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
        keyboardConfiguration={keyboard}
        onKeyPress={(key) => onKeyPress(key)}
      />
    </div>                                                                                                            
  );
}

