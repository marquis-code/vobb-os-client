import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Badge, Button } from "components";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";

// Get member profile info from context and remove the comments
interface MemberProfileHeaderProps extends MenuProps {
  // avatar: string | undefined;
  // intials: string;
  // fullName: string;
  // email: string;
  // jobTitle: string;
  // role: string;
}

const MemberProfileHeader: React.FC<MemberProfileHeaderProps> = (props) => {
  return (
    <>
      {/* Only shown when member is suspended */}
      {props.isSuspended ? (
        <Badge
          text={"This member has been suspended"}
          btnText={"Undo suspension"}
          variant={"light"}
          action={props.handleSuspension}
          type={"error"}
          badge={"trailing"}
          size={"md"}
          className="justify-center rounded-none -mt-4 -ml-4 w-[calc(100%+2rem)] border-t-0 border-x-0 py-2 gap-2"
          btnClassName="ml-0"
        />
      ) : (
        ""
      )}
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
            <Menu {...props} />
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

interface MenuProps {
  handleChangeRole: () => void;
  handleChangeBranch: () => void;
  handleChangeTeam: () => void;
  handleSuspension: () => void;
  handleComposeEmail: () => void;
  isSuspended?: boolean;
}

const Menu = ({
  handleChangeRole,
  handleChangeBranch,
  handleChangeTeam,
  handleSuspension,
  handleComposeEmail,
  isSuspended
}: MenuProps) => {
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
          <DropdownMenuItem onClick={handleChangeRole}>Change role</DropdownMenuItem>
          <DropdownMenuItem onClick={handleChangeTeam}>Change team</DropdownMenuItem>
          <DropdownMenuItem onClick={handleChangeBranch}>Change branch</DropdownMenuItem>
          <DropdownMenuItem onClick={handleComposeEmail}>Compose email</DropdownMenuItem>{" "}
          {/*TBD after sendup*/}
          <DropdownMenuItem onClick={handleSuspension}>
            {isSuspended ? "Undo suspension" : "Suspend account"}
          </DropdownMenuItem>{" "}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { MemberProfileHeader };
