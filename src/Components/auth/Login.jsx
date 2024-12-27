import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the mutation hook
import img from "../../images/logo.webp";
import "./auth.css";
import { useLoginUserMutation } from "../../api/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  
  // Use the mutation hook
  const [loginUser, { isLoading, isSuccess, isError, error: apiError }] = useLoginUserMutation();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Trigger the login API request
      const response = await loginUser(formData).unwrap();
      
      if (response) {
        localStorage.setItem('token', response.token);
        navigate("/");  // Navigate to homepage on success
      }
    } catch (err) {
      setError(apiError?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login">
      <div className="container d-flex justify-content-center align-items-center">
        <div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <img src={img} alt="logo" style={{ width: "230px" }} />
            </div>
            <h3>مرحبا بعودتك</h3>
            <div className="form d-flex flex-column w-100">
              <div className="form-group d-flex flex-column">
                <label className="mb-2" htmlFor="email">البريد الالكتروني</label>
                <input
                  style={{ textAlign: "left" }}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group d-flex flex-column">
                <label className="mb-2" htmlFor="password">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="ادخل كلمة المرور"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="main-btn mt-2" type="submit" disabled={isLoading}>
                {isLoading ? "جاري تسجيل الدخول..." : "سجل دخول"}
              </button>

              {/* Display success message */}
              {isSuccess && <p className="text-success mt-2">تم تسجيل الدخول بنجاح!</p>}

              {/* Display error message */}
              {isError && (
                <p className="text-danger text-center mt-2">
                  {error === "Invalid credentials"
                    ? "البريد الالكتروني او كلمة المرور غير صحيحة"
                    : "حدث خطأ ما"}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
