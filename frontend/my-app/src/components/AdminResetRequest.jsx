
"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Modal, Button } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import indiaFlag from "../assets/images/in-flag.png";
import onboardingImg from "../assets/images/onboarding.png"
// import "../styles/admin-auth.css"

const AdminResetRequest = () => {
  const [phone, setPhone] = useState("+91")
  const [otp, setOtp] = useState("")
  const [showOtpModal, setShowOtpModal] = useState(false)
  const { requestAdminOtp, verifyAdminOtp, loading } = useAuth()
  const navigate = useNavigate()

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    const success = await requestAdminOtp(phone)
    if (success) setShowOtpModal(true)
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const success = await verifyAdminOtp(phone, otp)
    if (success) {
      setShowOtpModal(false)
      navigate("/admin/reset-password", { replace: true })
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="logo-onboarding" style={{ backgroundImage: `url(${onboardingImg})` }}>
          <h1 className="logo">EazyWed</h1>
        </div>
        <div className="sign-in-form">
          <h4>Welcome to EazyWed</h4>
          <form id="admin-reset-request-form" onSubmit={handlePhoneSubmit}>
            <h5>Reset Password</h5>
            <div className="phone-area">
              <img src={ indiaFlag  || "/placeholder.svg"} alt="Indian Flag" />
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Enter your phone number"
                disabled={loading}
              />
            </div>
            <div className="back-forth-buttons">
              <div className="back-button">
                <Button type="button" onClick={() => navigate("/admin/login")} disabled={loading}>
                  Back
                </Button>
              </div>
              <div className="submit-continue-button">
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Continue"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal show={showOtpModal} onHide={() => setShowOtpModal(false)} centered dialogClassName="otp-modal">
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
          <Button className="verify-button" onClick={handleOtpSubmit} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
          <Button className="cancel-button" onClick={() => setShowOtpModal(false)} disabled={loading}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  )
}

export default AdminResetRequest