import logo from "../../assets/vectors/illustrations/logoIcon.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { ChevronDownIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "context";
import { useFetchBranches, useFetchUserBranches } from "hooks";
import { Input, LoadingSpinner } from "components";
import { ChevronLeftDoubleIcon } from "assets";
import { useModalContext } from "context";

interface SideBarProps {
  sideBarWidth: string;
  collapse: boolean;
  handleCollapse: (val: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ sideBarWidth, collapse, handleCollapse }) => {
  return (
    <aside
      style={{ width: sideBarWidth }}
      className="border-r border-vobb-neutral-30 h-full fixed top-0 left-0">
      <div className="border-b border-vobb-neutral-30 px-4 py-1 h-[55px] flex items-center">
        <img
          className="h-[24px] w-auto object-contain object-left-center mr-2"
          src={logo}
          alt="logo"
        />{" "}
        {!collapse ? <BranchMenu /> : ""}
        <button
          onClick={() => handleCollapse(!collapse)}
          className={collapse ? "ml-[24px]" : "ml-auto"}>
          <span className="sr-only">{collapse ? "Expand menu" : "Collapse menu"}</span>
          <ChevronLeftDoubleIcon className={collapse ? "rotate-180" : undefined} />
        </button>
      </div>
      <section>sidebar</section>
    </aside>
  );
};
interface BranchType {
  id: string;
  name: string;
}

export function BranchMenu() {
  const { setAddBranch } = useModalContext();
  const { userDetails } = useUserContext();
  const { fetchOrgBranches, orgBranches, loadingBranches } = useFetchBranches({});
  const { fetchUserBranches, userBranches, loading: loadingUser } = useFetchUserBranches({});

  const isAdmin = userDetails?.role === "Super Admin";

  const [allBranches, setAllBranches] = useState<BranchType[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<BranchType>({ id: "", name: "" });

  const [userBranchesSearchQuery, setUserBranchesSearchQuery] = useState("");
  const [allBranchesSearchQuery, setAllBranchesSearchQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectedBranch = (branch: BranchType) => {
    setSelectedBranch(branch);
  };

  const handleAddBranchModal = () => {
    setAddBranch(true);
  };

  const handleAllBranchSearch = (value: string) => {
    isAdmin ? setAllBranchesSearchQuery(value) : setUserBranchesSearchQuery(value);
  };

  useEffect(() => {
    fetchOrgBranches({ limit: 8, search: allBranchesSearchQuery });
    if (!isAdmin) fetchUserBranches({ limit: 8, search: userBranchesSearchQuery });
  }, [userBranchesSearchQuery, allBranchesSearchQuery]);

  useEffect(() => {
    if (!loadingBranches && orgBranches?.branchesArray) {
      const branches = orgBranches.branchesArray.map((branch) => ({
        id: branch.id,
        name: branch.name
      }));
      setAllBranches(branches);

      if (branches.length > 0) {
        setSelectedBranch(branches[0]);
      }
    } else if (!loadingUser && userBranches?.branchesArray) {
      const branches = userBranches.branchesArray.map((branch) => ({
        id: branch.id,
        name: branch.branch
      }));
      setAllBranches(branches);

      if (branches.length > 0) {
        setSelectedBranch(branches[0]);
      }
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [loadingUser, userBranches, loadingBranches, orgBranches]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 p-0 font-workSans font-bold text-lg text-vobb-neutral-100">
          {selectedBranch?.name} <ChevronDownIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-4 mt-1">
        <Input
          placeholder="search"
          value={isAdmin ? allBranchesSearchQuery : userBranchesSearchQuery}
          onChange={(e) => handleAllBranchSearch(e.target.value)}
          ref={inputRef}
        />
        <DropdownMenuGroup>
          {loadingBranches || loadingUser ? (
            <LoadingSpinner />
          ) : (
            allBranches?.map((branch) => (
              <DropdownMenuItem
                key={branch.id}
                onClick={() => {
                  handleSelectedBranch(branch);
                }}>
                <span>{branch.name}</span>
                <span
                  className={`ml-auto rounded-full bg-vobb-primary-70 p-1 ${
                    selectedBranch?.name === branch.name ? "inline" : "hidden"
                  }`}></span>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        {userDetails?.role === "Super Admin" && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button className="font-medium flex items-center" onClick={handleAddBranchModal}>
                New Branch
                <PlusCircledIcon className="ml-2" />
              </button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SideBar };
