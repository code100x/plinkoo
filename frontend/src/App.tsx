import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Simulation } from "./pages/plinkoo/Simulation.tsx";
import { Game } from "./pages/plinkoo/Game.tsx";
import { Plinkoo } from "./pages/plinkoo/Plinkoo.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Wheels from "./pages/wheels/Wheels.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/wheels/game" element={<Wheels />} />
                <Route path="/plinkoo" element={<Plinkoo />} />
                <Route path="/plinkoo/simulation" element={<Simulation />} />
                <Route path="/plinkoo/game" element={<Game />} />
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
