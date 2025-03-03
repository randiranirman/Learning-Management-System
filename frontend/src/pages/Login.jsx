import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
  };

  return (
    <div>
      <div>
        <div>
          <h2>Learn<span>Sphere</span></h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p>{error}</p>}
            <button type="submit">Login Now</button>
          </form>
        </div>
        <div>
          <p>"LearnSphere: Simplifying Learning, Empowering Growth."</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
