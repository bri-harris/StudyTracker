import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Home = () => {
    
    return (

        <div className="home-page-container">
            <Navbar />

            <div class="home-picture">
                <img src="main_pomodoro.png" alt="bolCover" class="" id="heroImage"/>
            </div>

            <div class="description">
                <div class="desc-header">Study Tracker</div>
                <div class="desc-text">The Study Tracker application leverages scheduling, prioritization, and organization with the proven Pomodoro study method to maximize the efficacy of your study time.</div>
            </div>

            <Footer />

        </div>
    );
};

export default Home;