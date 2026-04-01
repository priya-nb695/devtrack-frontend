import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const { data } = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login failed");
    }
  };

 return (
  <div className="page">
    <div className="card">
      <h2 className="title">Welcome Back 👋</h2>
      <p className="subtitle">Login using your email</p>

      {errorMsg && <div className="error">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="form">
        <label className="label">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="label">Password</label>
        <div className="passwordBox">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" className="button">Login</button>
      </form>

      <p className="footer">
        New user? <Link to="/register">Create account</Link>
      </p>
    </div>
  </div>
);
}

export default Login;

