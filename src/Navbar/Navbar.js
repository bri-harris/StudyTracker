import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="logo-container">
        <img
          src="StudyTrackerIcon.png"
          className="logo"
          onClick={() => window.open("https://github.com/alexdeluera/StudyTracker", "_blank")}
          alt="StudyTracker Icon"
        />
      </div>

      {/* Container for Home and Team options */}
      <div className="nav-options">
        <div
          className="header-option-container"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <div className="header-option-text">Home</div>
        </div>

        <div
          className="header-option-container"
          onClick={() => {
            navigate(`/team`);
          }}
        >
          <div className="header-option-text">Team</div>
        </div>

        <div
          className="header-option-container"
          onClick={() => {
            navigate(`/signin`);
          }}
        >
          <div className="header-option-text">Sign In</div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
