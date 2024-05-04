import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import "../styles/animate-text.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-white/95 dark:bg-black/95 px-6 text-balance">
      <div className="max-w-[80rem] mx-auto">
        <div className="flex flex-col justify-center items-center h-[35rem] md:h-[40rem]">
          <h1 className="leading-[3rem my-8 text-primary dark:text-secondary text-4xl sm:text-5xl md:text-6xl text-center animate-text">
            Write better with Meta Mind
          </h1>
          <Button
            className="my-6 dark:bg-white/95 dark:text-black/95"
            onClick={handleLogin}
            variant={"default"}
          >
            <Mail className="mr-2 h-4 w-4" /> Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;