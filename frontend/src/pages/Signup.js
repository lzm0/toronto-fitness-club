import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthService from "../services/auth-service";

function Signup() {
  const navigate = useNavigate();

  if (AuthService.isAuthenticated()) {
    return <Navigate to="/account" />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password1 = event.target.password1.value;
    const password2 = event.target.password2.value;
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }
    const first_name = event.target.first_name.value;
    const last_name = event.target.last_name.value;
    const phone_number = event.target.phone_number.value;
    fetch(`http://${window.location.hostname}:8000/api/profile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password: password1,
        first_name,
        last_name,
        phone_number,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Account created successfully");
          navigate("/login");
        } else {
          response.json().then((data) => {
            alert(`Error: ${JSON.stringify(data)}`);
          });
        }
      })
      .catch((error) => {
        alert(`Error: ${error}`);
      });
  };

  return (
    <div className="py-10 flex items-center justify-center">
      <div className="card bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Create your account</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password1"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                type="password"
                name="password2"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">First name</span>
              </label>
              <input
                type="text"
                name="first_name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last name</span>
              </label>
              <input
                type="text"
                name="last_name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone number</span>
              </label>
              <label className="input-group">
                <span>+1</span>
                <input
                  type="tel"
                  name="phone_number"
                  className="input input-bordered"
                  pattern="\d{3}[-\s\(\)]?\d{3}[-\s\(\)]?\d{4}"
                  required
                />
              </label>
            </div>
            <div className="form-control mt-4 mb-2">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-secondary"
                required
              />
            </div>
            <div className="text-center">
              <span className="label-text">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Log in
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
