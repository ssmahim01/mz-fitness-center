import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url('gym-accessories.jpg')"
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="md:w-3/5 w-11/12 flex flex-col justify-center items-center">
          <h1 className="mb-5 md:text-4xl text-2xl font-bold">Welcome to MZ Fitness Center</h1>
          <p className="mb-5 md:text-base text-sm">
           It is the best fitness center for you, Where we are provide best services for our customers. So, do not forget to add your schedule.
          </p>
          <Link to="/addSchedule"><button className="btn btn-info text-white font-bold">Get Started</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
