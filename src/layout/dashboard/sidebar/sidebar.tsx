import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useUserContext, useModalContext } from "context";
import { Button, Checkbox, CustomInput, LoadingSpinner } from "components";
import { useDebounce, useFetchUserBranches } from "hooks";
import {
  IconArrowBarRight,
  IconBuildingArch,
  IconCash,
  IconHelpOctagon,
  IconLayoutSidebar,
  IconLayoutSidebarRight,
  IconPlus,
  IconSettings,
  IconUser,
  IconUsers
} from "@tabler/icons-react";
import { useLocation } from "react-router-dom";
import { SidebarLinks } from "./sidebarLinks";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { useLogout } from "hooks";
import { LogoIcon } from "assets";

interface SideBarProps {
  sideBarWidth: string;
  collapse: boolean;
  handleCollapse: (val: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ sideBarWidth, collapse, handleCollapse }) => {
  const location = useLocation();
  const { userDetails } = useUserContext();
  const { logout } = useLogout();
  const [tempExpand, setTempExpand] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);

    const timeout = setTimeout(() => {
      if (!isDropdownOpen) setTempExpand(false);
    }, 300);

    setHoverTimeout(timeout);
  };

  return (
    <>
      <aside
        style={{ width: sideBarWidth }}
        className="border-r border-vobb-neutral-30 transition-all duration-300 bg-[#FBFBFB] h-full fixed z-[400] top-0 left-0">
        {collapse && (
          <div
            onMouseEnter={() => setTempExpand(true)}
            className="fixed bg-transparent h-full left-0 top-0 w-2 z-[200]"></div>
        )}
        <div className="border-b border-vobb-neutral-30 px-4 py-1 h-[55px] flex items-center">
          <LogoIcon className="h-[24px] w-auto object-contain object-left-center mr-2" />
          {!collapse && (
            <div className="relative z-[450]">
              <BranchMenu />
            </div>
          )}
          <Button
            onClick={() => handleCollapse(!collapse)}
            variant={"ghost"}
            size={"icon"}
            className={`ml-auto relative ${collapse && "border p-2 shadow-sm"}`}>
            <span className="sr-only">{collapse ? "Expand menu" : "Collapse menu"}</span>
            {collapse ? (
              <IconLayoutSidebar size={18} stroke={"#101323"} />
            ) : (
              <IconLayoutSidebarRight size={18} stroke={"#101323"} />
            )}
          </Button>
        </div>
        <section>
          <SidebarLinks active={location.pathname.slice(1)} sideBarWidth={sideBarWidth} />
        </section>
        {!collapse && (
          <section className="w-full border-t border-vobb-neutral-30">
            <div className="flex items-center absolute bottom-0 left-0  w-full justify-between px-2 p-4">
              <div className="flex items-center gap-2 text-left">
                <UserAvatar />
                <p className="font-medium text-xs w-[90px] capitalize leading-5 whitespace-nowrap overflow-hidden text-ellipsis">
                  {`${userDetails?.firstName} ${userDetails?.lastName}`}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="bg-[#9747FF0D] p-2 rounded-md flex items-center justify-center">
                  <p className="text-xs text-[#9747FF] font-semibold leading-4">
                    {userDetails?.role}
                  </p>
                </div>

                <Menu logout={logout} />
              </div>
            </div>
          </section>
        )}
      </aside>

      <div
        style={{ width: 296 }}
        onMouseEnter={() => setTempExpand(true)}
        onMouseLeave={(e) => handleMouseLeave(e)}
        className={`flex items-center justify-center bg-transparent fixed h-full z-[400] top-1/2 -translate-y-1/2 left-0 transition-all duration-100 ease-out ${
          tempExpand ? "translate-x-0" : "-translate-x-[50vw]"
        }`}>
        <aside className="border border-vobb-neutral-30 rounded-lg bg-[#FBFBFB] h-[98%] w-[95%] relative">
          <div className="border-b border-vobb-neutral-30 px-4 py-1 h-[55px] flex items-center">
            <LogoIcon className="h-[24px] w-auto object-contain object-left-center mr-2" />
            {tempExpand && (
              <div
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
                className="relative z-[450]">
                <BranchMenu />
              </div>
            )}
            <Button
              onClick={() => {
                setTempExpand(false);
                handleCollapse(false);
              }}
              variant={"ghost"}
              size={"icon"}
              className="ml-auto relative">
              <span className="sr-only">{collapse ? "Expand menu" : "Collapse menu"}</span>
              <IconLayoutSidebarRight size={18} stroke={"#101323"} />
            </Button>
          </div>
          <section>
            <SidebarLinks active={location.pathname.slice(1)} sideBarWidth={sideBarWidth} />
          </section>
          {tempExpand && (
            <section className="w-full border-t border-vobb-neutral-30">
              <div className="flex items-center absolute bottom-0 left-1/2 -translate-x-1/2 w-full justify-between px-2 p-4">
                <div className="flex items-center gap-2 text-left">
                  <UserAvatar />
                  <p className="font-medium text-xs w-[90px] capitalize leading-5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {`${userDetails?.firstName} ${userDetails?.lastName}`}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="bg-[#9747FF0D] p-2 rounded-md flex items-center justify-center">
                    <p className="text-xs text-[#9747FF] font-semibold leading-4">
                      {userDetails?.role}
                    </p>
                  </div>
                  <div
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}>
                    <Menu logout={logout} />
                  </div>
                </div>
              </div>
            </section>
          )}
        </aside>
      </div>
    </>
  );
};
interface BranchType {
  id: string;
  name: string;
}

export function BranchMenu() {
  const { setAddBranch } = useModalContext();
  const { userDetails } = useUserContext();
  const { fetchUserBranches, userBranches, loading: loadingUser } = useFetchUserBranches({});

  const [allBranches, setAllBranches] = useState<BranchType[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<BranchType>({ id: "", name: "" });
  const [branchSearchQuery, setBranchSearchQuery] = useState("");

  const handleAddBranchModal = () => {
    setAddBranch(true);
  };

  const debouncedBranchSearchQuery = useDebounce(branchSearchQuery, 1000);

  const handleBranchSearch = (value: string) => {
    setBranchSearchQuery(value);
  };

  const handleSelectedBranch = (branch: BranchType) => {
    setSelectedBranch(branch);
  };

  const handleFetchBranches = (search = "") => {
    fetchUserBranches({ limit: 8, search: search.trim() });
  };

  useEffect(() => {
    handleFetchBranches(debouncedBranchSearchQuery);
  }, [debouncedBranchSearchQuery]);

  useEffect(() => {
    if (!loadingUser && userBranches?.branchesArray) {
      const branches = userBranches.branchesArray.map((branch) => ({
        id: branch.id,
        name: branch.branch
      }));
      setAllBranches(branches);
      if (branches.length > 0) {
        setSelectedBranch(branches[0]);
      }
    }
  }, [loadingUser, userBranches]);

  useEffect(() => {
    handleFetchBranches();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-0 font-workSans relative z-[300] font-bold text-lg text-vobb-neutral-100">
          {loadingUser ? (
            <div className="w-36 h-4 rounded-md animate-pulse bg-vobb-neutral-30"></div>
          ) : (
            <>
              {selectedBranch?.name} <ChevronDownIcon />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 ml-2.5 mt-1 relative z-[450]">
        <CustomInput
          placeholder="Search"
          value={branchSearchQuery}
          parentClassName="mb-0 p-1 pb-1.5"
          className="text-xs font-medium text-vobb-neutral-80"
          onChange={(e) => handleBranchSearch(e.target.value)}
        />
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="w-full p-1">
          {loadingUser ? (
            <LoadingSpinner size={16} />
          ) : !allBranches.length ? (
            <p className="p-2">No matches found.</p>
          ) : (
            <>
              <DropdownMenuItem
                className="w-full px-3 py-2 flex items-center justify-between text-xs text-vobb-neutral-100"
                onClick={() => {
                  handleSelectedBranch({ id: "bev", name: "Bird's eye view" });
                }}>
                <span>Bird's eye view</span>
                <Checkbox
                  checked={selectedBranch?.name === "Bird's eye view"}
                  className="border border-vobb-neutral-40 w-[12px] h-[12px] flex items-center justify-center text-xs"
                />
              </DropdownMenuItem>
              {allBranches?.map((branch) => (
                <DropdownMenuItem
                  key={branch.id}
                  className="w-full px-3 py-2 flex items-center justify-between text-xs text-vobb-neutral-100"
                  onClick={() => {
                    handleSelectedBranch(branch);
                  }}>
                  <span>{branch.name}</span>
                  <Checkbox
                    checked={selectedBranch?.name === branch.name}
                    className="border border-vobb-neutral-40 w-[12px] h-[12px] flex items-center justify-center text-xs"
                  />
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuGroup>
        {userDetails?.role === "Super Admin" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-1 pt-1.5">
              <Button
                variant={"outline"}
                onClick={handleAddBranchModal}
                className="flex items-center justify-center gap-1 flex-1 rounded-sm border-[#DDDFE5] text-vobb-neutral-80 font-medium text-xs">
                <IconPlus size={14} color="#494949" />
                Create new branch{" "}
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const UserAvatar = () => {
  const { userDetails } = useUserContext();
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={userDetails?.avatar} alt="profile picture" />
      <AvatarFallback>
        {userDetails?.firstName?.charAt(0)}
        {userDetails?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

const Menu = ({ logout }) => {
  const navigate = useNavigate();
  const { setAddTeam, setInviteMember } = useModalContext();
  const handleMember = () => {
    setInviteMember(true);
  };
  const handleTeam = () => {
    setAddTeam(true);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1">
          <span className="sr-only">Open menu</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4 relative z-[450]">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-xs font-medium text-vobb-neutral-70 flex items-center gap-2"
            onClick={() => navigate(Routes.profile)}>
            <IconUser size={16} strokeWidth={1} color="#000000" />
            Account Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs font-medium text-vobb-neutral-70 flex items-center gap-2"
            onClick={() => navigate(Routes.organization)}>
            <IconSettings size={16} strokeWidth={1} color="#000000" />
            Workspace Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="text-xs font-medium text-vobb-neutral-70 flex items-center gap-2">
            <IconCash size={16} strokeWidth={1} color="#000000" />
            Billing
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="text-xs font-medium text-vobb-neutral-70 flex items-center gap-2"
            onClick={() => navigate(Routes.teams)}>
            <IconUsers size={16} strokeWidth={1} color="#000000" />
            Teams
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs font-medium text-vobb-neutral-70 flex items-center gap-2"
            onClick={handleMember}>
            <IconPlus size={16} strokeWidth={1} color="#000000" />
            Invite member
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-xs font-medium text-vobb-neutral-70 flex items-center gap-2"
            onClick={handleTeam}>
            <IconBuildingArch size={16} strokeWidth={1} color="#000000" />
            New Team
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-xs font-medium text-vobb-neutral-70 flex items-center gap-2">
          <IconHelpOctagon size={16} strokeWidth={1} color="#000000" />
          Support
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xs font-medium text-vobb-neutral-70 flex items-center gap-2"
          onClick={logout}>
          <IconArrowBarRight size={16} strokeWidth={1} color="#000000" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { SideBar };
