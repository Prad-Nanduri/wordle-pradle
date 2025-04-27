import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import getLanguageConfigs from "../components/language-configs";
import './new-game.scss';

export default function NewGame() {
    const navigate = useNavigate()
    const [width, setWidth] = useState(5)
    const [height, setHeight] = useState(6)
    const [language, setLanguage] = useState("English")
    const [startingGame, setStartingGame] = useState(false)

    const widthChoices = [2, 3, 4, 5, 6, 7, 8]
    const heightChoices = [2, 3, 4, 5, 6, 7, 8]
    const languageChoices = getLanguageConfigs()
        
    useEffect(() => {
        if (startingGame){
            navigate(`/play?width=${width}&height=${height}&language=${language}`)
        }
    }, [startingGame, navigate, width, height, language])

    const onWidthChange = (e) => setWidth(e.target.value)
    const onHeightChange = (e) => setHeight(e.target.value)
    const onLanguageChange = (e) => setLanguage(e.target.value)

    return (
        <div className="new-game-landing">
            <h1 className="headline">
                <span>Wordle&nbsp;Reimagined-&nbsp;</span>
                <span className="headline-gradient">Pradle!</span>
            </h1>
            <div className="subtitle">
                Not boring!<br />
                <span>
                Test your<strong> Vocabulary </strong> with fully customizable word length and tries.
                </span>
            </div>
            <div className="config-card">
                <label>Choose word length</label>
                <select name="width" defaultValue={width} onChange={onWidthChange}>
                    {widthChoices.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <label>Choose number of tries</label>
                <select name="height" defaultValue={height} onChange={onHeightChange}>
                    {heightChoices.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <label>Choose a language</label>
                <select name="language" defaultValue={language} onChange={onLanguageChange}>
                    {Object.keys(languageChoices).map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <button onClick={() => setStartingGame(true)}>
                    Start Game!
                </button>
            </div>
        </div>
    )
}