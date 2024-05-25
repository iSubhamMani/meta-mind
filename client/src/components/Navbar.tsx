import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { LogOut, User, SunMoon, PencilLine } from "lucide-react";
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

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const navigateToNewPost = () => {
    navigate("/new-post");
  };

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-b from-[#d1e5ffa0] to-[#ffffffa9] dark:bg-gradient-to-b dark:from-[#111524a4] dark:to-[#000000a7] backdrop-blur-md px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28">
      <div className="pt-6">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center">
            <Link to="/search">
              <Search className="text-black dark:text-white" />
            </Link>
            <div className="mx-5 sm:mx-8">
              <PencilLine
                onClick={navigateToNewPost}
                className="text-primary cursor-pointer h-6 w-6"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer dark:border-2 border-gray-300">
                  <AvatarImage src={user?.user.photoURL} />
                  <AvatarFallback>{DEFAULT_PROFILE_PHOTO}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 dark:bg-[#1e1e1e] dark:text-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <Link to="/profile">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <SunMoon className="mr-2 h-4 w-4" />
                    <span>Light theme</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
