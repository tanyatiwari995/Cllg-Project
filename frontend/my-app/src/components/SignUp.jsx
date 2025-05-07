"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import indiaFlag from "../assets/images/in-flag.png"; // 🇮🇳 Use India flag image
import onboardingImg from "../assets/images/onboarding.png";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("+91");
  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const { signUp, verifySignUpOtp, loading } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await signUp(fullName, phone);
    if (success) setShowOtpModal(true);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const success = await verifySignUpOtp(fullName, phone, otp);
    if (success) {
      setShowOtpModal(false);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="main-container">
        <div
          className="logo-onbaording"
          style={{ backgroundImage: `url(${onboardingImg})` }}
        >
          <h1 className="logo">EazyWed</h1>
        </div>
        <div className="sign-in-form col-6">
          <h4>Welcome to EazyWed</h4>
          <form id="signup-form" onSubmit={handleFormSubmit}>
            <h5>Sign Up</h5>
            <label htmlFor="name" className="pb-2">
              Full Name *
            </label>
            <div className="name-area">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <label htmlFor="phone">Contact Number *</label>
            <div className="phone-area">
              <img
                src={indiaFlag}
                alt="India Flag"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.svg";
                }}
              />
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="redirect-to-sign-in pt-3">
              <Link to="/signin">Already have an account?</Link>
            </div>

            <div className="back-forth-buttons">
              <div className="back-button">
                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  disabled={loading}
                >
                  Back
                </Button>
              </div>
              <div className="submit--continue-button">
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Continue"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal
        show={showOtpModal}
        onHide={() => setShowOtpModal(false)}
        centered
        dialogClassName="otp-modal"
      >
        <Modal.Body className="otp-modal-content">
          <h6>Enter OTP</h6>
          <input
            type="text"
            id="otpInput"
            placeholder="Enter the OTP sent to your number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
          />
          <Button
            className="verify-button"
            onClick={handleOtpSubmit}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
          <Button
            className="cancel-button"
            onClick={() => setShowOtpModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default SignUp;
