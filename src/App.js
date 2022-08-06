import {Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./public/home";
import Portrait from "./public/portraits";
import Pictures from "./public/pictures";
import Header from "./component/header.component";
import Footer from "./component/footer.component";

function App() {
    return (
        <div className='w-screen overflow-x-hidden'>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/portrait-pictures" element={<Portrait/>}/>
                <Route path="/pictures" element={<Pictures/>}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
