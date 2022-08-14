import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./public/home";
import Header from "./component/header.component";
import Footer from "./component/footer.component";
import Voting from "./public/wings_awards/wings";
import VotingConfirmation from "./public/wings_awards/wingsConfirmation";
import { useState } from "react";
import Modal from 'react-modal'
import LandingPage from "./public/landingPage";

function App() {
    const [op, setOp] = useState(false)
    Modal.setAppElement('#root');

    return (
        <>
            <Header op={op} setOp={setOp} />
            <Routes>
                <Route path="/" element={<Home op={op} setOp={setOp} />}>
                    <Route index element={<LandingPage op={op} setOp={setOp} />} />
                    <Route path="wings" element={<Voting />} />
                    <Route path="wings_confirmation/:id" element={<VotingConfirmation />} />
                </Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
