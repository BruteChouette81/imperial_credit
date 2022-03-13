import Install from './components/Install';
import Home from './components/Home';

function App() {
  if (window.ethereum) {
    console.log("i exist")
    return <Home />;
  } else {
    return <Install />
  }
}

export default App;