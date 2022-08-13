import {Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./public/home";
import Header from "./component/header.component";
import Footer from "./component/footer.component";
import Portrait from "./public/portraits";
import Pictures from "./public/pictures";
import Voting from "./public/wings";
import VotingConfirmation from "./public/wingsConfirmation";
import {useState} from "react";
import Modal from 'react-modal'

function App() {
    const [op, setOp] = useState(false)
    Modal.setAppElement('#root');

    return (
        <div>
            <Header op={op} setOp={setOp} />
            <Routes>
                <Route path="/" element={<Home op={op} setOp={setOp} />}/>
                <Route path="/wings" element={<Voting />}/>
                <Route path="/wings_confirmation/:id" element={<VotingConfirmation />}/>
                <Route path="/portrait-pictures" element={<Portrait/>}/>
                {/**There's an issue with this particular route */}
                <Route path="/pictures/:collegeName" element={<Pictures/>}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
