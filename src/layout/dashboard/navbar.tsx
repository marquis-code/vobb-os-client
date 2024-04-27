import { cn } from "lib";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Button } from "components";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

interface NavBarProps {
  sideBarWidth: string;
  collapse: boolean;
  title: string;
}

const NavBar: React.FC<NavBarProps> = ({ sideBarWidth, collapse, title }) => {
  return (
    <>
      <header
        style={{ width: `calc(100dvw - ${sideBarWidth})`, left: sideBarWidth }}
        className="border-b border-vobb-neutral-30 w-full fixed top-0 right-0 px-4 py-1 h-[55px] flex items-center">
        <div>
          <p
            className={cn(
              "font-workSans font-bold text-lg text-vobb-neutral-100",
              collapse ? "ml-[30px]" : ""
            )}>
            {title}
          </p>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <UserAvatar />
          <div className="mr-1 text-left">
            <p className="font-workSans font-bold mb-[2px] text-sm leading-4">First name</p>
            <p className="text-[11px] text-vobb-neutral-60 leading-3">Role</p>
          </div>
          <Menu />
        </div>
      </header>
    </>
  );
};

const UserAvatar = () => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

const Menu = () => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1">
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Organization Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(Routes.profile)}>
            Account Settings
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Teams</DropdownMenuItem>
          <DropdownMenuItem>Invite member</DropdownMenuItem>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Support</DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { NavBar };
