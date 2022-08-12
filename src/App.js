import {Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./public/home";
import Portrait from "./public/portraits";
import Pictures from "./public/pictures";
import Header from "./component/header.component";
import Footer from "./component/footer.component";
import Voting from "./public/wings";
import VotingConfirmation from "./public/wingsConfirmation";
import {useState} from "react";
import Modal from 'react-modal'
function App() {
    const [op, setOp] = useState(false)
    Modal.setAppElement('#root');
    return (
        <div className='w-screen overflow-x-hidden'>
            <Header/>
            <Routes>
                <Route path="/" element={<Home op={op} setOp={setOp} />}/>
                <Route path="/wings" element={<Voting />}/>
                <Route path="/wings_confirmation/:id" element={<VotingConfirmation />}/>
                
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
