import {Route, Routes} from "react-router-dom";
import './App.css';
import Home from "./public/home";
import Header from "./component/header.component";
import Footer from "./component/footer.component";

function App() {
    return (
        <div className='w-screen overflow-x-hidden'>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
