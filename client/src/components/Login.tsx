import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import "../styles/animate-text.css";
import { signInWithPopup, GoogleAuthProvider, User } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(async () => {
        await addUserToDB(auth.currentUser);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addUserToDB = async (user: User | null) => {
    try {
      await axios.post(`${SERVER_URL}/api/v1/users/add-user`, {
        user,
      });
    } catch (error) {
      console.log("LoginError: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-white/95 dark:bg-[#0e0e0e] px-6 text-balance">
      <div className="max-w-[80rem] mx-auto">
        <div className="flex flex-col justify-center items-center h-[35rem] md:h-[40rem]">
          <h1 className="leading-[3rem] my-8 text-black dark:text-white text-4xl sm:text-5xl md:text-6xl text-center animate-text">
            Write better with <span className="text-primary">Meta Mind</span>
          </h1>
          <Button className="my-6" onClick={handleLogin} variant={"default"}>
            <Mail className="mr-2 h-4 w-4" /> Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
