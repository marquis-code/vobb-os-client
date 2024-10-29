import {
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
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { BranchMembersProps, BranchTeamsProps, OrganisationBranchesData } from "types";
import { IconPlus } from "@tabler/icons-react";

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
  loadingMembers: boolean;
  branchInfo: OrganisationBranchesData;
  branchTeams: BranchTeamsProps;
  branchMembers: BranchMembersProps;
}

const OrgBranchUI: React.FC<OrgBranchUIProps> = ({
  handleTransferMember,
  handleViewMember,
  handleUpdateMembersParams,
  handleUpdateTeamsParams,
  loadingMembers,
  branchInfo,
  branchTeams,
  branchMembers
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
  return (
    <>
      {loadingMembers ? (
        <LoadingSpinner />
      ) : (
        <>
          <SettingsPageTitle
            title={`${branchInfo?.name} (${branchInfo?.timeZone})`}
            description={`${branchInfo?.addressLine1}, ${branchInfo?.city}, ${branchInfo?.province}, ${branchInfo?.country}, ${branchInfo?.zipCode}`}
            className="max-w-none"
          />
          <Tabs defaultValue="member">
            <TabsList className="mb-2">
              <TabsTrigger
                className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
                value="member">
                Members
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
                value="client">
                Teams
              </TabsTrigger>
            </TabsList>
            <TabsContent className="pb-8 mb-12" value="member">
              {/* Add member */}
              {/* Search, sort, filter by  role */}
              <div className="mb-6 flex justify-between gap-4 items-center">
                <Filter
                  className="mb-0"
                  filters={memberFilters}
                  setFilter={setMemberFilter}
                  attributes={attributes}
                />
                <Button onClick={console.log} className="flex gap-2 ml-auto" variant={"fill"}>
                  <IconPlus size={18} />
                  Add member
                </Button>
              </div>

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
              />
            </TabsContent>
            <TabsContent className="pb-8 mb-12" value="client">
              {/* Add team */}
              {/* Search, sort, filter by teams */}
              <Button onClick={console.log} className="flex mb-6 gap-2 ml-auto" variant={"fill"}>
                <IconPlus size={18} /> New team
              </Button>
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
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  );
};

export { OrgBranchUI };
