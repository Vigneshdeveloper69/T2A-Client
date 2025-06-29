import Navbar from './components/Navbar'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TextToAudio from './pages/TextToAudio';
import AudioToText from './pages/AudioToText';
import About from './pages/About';

function App() {
  return (
    <Router basename="/T2A-Client">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-to-audio" element={<TextToAudio />} />
        <Route path="/audio-to-text" element={<AudioToText />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
