import './keyboard.scss'

// Keyboard.js
export default function Keyboard(props) {
    const characterRows = props.keyboardConfiguration || [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER"],
        ["Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
    ];

    return (
        <div className="keyboard-container">
            {characterRows.map((row, i) => {
                return (
                <div className="row-container" key={i}>
                    {row.map((character, j) => {
                        const state = props.letterStates[character] || '';
                        return (
                        <div 
                            className={`keyword-button ${state ? `background-${state}` : ''}`}
                            key={j}
                            onClick={() => props.onKeyPress(character)}
                        >
                            {character}
                        </div>
                        )
                    })}
                </div>
                )
            })}
        </div>
    )
}