import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button } from "components";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";

// Add to context
interface MemberProfileHeaderProps {
  avatar: string | undefined;
  intials: string;
  fullName: string;
  email: string;
  jobTitle: string;
  role: string;
}

const MemberProfileHeader = () => {
  return (
    <>
      <section className="pb-4">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={""} alt="avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Jason Doe</p>
            <p className="text-xs text-vobb-neutral-70">jasondoe@gmail.com</p>
          </div>

          <div className="ml-auto">
            <Menu />
          </div>
        </div>
      </section>
      <section className="border-y py-3 px-4 flex text-xs gap-2 bg-vobb-neutral-10 -ml-4 w-[calc(100%+2rem)] items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={(e) => e.preventDefault()}>
              <span className="bg-white border rounded-xl px-2 py-1">Frontend Engineer</span>
            </TooltipTrigger>
            <TooltipContent className="bg-vobb-neutral-70">Job Title</TooltipContent>
          </Tooltip>
          <span className="bg-vobb-neutral-40 rounded-md w-[6px] h-[6px] block"></span>
          <Tooltip>
            <TooltipTrigger onClick={(e) => e.preventDefault()}>
              <span className="bg-white border rounded-xl px-2 py-1">Team lead</span>
            </TooltipTrigger>
            <TooltipContent className="bg-vobb-neutral-70">Role</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>
    </>
  );
};

const Menu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3">
          <span className="sr-only">Open menu</span>
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 mr-4">
        <DropdownMenuGroup>
          <DropdownMenuItem>Change role</DropdownMenuItem>
          <DropdownMenuItem onClick={console.log}>Change team</DropdownMenuItem>
          <DropdownMenuItem>Change branch</DropdownMenuItem>
          <DropdownMenuItem>Compose email</DropdownMenuItem> {/*TBD after sendup*/}
          <DropdownMenuItem>Suspend account</DropdownMenuItem>{" "}
          {/*Change to "Undo suspension" when member is suspended*/}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { MemberProfileHeader };
