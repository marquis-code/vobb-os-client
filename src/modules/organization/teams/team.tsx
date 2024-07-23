import { PlusCircledIcon } from "@radix-ui/react-icons";
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
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { TeamMembersDataProps } from "pages";
import { TeamPermissionsUI } from "./teamPermissions";
import { TeamActivity } from "./teamActivity";

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
  // loading: boolean;
  // teamsMembersData:
  memberData: {
    loading: boolean;
    teamsMembersData: TeamMembersDataProps;
    handlePagination: (param: string, value: number) => void;
  };
}

const TeamUI = ({
  handleViewMember,
  handleAddMember,
  memberData: { loading, teamsMembersData, handlePagination }
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
  return (
    <>
      <Badge
        text={"You haven't created your team permissions"}
        btnText={"Set permissions"}
        variant={"light"}
        type={"warning"}
        badge={"trailing"}
        size={"md"}
        action={console.log}
        className="max-w-[800px]"
      />
      <SettingsPageTitle title="Team Name" />
      <Tabs className="max-w-[800px]" defaultValue="member">
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
            value="history">
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
              <PlusCircledIcon /> Add member
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
          <TeamActivity />
        </TabsContent>
      </Tabs>
    </>
  );
};

export { TeamUI };
