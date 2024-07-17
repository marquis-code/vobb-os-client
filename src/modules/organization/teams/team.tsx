import { CheckIcon, Cross2Icon, Pencil1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
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
  Badge,
  PermissionItem
} from "components";
import { TeamMemberTableMock } from "lib";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

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
  handlePermissions: () => void;
}

const TeamUI = ({ handleViewMember, handleAddMember, handlePermissions }: TeamUIProps) => {
  const teamColumns = useMemo(
    () =>
      getTeamMemberTableColumns({
        handleViewMember
      }),
    [handleViewMember]
  );
  const [filters, setFilters] = useState<FilterData[]>([]);

  return (
    <>
      <Badge
        text={"You haven't created your team permissions"}
        btnText={"Set permissions"}
        variant={"light"}
        type={"warning"}
        badge={"trailing"}
        size={"md"}
        action={handlePermissions}
        className="max-w-[800px]"
      />
      <SettingsPageTitle title="Team Name" />
      <Tabs className="max-w-[800px]" defaultValue="member">
        <TabsList className="mb-2">
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
          <TeamMemberTable columns={teamColumns} data={TeamMemberTableMock} />
          <Pagination
            handleChange={console.log}
            handlePageLimit={console.log}
            totalCount={3}
            pageLimit={3}
            totalPages={1}
            currentPage={1}
            className="mt-4"
          />
        </TabsContent>
        <TabsContent className="pb-8 mb-12" value="permissions">
          {permissions.length > 0 ? (
            <div>
              <Button
                onClick={handlePermissions}
                className="flex gap-2 ml-auto mb-6"
                variant={"fill"}>
                <Pencil1Icon /> Edit permissions
              </Button>
              <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-2 text-center mb-2 font-medium">
                <span className="text-left">Permission</span>
                <span>Team lead</span>
                <span>Team manager</span>
                <span>Team member</span>
              </div>
              {permissions.map((permission) => (
                <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-2 text-center mb-2">
                  <span className="text-left font-medium">{permission.title}</span>
                  <span className="flex justify-center">
                    <CheckIcon width={18} height={18} color="var(--success-30)" />
                  </span>
                  <span className="flex justify-center">
                    <Cross2Icon width={18} height={18} color="var(--error-30)" />
                  </span>
                  <span className="flex justify-center">
                    <Cross2Icon width={18} height={18} color="var(--error-30)" />
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 justify-center mt-16 p-4">
              <p>Nothing to show here, you haven't created your team permissions</p>
              <Button
                onClick={handlePermissions}
                // className="flex mb-6 gap-2 ml-auto"
                variant={"fill"}>
                Set permissions
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent className="pb-8 mb-12" value="history">
          History
        </TabsContent>
      </Tabs>
    </>
  );
};

export { TeamUI };
