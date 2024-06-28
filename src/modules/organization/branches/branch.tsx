import {
  attributeType,
  BranchMemberTableActions,
  BranchTeamTable,
  Button,
  Filter,
  FilterData,
  getBranchTeamTableColumns,
  Pagination,
  SettingsPageTitle
} from "components";
import {
  getBranchMemberTableColumns,
  BranchMemberTable
} from "components/tables/branchMemberTable";
import { BranchMemberTableMock, BranchTeamTableMock } from "lib";
import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { PlusCircledIcon } from "@radix-ui/react-icons";

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

interface OrgBranchUIProps extends BranchMemberTableActions {}

const OrgBranchUI: React.FC<OrgBranchUIProps> = ({ handleTransferMember, handleViewMember }) => {
  const memberColumns = useMemo(
    () => getBranchMemberTableColumns({ handleTransferMember, handleViewMember }),
    [handleTransferMember, handleViewMember]
  );

  const teamColumns = useMemo(() => getBranchTeamTableColumns(), []);
  const [memberFilters, setMemberFilter] = useState<FilterData[]>([]);

  return (
    <>
      <SettingsPageTitle
        title="Headquarters (GMT +1)"
        description={"5 Ade Ajayi Street, Ikoyi, Lagos, Nigeria, 100214"} //address line 1, city, state, country, postal code
        className="max-w-none"
      />
      {/* Edit branch */}
      {/* Mark as primary */}
      {/* Delete */}
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
              <PlusCircledIcon /> Add member
            </Button>
          </div>
          <BranchMemberTable columns={memberColumns} data={BranchMemberTableMock} />
          <Pagination
            // hidePageLimit
            handleChange={console.log}
            handlePageLimit={console.log}
            totalCount={3}
            pageLimit={3}
            totalPages={1}
            currentPage={1}
            className="mt-4"
          />
        </TabsContent>
        <TabsContent className="pb-8 mb-12" value="client">
          {/* Add team */}
          {/* Search, sort, filter by teams */}
          <Button onClick={console.log} className="flex mb-6 gap-2 ml-auto" variant={"fill"}>
            <PlusCircledIcon /> New team
          </Button>
          <BranchTeamTable columns={teamColumns} data={BranchTeamTableMock} />
          <Pagination
            // hidePageLimit
            handleChange={console.log}
            handlePageLimit={console.log}
            totalCount={3}
            pageLimit={3}
            totalPages={1}
            currentPage={1}
            className="mt-4"
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export { OrgBranchUI };
