# Pradle - Customized Wordle / Wordle but better - Enhanced Word Guessing Game

A dynamic and customizable version of the popular Wordle game that allows players to challenge themselves with varying word lengths and attempt limits.
Unlike the traditional NY Times Wordle that limits players to 6 attempts at 5-letter words, this enhanced version lets you test your English vocabulary with customizable parameters!

## 🎮 Features

### Core Gameplay
- **Customizable Word Length**: Choose words from 2 to 8 letters
- **Adjustable Attempts**: Select anywhere from 2 to 8 attempts to guess the word
- **Multiple Language Support**: Currently supports English (framework in place for adding more languages)
- **Color-Coded Feedback**:
  - 🟩 Green: Letter is correct and in the right position
  - 🟨 Yellow: Letter is in the word but in wrong position
  - ⬜ Grey: Letter is not in the word

### Enhanced Features
- **Interactive Keyboard**: On-screen keyboard with color feedback for used letters
- **Animated Tiles**: Smooth flip animations when revealing guesses
- **Statistics Tracking**:
  - Games played
  - Win percentage
  - Current streak
  - Best streak
  - Guess distribution
- **Share Results**: Share your game results with friends using emoji grid representation
- **Game State Management**: 
  - Persistent game state across browser refreshes
  - Start new game option after completion

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository

```bash
git clone https://github.com/Prad-Nanduri/wordle-pradle.git
```

2. Navigate to project directory

```bash
cd wordle-pradle
```

3. Install dependencies

```bash
npm install
```

4. Start the development server
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Play

1. **Configure Your Game**:
   - Select word length (2-8 letters)
   - Choose number of attempts (2-8 tries)
   - Select language (English)

2. **Start Guessing**:
   - Type or click letters on the virtual keyboard
   - Press ENTER to submit your guess
   - Use BACKSPACE to delete letters

3. **Use the Feedback**:
   - Green: Correct letter in correct spot
   - Yellow: Correct letter in wrong spot
   - Grey: Letter not in word

4. **Win or Lose**:
   - Win by guessing the word within allowed attempts
   - View statistics and share results after game completion

## 🛠️ Technical Stack

- React.js
- SCSS for styling
- Local Storage for game state persistence
- React Router for nav


## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a Pull Request

Please ensure your PR describes the changes and updates any relevant documentation.

## 📝 Future Enhancements

- [ ] Additional language support
- [ ] Custom word list upload
- [ ] Difficulty modes
- [ ] Multiplayer mode
- [ ] Time-based challenges
- [ ] Mobile app version

"THESE ARE IDEAS GIVEN BY CLAUDE 3.5 SONNET - not my unique ideas. I made this READMe file with the help of the model as well"

## 🙏 Acknowledgments

- Inspired by the original [Wordle](https://www.nytimes.com/games/wordle/index.html) by Josh Wardle
- Word list sourced from [https://github.com/dwyl/english-words/blob/master/words_dictionary.json]
