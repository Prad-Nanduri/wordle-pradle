import './keyboard.scss'

export default function Keyboard() {
    const characters = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER"],
        ["Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
    ]

    return (
        <div className="keyboard-container">
            {characters.map((row, i) => {
                return (
                <div className = "row-container" key={i}>
                    {row.map((character, j) => {
                        return (
                        <div className = "keyword-button">
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