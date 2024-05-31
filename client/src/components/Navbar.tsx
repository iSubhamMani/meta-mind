import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { LogOut, User, PencilLine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { DEFAULT_PROFILE_PHOTO } from "@/utils/constants";
import RootState from "@/interfaces/RootState";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { ModeToggle } from "./mode-toggle";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast } from "sonner";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const navigateToNewPost = () => {
    navigate("/new-post");
  };

  const handleLogout = async () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logout successfull", {
          style: {
            fontWeight: "bolder",
            color: "#fff",
            backgroundColor: "#007E50",
          },
        });
      })
      .catch((error) => {
        // An error happened.
        toast.error(
          "Something went wrong! Please check your internet connection",
          {
            style: {
              fontWeight: "bolder",
              color: "#fff",
              backgroundColor: "#FF0000",
            },
          }
        );
        console.log(error);
      });
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-b from-[#d1e5ffa0] to-[#ffffffa9] dark:bg-gradient-to-b dark:from-[#111524a4] dark:to-[#000000a7] backdrop-blur-md px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
      <div className="pt-6">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-6">
            <Link to="/search">
              <Search className="text-black dark:text-white" />
            </Link>
            <div className="hidden sm:inline-block">
              <PencilLine
                onClick={navigateToNewPost}
                className="text-primary cursor-pointer h-6 w-6"
              />
            </div>
            <div>
              <ModeToggle />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border-2 dark:border-gray-300 border-gray-700">
                  <AvatarImage src={user?.user.photoURL} />
                  <AvatarFallback>{DEFAULT_PROFILE_PHOTO}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 dark:bg-[#1e1e1e] dark:text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link className="inline-block sm:hidden" to="/new-post">
                    <DropdownMenuItem>
                      <PencilLine className="mr-2 h-4 w-4" />
                      <span>Write</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  );
};

export default Navbar;
