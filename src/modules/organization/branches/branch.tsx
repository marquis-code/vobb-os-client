import {
  AddExistingMembersToBranchDropdown,
  attributeType,
  BranchMemberTableActions,
  BranchTeamTable,
  Button,
  Filter,
  FilterData,
  getBranchTeamTableColumns,
  LoadingSpinner,
  Pagination,
  SettingsPageTitle
} from "components";
import {
  getBranchMemberTableColumns,
  BranchMemberTable
} from "components/tables/branchMemberTable";
import { useMemo, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { BranchMembersProps, BranchTeamsProps, optionType, OrganisationBranchesData } from "types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";
import { IconBuilding, IconBuildingArch, IconMail } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import { useClickOutside } from "hooks";

type FilterItem = {
  value: string;
  cond: string;
};

type TransformedData = {
  name: FilterItem[];
  email: FilterItem[];
  team: FilterItem[];
  role: FilterItem[];
  operation: FilterItem[];
};
// This list should come from the API
const attributes: attributeType[] = [
  {
    value: "name",
    label: "Name",
    type: "text"
  },
  {
    value: "email",
    label: "Email",
    type: "text"
  },
  {
    value: "role",
    label: "Role",
    type: "select"
  },
  {
    value: "teams",
    label: "Teams",
    type: "select"
  }
];

interface OrgBranchUIProps extends BranchMemberTableActions {
  handleUpdateMembersParams: (param: string, value: string | number) => void;
  handleUpdateTeamsParams: (param: string, value: number) => void;
  handleUpdateMemberFilters: (filtersArray) => void;
  handleInviteMemberToBranch: () => void;
  handleAddExistingMembersToBranch: () => void;
  loadingMembers: boolean;
  branchInfo: OrganisationBranchesData;
  branchTeams: BranchTeamsProps;
  branchMembers: BranchMembersProps;
  addExistingMembers: {
    submit: (data: string[]) => void;
    loading: boolean;
  };
  eligibleMembers: {
    loading: boolean;
    data: optionType[];
    searchQuery: string;
    handleParams: (filter: string, value: string | number) => void;
  };
}

const OrgBranchUI: React.FC<OrgBranchUIProps> = ({
  handleTransferMember,
  handleViewMember,
  handleUpdateMembersParams,
  handleUpdateTeamsParams,
  handleUpdateMemberFilters,
  handleInviteMemberToBranch,
  loadingMembers,
  branchInfo,
  branchTeams,
  branchMembers,
  addExistingMembers,
  eligibleMembers
}) => {
  const memberColumns = useMemo(
    () => getBranchMemberTableColumns({ handleTransferMember, handleViewMember }),
    [handleTransferMember, handleViewMember]
  );
  const [memberFilters, setMemberFilter] = useState<FilterData[]>([]);

  const membersData = branchMembers?.membersArray || [];
  const membersMetaData = branchMembers?.membersMetaData || {
    currentPage: 1,
    pageLimit: 0,
    totalCount: 0,
    totalPages: 0
  };

  const teamsData = branchTeams?.teamsArray || [];
  const teamsMetaData = branchTeams?.teamsMetaData || {
    currentPage: 1,
    pageLimit: 0,
    totalCount: 0,
    totalPages: 0
  };

  const teamColumns = useMemo(() => getBranchTeamTableColumns(), []);

  const transformedData: TransformedData = {
    name: [],
    email: [],
    team: [],
    role: [],
    operation: []
  };

  memberFilters.forEach((item) => {
    const key = item.property ? item.property.value : "";
    if (transformedData.hasOwnProperty(key)) {
      transformedData[key].push({
        value: item.value,
        cond: item.condition ? item.condition.value : ""
      });
    }
  });

  const checkAndUpdate = () => {
    const hasValueSet = Object.values(transformedData).some(
      (array) => array.some((item) => item.value) // Check if any item in the array has a value set
    );

    if (hasValueSet) {
      handleUpdateMemberFilters(transformedData);
    }
  };

  const [activeTab, setActiveTab] = useState("members");
  return (
    <>
      {loadingMembers ? (
        <LoadingSpinner testId="loading" />
      ) : (
        <>
          <SettingsPageTitle title={branchInfo?.name} className="max-w-none mb-0" />
          <section className=" py-3 px-4 flex text-xs gap-2 ml-0 w-[calc(100%+2rem)] items-center">
            <TooltipProvider>
              {branchInfo.city && (
                <>
                  <Tooltip>
                    <TooltipTrigger onClick={(e) => e.preventDefault()}>
                      <span
                        className="bg-white border rounded-sm px-2 py-2 flex gap-1 items-end shadow-sm"
                        data-testid="branch-city">
                        <IconBuilding color="#667085" size={16} />
                        {branchInfo.city}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-vobb-neutral-70">city</TooltipContent>
                  </Tooltip>
                  <span className="bg-vobb-neutral-30 rounded-md w-[4px] h-[4px] block"></span>
                </>
              )}
              {branchInfo.province && (
                <>
                  <Tooltip>
                    <TooltipTrigger onClick={(e) => e.preventDefault()}>
                      <span
                        className="bg-white border rounded-sm px-2 py-2 flex gap-1 items-end shadow-sm"
                        data-testid="branch-province">
                        <IconBuildingArch color="#667085" size={16} />
                        {branchInfo.province}
                      </span>{" "}
                    </TooltipTrigger>
                    <TooltipContent className="bg-vobb-neutral-70">state</TooltipContent>
                  </Tooltip>
                  <span className="bg-vobb-neutral-30 rounded-md w-[4px] h-[4px] block"></span>
                </>
              )}

              {branchInfo.zipCode && (
                <>
                  <Tooltip>
                    <TooltipTrigger onClick={(e) => e.preventDefault()}>
                      <span
                        className="bg-white border rounded-sm px-2 py-2 flex gap-1 items-end shadow-sm"
                        data-testid="branch-zipcode">
                        <IconMail color="#667085" size={16} />
                        {branchInfo.zipCode}
                      </span>{" "}
                    </TooltipTrigger>
                    <TooltipContent className="bg-vobb-neutral-70">zipcode</TooltipContent>
                  </Tooltip>
                </>
              )}
            </TooltipProvider>
          </section>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="pt-4 border-t -ml-4 pl-4 min-h-screen">
            <div className="flex justify-between">
              <TabsList className="mb-2">
                <TabsTrigger
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-vobb-neutral-70"
                  value="members">
                  Members
                </TabsTrigger>
                <TabsTrigger
                  className="text-xs data-[state=active]:bg-white data-[state=active]:text-vobb-neutral-70"
                  value="teams">
                  Teams
                </TabsTrigger>
              </TabsList>
              {activeTab === "members" ? (
                <div className="mb-6 flex justify-between gap-4 items-center">
                  <Filter
                    className="mb-0 h-9 text-xs"
                    filters={memberFilters}
                    setFilter={(val) => {
                      setMemberFilter(val);
                      checkAndUpdate();
                    }}
                    attributes={attributes}
                  />
                  <ActionColumn
                    handleInviteMemberToBranch={handleInviteMemberToBranch}
                    addExistingMembers={addExistingMembers}
                    eligibleMembers={eligibleMembers}
                  />
                </div>
              ) : (
                <Button
                  onClick={console.log}
                  className="flex mb-6 gap-2 ml-auto"
                  variant={"fill"}
                  data-testid="add-team">
                  <IconPlus size={18} /> New team
                </Button>
              )}
            </div>

            <TabsContent className="pb-8 mb-12" value="members">
              <BranchMemberTable columns={memberColumns} data={membersData} />
              <Pagination
                // hidePageLimit
                handleChange={(val) => handleUpdateMembersParams("page", val)}
                handlePageLimit={(val) => handleUpdateMembersParams("limit", val)}
                totalCount={membersMetaData.totalCount}
                pageLimit={membersMetaData.pageLimit ?? 20}
                totalPages={membersMetaData.totalPages}
                currentPage={membersMetaData.currentPage}
                className="mt-4"
                testId="pagination"
              />
            </TabsContent>
            <TabsContent className="pb-8 mb-12" value="teams">
              <BranchTeamTable columns={teamColumns} data={teamsData} />
              <Pagination
                // hidePageLimit
                handleChange={(val) => handleUpdateTeamsParams("page", val)}
                handlePageLimit={(val) => handleUpdateTeamsParams("limit", val)}
                totalCount={teamsMetaData.totalCount}
                pageLimit={teamsMetaData.pageLimit ?? 20}
                totalPages={teamsMetaData.totalPages}
                currentPage={teamsMetaData.currentPage}
                className="mt-4"
                testId="pagination"
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  );
};

export { OrgBranchUI };

const ActionColumn = ({ handleInviteMemberToBranch, addExistingMembers, eligibleMembers }) => {
  const [showInviteDropdown, setShowInviteDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { submit: submitAddExistingMembers, loading: loadingSubmitExistingMembers } =
    addExistingMembers;
  const {
    loading: loadingEligible,
    data: members,
    searchQuery: searchEligible,
    handleParams
  } = eligibleMembers;

  useClickOutside(dropdownRef, () => setShowInviteDropdown(false));
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex gap-2 ml-auto text-xs rounded-sm"
            variant={"fill"}
            data-testid="add-member">
            <IconPlus size={16} /> Add member
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg px-1 space-y-1.5 w-[184px]">
          <DropdownMenuItem
            onClick={handleInviteMemberToBranch}
            className="gap-2 cursor-pointer text-vobb-neutral-70 text-xs"
            testId="invite-member">
            New Team Member
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowInviteDropdown(true)}
            className="gap-2 cursor-pointer text-vobb-neutral-70 text-xs"
            testId="existing-member">
            Existing Member
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showInviteDropdown && (
        <div ref={dropdownRef} className="absolute top-[115%] w-[260px] z-20 right-0 bg-white">
          <AddExistingMembersToBranchDropdown
            submit={submitAddExistingMembers}
            loadingSubmit={loadingSubmitExistingMembers}
            loadingMembers={loadingEligible}
            handleSearch={handleParams}
            members={members}
            memberSearchQuery={searchEligible}
          />
        </div>
      )}
    </div>
  );
};
