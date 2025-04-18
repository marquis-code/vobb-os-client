import {
  SettingsPageTitle,
  Button,
  Pagination,
  Filter,
  FilterData,
  attributeType,
  getTeamMemberTableColumns,
  TeamMemberTable,
  TeamMemberTableActions,
  LoadingSpinner,
  Badge,
  PermissionItem
} from "components";
import { useEffect, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { TeamActivityResponse, TeamMembersDataProps } from "pages";
import { TeamPermissionsUI } from "./teamPermissions";
import { TeamActivity } from "./teamActivity";
import { QueryParamProps } from "types";
import { IconPlus } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

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
  }
];

// This list is from the backend
const permissions: PermissionItem[] = [
  {
    title: "Create client",
    id: "123",
    members: []
  },
  {
    title: "Edit client",
    id: "1234",
    members: []
  },
  {
    title: "Add member to team",
    id: "1235",
    members: []
  }
];

interface TeamUIProps extends TeamMemberTableActions {
  handleAddMember: () => void;
  teamName: string;
  // loading: boolean;
  // teamsMembersData:
  memberData: {
    loading: boolean;
    teamsMembersData: TeamMembersDataProps;
    handlePagination: (param: string, value: number) => void;
  };
  teamActivities: {
    loading: boolean;
    data: TeamActivityResponse;
    params: QueryParamProps;
    handleFilter: (param: string, value: Date | string | number) => void;
  };
}

const TeamUI = ({
  handleViewMember,
  handleAddMember,
  teamName,
  memberData: { loading, teamsMembersData, handlePagination },
  teamActivities
}: TeamUIProps) => {
  const teamColumns = useMemo(
    () =>
      getTeamMemberTableColumns({
        handleViewMember
      }),
    [handleViewMember]
  );
  const [filters, setFilters] = useState<FilterData[]>([]);
  const { membersArray, metaData } = teamsMembersData;
  const { currentPage, totalCount, totalPages, pageLimit } = metaData;

  const [searchParams] = useSearchParams();
  const justAddedTeam = searchParams.get("new");
  const isNewTeam = justAddedTeam ? decodeURIComponent(justAddedTeam) : null;

  const [activeTab, setActiveTab] = useState("member");

  useEffect(() => {
    if (isNewTeam) {
      setActiveTab("permissions");
    }
  }, [isNewTeam]);
  return (
    <>
      <Badge
        text={"You haven't created your team permissions"}
        btnText={"Set permissions"}
        variant={"light"}
        type={"warning"}
        badge={"trailing"}
        size={"md"}
        action={() => setActiveTab("permissions")}
        className="max-w-[800px]"
      />
      <SettingsPageTitle title={teamName} />
      <Tabs className="max-w-[800px]" value={activeTab} onValueChange={setActiveTab}>
        <TabsList defaultValue={"permissions"} className="mb-2">
          <TabsTrigger
            className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
            value="member">
            Members
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
            value="permissions">
            Permissions
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
            value="history"
            testId="team-history">
            Team History
          </TabsTrigger>
        </TabsList>
        <TabsContent className="pb-8 mb-12" value="member">
          {/* Add member */}
          {/* Search, sort, filter by  role */}
          <section className="mb-6 flex justify-between gap-4 items-center">
            <Filter
              className="mb-0"
              filters={filters}
              setFilter={setFilters}
              attributes={attributes}
            />
            <Button onClick={handleAddMember} className="flex mb-6 gap-2 ml-auto" variant={"fill"}>
              <IconPlus size={18} /> Add member
            </Button>
          </section>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <TeamMemberTable columns={teamColumns} data={membersArray} />
          )}
          <Pagination
            handleChange={(val) => handlePagination("page", val)}
            handlePageLimit={(val) => handlePagination("limit", val)}
            totalCount={totalCount}
            pageLimit={pageLimit ?? 20}
            totalPages={totalPages}
            currentPage={currentPage}
            className="mt-4"
          />
        </TabsContent>
        <TabsContent className="pb-8 mb-12" value="permissions">
          <TeamPermissionsUI />
        </TabsContent>
        <TabsContent className="pb-8 mb-12" value="history">
          <TeamActivity teamActivities={teamActivities} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export { TeamUI };
