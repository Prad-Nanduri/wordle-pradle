import './game.scss';
import Header from './header.js';
import Grid from './grid.js';
import Keyboard from './keyboard.js';
import getLanguageConfigs from "../components/language-configs";
import {useState, useEffect, useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';

export default function Game(props) {
    const [searchParams] = useSearchParams();
    const width = parseInt(searchParams.get("width"))
    const height = parseInt(searchParams.get("height"))
    const language = searchParams.get("language")

  const [pressedKey, setPressedKey] = useState("")
  const [flashMessage, setFlashMessage] = useState(null)
  const [validWords, setValidWords] = useState([])
  const [keyboard, setKeyboard] = useState([])
  const [letterStates, setLetterStates] = useState({});
  // const [gameStats, setGameStats] = useState({
  //   gamesPlayed: 0,
  //   gamesWon: 0,
  //   currentStreak: 0,
  //   maxStreak: 0,
  //   guessDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
  // });


  const [answerWord, setAnswerWord] = useState(() => {
    const saved = localStorage.getItem('answerWord');
    return saved || null;
});

const [currentRow, setCurrentRow] = useState(() => {
    const saved = localStorage.getItem('currentRow');
    return saved ? parseInt(saved) : 0;
});

const [currentWord, setCurrentWord] = useState(() => {
    const saved = localStorage.getItem('currentWord');
    return saved || "";
});

const [guessedWords, setGuessedWords] = useState(() => {
    const saved = localStorage.getItem('guessedWords');
    return saved ? JSON.parse(saved) : [];
});

const [gameStats, setGameStats] = useState(() => {
    const saved = localStorage.getItem('gameStats');
    return saved ? JSON.parse(saved) : {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        maxStreak: 0,
        guessDistribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
    };
});

useEffect(() => {
  if (answerWord) localStorage.setItem('answerWord', answerWord);
}, [answerWord]);

useEffect(() => {
  localStorage.setItem('currentRow', currentRow.toString());
}, [currentRow]);

useEffect(() => {
  localStorage.setItem('currentWord', currentWord);
}, [currentWord]);

useEffect(() => {
  localStorage.setItem('guessedWords', JSON.stringify(guessedWords));
}, [guessedWords]);

useEffect(() => {
  localStorage.setItem('gameStats', JSON.stringify(gameStats));
}, [gameStats]);

const startNewGame = () => {
  // Clear game-specific localStorage items
  localStorage.removeItem('answerWord');
  localStorage.removeItem('currentRow');
  localStorage.removeItem('currentWord');
  localStorage.removeItem('guessedWords');

  // Reset states
  setCurrentRow(0);
  setCurrentWord("");
  setGuessedWords([]);
  setLetterStates({});
  
  // Get new answer word
  if (validWords.length > 0) {
    const newAnswerWord = validWords[Math.floor(Math.random() * validWords.length)];
    setAnswerWord(newAnswerWord);
  }
};


  const onKeyPress = (key) => {
    setPressedKey(key);
    }

    // Accept both upper and lowercase, handle Enter/Backspace
const handlePhysicalKeyboard = useCallback(
  (event) => {
    let key = event.key;
    if (key.length === 1 && key.match(/[a-zA-Z]/i)) {
      key = key.toUpperCase();
      onKeyPress(key);
    } else if (key === "Enter") {
      onKeyPress("ENTER");
    } else if (key === "Backspace") {
      onKeyPress("BACKSPACE");
    }
  },
  [onKeyPress]
);

useEffect(() => {
  window.addEventListener("keydown", handlePhysicalKeyboard);
  return () => window.removeEventListener("keydown", handlePhysicalKeyboard);
}, [handlePhysicalKeyboard]);

    const updateLetterStates = (guessedWord) => {
      const newStates = { ...letterStates };
      
      for (let i = 0; i < guessedWord.length; i++) {
        const letter = guessedWord[i];
        if (!answerWord.includes(letter)) {
          newStates[letter] = 'grey';
        } else if (answerWord[i] === letter) {
          newStates[letter] = 'green';
        } else if (!newStates[letter] || newStates[letter] !== 'green') {
          newStates[letter] = 'yellow';
        }
      }
      
      setLetterStates(newStates);
    };


    const updateStats = (won) => {
      setGameStats(prevStats => {
        const newStats = {...prevStats};
        newStats.gamesPlayed += 1;
        
        if (won) {
          newStats.gamesWon += 1;
          newStats.currentStreak += 1;
          newStats.maxStreak = Math.max(newStats.currentStreak, newStats.maxStreak);
          newStats.guessDistribution[currentRow] = (newStats.guessDistribution[currentRow] || 0) + 1;
        } else {
          newStats.currentStreak = 0;
        }
        
        return newStats;
      });
    };

    const StatsDisplay = () => (
      <div className="stats-container">
        <h3>Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">{gameStats.gamesPlayed}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {Math.round((gameStats.gamesWon / gameStats.gamesPlayed) * 100) || 0}%
            </div>
            <div className="stat-label">Win Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{gameStats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{gameStats.maxStreak}</div>
            <div className="stat-label">Best Streak</div>
          </div>
        </div>
      </div>
    );


    // Share functionality
const shareResults = () => {
  const emojiGrid = guessedWords.map(word => {
    return word.split('').map((letter, index) => {
      if (!answerWord.includes(letter)) return '⬜';
      if (answerWord[index] === letter) return '🟩';
      return '🟨';
    }).join('');
  }).join('\n');

  const shareText = `Wordle Clone ${currentRow}/6\n\n${emojiGrid}`;
  
  navigator.clipboard.writeText(shareText).then(() => {
    flash('Copied to clipboard!');
  });
};
    

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
    }, [language, width])

  useEffect(() => {

    if (pressedKey === ""){
      return;
    }

    if (pressedKey !== 'ENTER' && pressedKey !== 'BACKSPACE'){
      if (currentWord.length === width) {
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
          const isWinningWord = currentWord === answerWord;
          setCurrentRow(currentRow + 1)
          setGuessedWords(guessedWords.concat(currentWord))
          updateLetterStates(currentWord)
          updateStats(isWinningWord)
          setCurrentWord("")
        } else {
          flash("Not in word list")
          console.log("Not in word list")
        }
      }
    }
    setPressedKey("")
  }, [pressedKey, currentWord, width, validWords, currentRow, guessedWords, updateLetterStates]) 


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
      {(userWon || userLost) && (
  <div className="result-box">
    <div className={`result-headline ${userWon ? "win" : "lose"}`}>
      {userWon ? "You Win!" : "You Lost"}
    </div>
    <div className="result-answer-label">
      {userWon ? "The answer was:" : "The correct word was:"}
    </div>
    <div className={`result-answer-tile ${userWon ? "wordle-green" : "wordle-yellow"}`}>
      {answerWord}
    </div>
    <div className="result-actions">
      <button className="result-btn-green" onClick={startNewGame}>Start New Game</button>
      <button className="result-btn-black" onClick={shareResults}>Share Results</button>
    </div>
    <StatsDisplay />
  </div>
)}
      {flashMessage != null && <div className="flash">{flashMessage}</div>}
      <Grid 
        width={width}
        height={height}
        content={getContent()}
      />
      <Keyboard
        keyboardConfiguration={keyboard}
        onKeyPress={(key) => onKeyPress(key)}
        letterStates={letterStates}
      />
    </div>
  );
}

