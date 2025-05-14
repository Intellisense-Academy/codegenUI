import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header"

const Dashboard= () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const tenant = localStorage.getItem("tenant");

    if (!username || !tenant) {
      // 🔒 User not logged in — redirect to login
      navigate("/");
    }
  }, []);

  return (
    <div>
        <Header/>
      <h1>Welcome {localStorage.getItem("role")}</h1>
      <h2>{localStorage.getItem("username")}</h2>
      <p>Your tenant ID is: {localStorage.getItem("tenant")}</p>
    </div>
  );
}

export default Dashboard;
