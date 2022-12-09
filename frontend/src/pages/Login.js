import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("access_token", data.access);
        }
        if (data.refresh) {
          localStorage.setItem("refresh_token", data.refresh);
        }
      })
      .then(() => {
        navigate(-1);
      }, []);
  };

  return (
    <div className="h-screen -translate-y-12 flex items-center justify-center">
      <div className="card bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Welcome back</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-control mt-4 mb-2">
              <input
                type="submit"
                value="Log in"
                className="btn btn-secondary"
              />
            </div>
            <div className="text-center">
              <span className="label-text">
                Don't have an account?{" "}
                <Link to="/signup" className="link link-primary">
                  Sign up
                </Link>{" "}
                for free!
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
