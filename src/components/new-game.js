import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import getLanguageConfigs from "../components/language-configs";
import './new-game.scss';

export default function NewGame() {
    const navigate = useNavigate()
    const [width, setWidth] = useState(5)
    const [height, setHeight] = useState(6)
    // const [words, setWords] = useState([])
    // const [keyboardConfig, setKeyboardConfiguration] =useState([])
    const [language, setLanguage] = useState("English")
    const [startingGame, setStartingGame] = useState(false)

    const widthChoices = [2, 3, 4, 5, 6, 7, 8]
    const heightChoices = [2, 3, 4, 5, 6, 7, 8]
    const languageChoices = getLanguageConfigs()
        

    useEffect(() => {
        if (startingGame){
        navigate(`/play?width=${width}&height=${height}&language=${language}`)
    }

    }, [startingGame])


return (
    <div className="new-game-container">
        <h2>
        Configure your Wordle Game!
        </h2>
        <label>Choose a width:</label>
        <select name="width" id="width">
            {widthChoices.map((widthChoice) => {
                if (width ===widthChoice){
                    return (
                        <option value={widthChoice} selected onChange={(w) => setWidth(w)}>{widthChoice}</option>)
                }
                return (
                     <option value={widthChoice} onChange={(w) => setWidth(w)}>{widthChoice}</option>)
            })}
        </select>

        <label>Choose a height:</label>
        <select name="height" id="height">
            {heightChoices.map((heightChoice) => {
                if (height === heightChoice) {
                    return (
                        <option value={heightChoice} selected onChange={(h) => setHeight(h)}>{heightChoice}</option>)
                }
                return(
                <option value={heightChoice} onChange={(h) => setHeight(h)}>{heightChoice}</option>)
            })}
        </select>

        <label>Choose a language: </label>
        <select name="height" id="height">
            {Object.keys(languageChoices).map((languageChoice) => {
                if (language === languageChoice) {
                    return(
                        <option value={languageChoice} selected onChange={(l) => setLanguage(l)}>{languageChoice}</option>)
                }
                return(
                <option value={languageChoice} onChange={(l) => setLanguage(l)}>{languageChoice}</option>)
            })}
        </select>

        <button
        onClick={() => setStartingGame(true)}
        >
            Start Game!
        </button>
    </div>
)
}