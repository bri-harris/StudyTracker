import {useNavigate} from "react-router-dom";
import "./Footer.css"

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div id="footerBar">
            {/* <div>
                <h2 id="footerTitle">StudyTracker</h2>
                <img id="footerImage" src="BoL Logo Edited.png"></img>
            </div> */}

            <div id="socials">
                <a href="https://github.com/alexdeluera/StudyTracker">
                    <img src="github_logo.png" id="socials"></img>
                </a>
            </div> 
        </div>
    )
}

export default Footer