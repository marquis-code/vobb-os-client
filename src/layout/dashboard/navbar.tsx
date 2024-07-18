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
import { useUserContext } from "context";
import { useFetchUser, useLogout } from "hooks";

interface NavBarProps {
  sideBarWidth: string;
  collapse: boolean;
  title: string;
}

const NavBar: React.FC<NavBarProps> = ({ sideBarWidth, collapse, title }) => {
  const { userDetails } = useUserContext();
  const { logout } = useLogout();

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
            <p className="font-workSans font-bold mb-[2px] text-sm leading-4">
              {userDetails?.firstName}
            </p>
            <p className="text-[11px] text-vobb-neutral-60 leading-3">{userDetails?.role}</p>
          </div>
          <Menu logout={logout} />
        </div>
      </header>
    </>
  );
};

const UserAvatar = () => {
  const { userDetails } = useUserContext();
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={userDetails?.avatar} alt="profile picture" />
      <AvatarFallback>
        {userDetails?.firstName.charAt(0)}
        {userDetails?.lastName.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

const Menu = ({ logout }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1">
          <span className="sr-only">Open menu</span>
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate(Routes.organization)}>
            Organization Settings
          </DropdownMenuItem>
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
          <DropdownMenuItem onClick={() => navigate(Routes.teams)}>Teams</DropdownMenuItem>
          <DropdownMenuItem>
            Invite member
          </DropdownMenuItem>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Support</DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { NavBar };
