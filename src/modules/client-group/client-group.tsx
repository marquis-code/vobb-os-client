import { Button, LoadingSpinner, Pagination, TableEmptyState } from "components";
import { IconPlus, IconSearch, IconUsersGroup } from "@tabler/icons-react";
import { CustomInput } from "components/form";
import { FC, useMemo, useState } from "react";
import { ClientGroupTableDataProps, fetchClientGroupQueryParams } from "types/client-group";
import { getClientGroupTableColumns } from "components/tables/clientGroupTable/columns";
import { ClientGroupTable } from "components/tables/clientGroupTable";
import SortGroup from "./sort-group";
import FilterGroup from "./filter-group";

interface ClientGroupUIProps {
  handleCreateClientGroup: () => void;
  handleRefreshClientGroups: () => void;
  pipelinesData:
    | {
        _id: string;
        name: string;
      }[];
  allClientGroups?: {
    clientGroupsdata: ClientGroupTableDataProps | null;
    loading?: boolean;
    params: fetchClientGroupQueryParams;
  };
  handleParams: (param: string, value: string | number) => void;
}

export const ClientGroupUI: FC<ClientGroupUIProps> = ({
  handleCreateClientGroup,
  allClientGroups,
  pipelinesData,
  handleRefreshClientGroups,
  handleParams
}) => {
  const clientGroupData = allClientGroups?.clientGroupsdata?.data || [];
  const clientGroupColumns = useMemo(
    () => getClientGroupTableColumns({ handleRefreshTable: handleRefreshClientGroups }),
    [handleRefreshClientGroups]
  );
  // const [searchValue, setSearchValue] = useState("")

  const metaData = allClientGroups?.clientGroupsdata?.metaData || {
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    pageLimit: 20
  };

  return (
    <>
      <div data-testid="client-group-ui">
        <section className="flex justify-between items-center px-4 py-2 h-[54px] border-b">
          <Button onClick={handleCreateClientGroup} className="flex gap-2" variant={"fill"}>
            <IconPlus size={18} /> Create new group
          </Button>

          <div className="flex items-center gap-3 text-vobb-neutral-80">
            <CustomInput
              icon={<IconSearch size={14} />}
              onChange={(e) => {
                handleParams("search", e.target.value);
              }}
              placeholder="Search groups"
              parentClassName="mb-0 min-w-[250px] text-xs font-medium"
              data-testid="search-input"
            />
          </div>
        </section>
        <section className="flex gap-2 py-2 px-4">
          <SortGroup handleParams={handleParams} />
          <FilterGroup pipelines={pipelinesData} handleParams={handleParams} />
        </section>
        <section>
          {allClientGroups?.loading ? (
            <LoadingSpinner />
          ) : clientGroupData.length === 0 ? (
            <TableEmptyState
              title="No groups have been created yet"
              description="Organize clients with shared interests by creating groups. This will help manage and track clients more effectively."
              pageIcon={<IconUsersGroup />}
              btnText="Create new group"
              ctaFunction={handleCreateClientGroup}
            />
          ) : (
            <>
              <ClientGroupTable columns={clientGroupColumns} data={clientGroupData} />
              <Pagination
                handleChange={(val) => handleParams("page", val)}
                handlePageLimit={(val) => handleParams("limit", val)}
                totalCount={metaData.totalCount}
                pageLimit={metaData.pageLimit ?? 20}
                totalPages={metaData.totalPages}
                currentPage={metaData.currentPage}
                testId="pagination"
              />
            </>
          )}
        </section>
      </div>
    </>
  );
};
