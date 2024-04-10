import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [authToken] = useState(null);
  const navigate = useNavigate();

  const handleNextPage = () => {
    navigate("/onboarding"); 
  };

  const handleClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignUp(true);
  };

  return (
    <div className="overlay">
      <Nav
        minimal={false}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignUp={setIsSignUp}
      />
      <div className="home">
        <h1 className="primary-title">Find Your HackMate®</h1>
        <div className="button-container">
          <button className="primary-button" onClick={handleClick}>
            {authToken ? "Signout" : "Create Account"}
          </button>
          {showModal && (
            <AuthModal setShowModal={setShowModal} isSignUp={isSignUp} />
          )}
          <button
            className="primary-button"
            onClick={handleNextPage}
            style={{ marginTop: "10px" }}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
