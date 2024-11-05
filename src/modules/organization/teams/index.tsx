import { PlusCircledIcon } from "@radix-ui/react-icons";
import { IconPlus } from "@tabler/icons-react";
import {
  SettingsPageTitle,
  Button,
  Pagination,
  Filter,
  FilterData,
  attributeType,
  getTeamTableColumns,
  TeamTableActions,
  TeamTable,
  LoadingSpinner
} from "components";
import { useMemo, useState } from "react";
import { TeamDataProps } from "types";

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
  teams: {
    orgTeams: TeamDataProps;
    handlePagination: (param: string, value: number) => void;
    loading: boolean;
  };
}

const TeamsUI = ({
  handleEditTeam,
  handleViewBranches,
  handleTeamHistory,
  handleViewTeam,
  handleAddTeam,
  teams: { orgTeams, handlePagination, loading }
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
  const { teamsData: tableData, metaData } = orgTeams;
  const { currentPage, totalCount, totalPages, pageLimit = 20 } = metaData;
  return (
    <>
      <SettingsPageTitle title="Teams" className="max-w-none" />
      <section className="mb-6 flex justify-between gap-4 items-center">
        <Filter className="mb-0" filters={filters} setFilter={setFilters} attributes={attributes} />
        <Button
          onClick={handleAddTeam}
          className="flex mb-6 gap-2 ml-auto"
          variant={"fill"}
          data-testid="add-team">
          <IconPlus size={18} />
          New team
        </Button>
      </section>
      {loading ? (
        <LoadingSpinner testId="loading" />
      ) : (
        <TeamTable columns={teamColumns} data={tableData} />
      )}
      <Pagination
        handleChange={(val) => handlePagination("page", val)}
        handlePageLimit={(val) => handlePagination("limit", val)}
        totalCount={totalCount}
        pageLimit={pageLimit}
        totalPages={totalPages}
        currentPage={currentPage}
        className="mt-4 mb-28"
        testId="pagination"
      />
    </>
  );
};

export { TeamsUI };
export * from "./team";
export * from "./teamPermissions";
export * from "./teamActivity";
