import React, { useState } from 'react';
import '../style/LoginPage.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response =await fetch ('http://localhost:8080/login',{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body:JSON.stringify({ username, password }),
      });
      const data = await response.json(); 
      if(response.status===200){
        localStorage.setItem("username", data.username);
        localStorage.setItem("tenant", data.tenant);
        localStorage.setItem("role", data.role);
        window.location.href = "/dashboard";
      }else{
        alert(data.message)
      }
    }catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card container p-0 shadow-lg rounded">
        <div className="row g-0">
          <div className="col-md-6 d-none d-md-block login-image-section">
          </div>
          <div className="col-md-6 p-5 bg-white">
            <h2 className="mb-4 text-center text-muted">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingUsername"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label htmlFor="floatingUsername" className="text-muted">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="floatingPassword" className="text-muted">Password</label>
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
