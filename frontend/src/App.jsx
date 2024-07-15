import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ComicsList from './ComicList';
import ComicDetails from './ComicDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComicsList />} />
        <Route path="/comic/:id" element={<ComicDetails />} />
      </Routes>
    </Router>
  );
}

export default App;