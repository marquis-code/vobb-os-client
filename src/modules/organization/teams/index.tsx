import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  SettingsPageTitle,
  Button,
  Pagination,
  Filter,
  FilterData,
  attributeType,
  getTeamTableColumns,
  TeamTableActions,
  TeamTable
} from "components";
import { TeamTableMock } from "lib";
import { useMemo, useState } from "react";

const attributes: attributeType[] = [
  {
    value: "team-name",
    label: "Team Name",
    type: "text"
  },
  {
    value: "team-lead-name",
    label: "Team Lead Name",
    type: "text"
  }
];

interface TeamsUIProps extends TeamTableActions {
  handleAddTeam: () => void;
}

const TeamsUI = ({
  handleEditTeam,
  handleViewBranches,
  handleTeamHistory,
  handleViewTeam,
  handleAddTeam
}: TeamsUIProps) => {
  const teamColumns = useMemo(
    () =>
      getTeamTableColumns({
        handleEditTeam,
        handleViewBranches,
        handleTeamHistory,
        handleViewTeam
      }),
    [handleEditTeam, handleViewBranches, handleTeamHistory, handleViewTeam]
  );
  const [filters, setFilters] = useState<FilterData[]>([]);
  return (
    <>
      <SettingsPageTitle title="Teams" className="max-w-none" />
      <section className="mb-6 flex justify-between gap-4 items-center">
        <Filter className="mb-0" filters={filters} setFilter={setFilters} attributes={attributes} />
        <Button onClick={handleAddTeam} className="flex mb-6 gap-2 ml-auto" variant={"fill"}>
          <PlusCircledIcon /> New team
        </Button>
      </section>
      <TeamTable columns={teamColumns} data={TeamTableMock} />
      <Pagination
        handleChange={console.log}
        handlePageLimit={console.log}
        totalCount={3}
        pageLimit={3}
        totalPages={1}
        currentPage={1}
        className="mt-4"
      />
    </>
  );
};

export { TeamsUI };
export * from "./team";
export * from "./teamPermissions";
export * from "./teamActivity"