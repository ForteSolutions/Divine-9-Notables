import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DisplayAll from "./components/DisplayAll";
import PetForm from "./components/PetForm";
import EditPet from './components/EditPet';
import OnePet from './components/OnePet';

function App() {
  return (
    <div className="App">
      <h1>Pet Shelter</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayAll />} />
          <Route path="/new" element={<PetForm />} />
          <Route path="/edit/:id" element={<EditPet />} />
          <Route path="/show/:id" element={<OnePet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;