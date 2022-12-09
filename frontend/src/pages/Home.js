import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="hero h-screen">
      <div className="hero-content -translate-y-12">
        <div className="max-w-md flex flex-col">
          <h1 className="text-6xl font-black w-84 text-white text-clip overflow-hidden">
            Nourish your body, mind, and soul.
          </h1>
          <p className="py-6 text-white">
            Toronto Fitness Club (TFC®) offers expert trainers, top-of-the-line
            facilities, and a wide range of fitness classes to help our members
            achieve their health and wellness goals. <br />
            Join our community and discover a new level of vitality and
            happiness. Welcome to TFC - where fitness meets wellness.
          </p>
          <Link
            to="/plans"
            className="btn btn-secondary shadow-lg shadow-secondary/50"
          >
            Join Now
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
