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
import { useEffect, useState } from "react";
import { useUserContext } from "context";
import { useFetchBranches } from "hooks";
import { LoadingSpinner } from "components";
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
  const { userDetails } = useUserContext();
  const { fetchOrgBranches, orgBranches, loadingBranches } = useFetchBranches({});
  const [selectedBranch, setSelectedBranch] = useState<BranchType>({ id: "", name: "" });
  const [allBranches, setAllBranches] = useState<BranchType[]>([]);

  useEffect(() => {
    fetchOrgBranches({ page: 1, limit: 4 });
  }, []);

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
    }
  }, [loadingBranches, orgBranches]);

  const handleSelectedBranch = (branch: BranchType) => {
    setSelectedBranch(branch);
  };

  const { setAddBranch } = useModalContext();
  const handleAddBranch = () => {
    setAddBranch(true);
  };
  return (
    <DropdownMenu>
      {loadingBranches ? (
        <LoadingSpinner />
      ) : (
        <>
          {" "}
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 p-0 font-workSans font-bold text-lg text-vobb-neutral-100">
              {selectedBranch?.name} <ChevronDownIcon />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ml-4 mt-1">
            <DropdownMenuGroup>
              {userDetails?.role === "Super Admin" ? (
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
              ) : (
                <>
                  <DropdownMenuItem>Branch 1</DropdownMenuItem>
                  <DropdownMenuItem>Branch 2</DropdownMenuItem>
                  <DropdownMenuItem>Branch 3</DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>
            {userDetails?.role === "Super Admin" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button className="font-medium flex items-center" onClick={handleAddBranch}>
                    New Branch
                    <PlusCircledIcon className="ml-2" />
                  </button>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
}

export { SideBar };
