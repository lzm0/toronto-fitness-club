import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-black">Toronto Fitness Club</h1>
          <p className="py-6">
            Toronto Fitness Club (TFC) is a fitness club that offers a variety
            of fitness classes and programs. We are proud to be a part of the
            Toronto community and we are committed to providing our members with
            the best possible fitness experience.
          </p>
          <Link to="/plans" className="btn btn-primary">
            See Plans
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
