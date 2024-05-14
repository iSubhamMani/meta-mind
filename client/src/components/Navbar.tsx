import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import Input from "./Input";
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
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const navigateToNewPost = () => {
    navigate("/new-post");
  };

  return (
    <div>
      <div className="pt-6">
        <div className="flex justify-between items-center">
          <div className="w-full max-w-[35rem] flex justify-center items-center bg-gray-200 dark:bg-[#1e1e1e] rounded-full px-4 py-3">
            <Input />
            <Search className="text-black dark:text-white" />
          </div>
          <div className="flex items-center">
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
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
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
