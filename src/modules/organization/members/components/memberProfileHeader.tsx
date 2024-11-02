import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { IconBriefcase, IconId, IconUser } from "@tabler/icons-react";
import { Badge, Button, LoadingSpinner } from "components";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { MemberProfileProps } from "types";

// Get member profile info from context and remove the comments
interface MemberProfileHeaderProps extends MenuProps {
  memberProfile: MemberProfileProps;
  loading: boolean;
}

const MemberProfileHeader: React.FC<MemberProfileHeaderProps> = (props) => {
  const { avatar, initials, fullName, email, jobTitle, role, status, timeZone } =
    props.memberProfile;
  const isSuspended = status === "suspended";

  if (props.loading) return <LoadingSpinner />;
  return (
    <>
      {isSuspended ? (
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
          testId="suspended-member"
        />
      ) : (
        ""
      )}
      <section className="pb-4">
        <div className="flex items-center gap-2" data-testid="avatar-section">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatar} alt="avatar" />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{fullName}</p>
            <p className="text-xs text-vobb-neutral-70">{email}</p>
          </div>

          <div className="ml-auto">
            <Menu {...props} isSuspended={isSuspended} testId="member-menu" />
          </div>
        </div>
      </section>
      <section
        className="border-y py-3 px-4 flex text-xs gap-2 bg-vobb-neutral-10 -ml-4 w-[calc(100%+2rem)] items-center"
        data-testid="tabs-section">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={(e) => e.preventDefault()}>
              <span className="bg-white border rounded-sm px-2 py-2 flex gap-1 items-end shadow-sm">
                <IconUser color="#667085" size={16} />
                {jobTitle}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-vobb-neutral-70">Job Title</TooltipContent>
          </Tooltip>
          <span className="bg-vobb-neutral-30 rounded-md w-[4px] h-[4px] block"></span>
          <Tooltip>
            <TooltipTrigger onClick={(e) => e.preventDefault()}>
              <span className="bg-white border rounded-sm px-2 py-2 flex gap-1 items-end shadow-sm">
                <IconBriefcase color="#667085" size={16} />
                {role}
              </span>{" "}
            </TooltipTrigger>
            <TooltipContent className="bg-vobb-neutral-70">Role</TooltipContent>
          </Tooltip>
          <span className="bg-vobb-neutral-30 rounded-md w-[4px] h-[4px] block"></span>
          <Tooltip>
            <TooltipTrigger onClick={(e) => e.preventDefault()}>
              <span className="bg-white border rounded-sm px-2 py-2 flex gap-1 items-end shadow-sm">
                <IconId color="#667085" size={16} />
                {timeZone}
              </span>{" "}
            </TooltipTrigger>
            <TooltipContent className="bg-vobb-neutral-70">Timezone</TooltipContent>
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
}

const Menu = ({
  handleChangeRole,
  handleChangeBranch,
  handleChangeTeam,
  handleSuspension,
  handleComposeEmail,
  isSuspended,
  testId
}: MenuProps & { isSuspended: boolean; testId: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="px-3" data-testId={testId}>
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
