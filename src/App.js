import './app.css';
import Header from './components/header.js';
import Grid from './components/grid.js';

function App() {
  const width = 5
  const height = 6


  return (
    <div className="app-container">
     <Header />
     <Grid width={width} height={height} />

    </div>                                                                                                            
  );
}

export default App;
