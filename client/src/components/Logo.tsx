import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/home">
      <div className="flex gap-1 items-center">
        <h1 className="text-primary font-bold text-lg sm:text-2xl drop-shadow-2xl">
          META
        </h1>
        <h1 className="text-primary text-xs sm:text-base font-bold ">MIND</h1>
      </div>
    </Link>
  );
};

export default Logo;
