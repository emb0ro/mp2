import { Routes, Route, Link } from 'react-router-dom'
import ListView from './pages/ListView'
import GalleryView from './pages/GalleryView'
import DetailView from './pages/DetailView'
import './App.css'


function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Meal Explorer</h1>
          <nav className="nav">
            <Link to="/">List</Link>
            <Link to="/gallery">Gallery</Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/meal/:id" element={<DetailView />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
