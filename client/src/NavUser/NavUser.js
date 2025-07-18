import { useNavigate } from "react-router-dom";
import "./NavUser.css";

const NavUser = () => {
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
            navigate(`/study`);
          }}
        >
          <div className="header-option-text">Study</div>
        </div>

        <div
          className="header-option-container"
          onClick={() => {
            navigate(`/pomodoro`);
          }}
        >
          <div className="header-option-text">Pomodoro</div>
        </div>

        <div
          className="header-option-container"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <div className="header-option-text">Log Out</div>
        </div>

      </div>
    </div>
  );
};

export default NavUser;