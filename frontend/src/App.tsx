import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EntertainerList from './pages/EntertainersList';
import AddEntertainerForm from './components/AddEntertainerForm';
import EntertainerDetails from './pages/EntertainerDetails';
import WelcomePage from './pages/WelcomePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/entertainers" element={<EntertainerList />} />
        <Route path="/add-entertainer" element={<AddEntertainerForm />} />
        <Route
          path="/entertainer/:entertainerID"
          element={<EntertainerDetails />}
        />
      </Routes>
    </Router>
  );
}

export default App;
