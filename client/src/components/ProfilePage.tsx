import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#d0daf5] to-[#fff] dark:bg-gradient-to-bl dark:from-[#111524] dark:to-[#000000]">
      <Navbar />
      <div className="max-w-[80rem] mx-auto  px-6">
        <div className="pt-2 pb-4 sm:pt-4 sm:pb-6">
          <ArrowLeft
            onClick={() => navigate(-1)}
            className="h-6 w-6 cursor-pointer text-black dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
