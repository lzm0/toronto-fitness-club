import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="py-10 flex items-center justify-center">
      <div className="card bg-base-100">
        <div className="card-body">
          <h1 className="card-title">Create your account</h1>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                className="input input-bordered"
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
                />
              </label>
            </div>
            <div className="form-control mt-4 mb-2">
              <input
                type="submit"
                value="Sign Up"
                className="btn btn-secondary"
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
