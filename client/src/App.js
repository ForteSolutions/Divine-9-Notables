import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAll from "./components/DisplayAll";
import NotableForm from "./components/NotableForm";
import EditNotable from './components/EditNotable';
import OneNotable from './components/OneNotable';

function App() {
  return (
    <div className="App">
      <h1 className="text-primary">DIVINE 9 NOTABLES</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/new" element={<NotableForm />} />
          <Route path="/edit/:id" element={<EditNotable />} />
          <Route path="/show/:id" element={<OneNotable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;