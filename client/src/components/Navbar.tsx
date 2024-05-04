import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import Input from "./Input";
import { LogOut, User, SunMoon } from "lucide-react";
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
import { defaultProfilePhoto } from "@/utils/constants";
import RootState from "@/interfaces/RootState";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <div className="pt-6">
        <div className="flex justify-between items-center space-x-6">
          <div className="w-full max-w-[35rem] flex justify-center items-center bg-gray-200 rounded-full px-4 py-3">
            <Input />
            <Search />
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer dark:border-2 border-gray-300">
                  <AvatarImage src={user?.user.photoURL} />
                  <AvatarFallback>{defaultProfilePhoto}</AvatarFallback>
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
