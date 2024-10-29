import { IconPlus, IconUsersGroup } from "@tabler/icons-react";
import {
  SettingsPageTitle,
  Filter,
  Button,
  FilterData,
  attributeType,
  MemberTable,
  MemberTableActions,
  Pagination,
  getMemberTableColumns,
  LoadingSpinner,
  TableEmptyState
} from "components";
import { useMemo, useState } from "react";
import { MemberDataProps } from "types";

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

  // The last three should be appended to the attribute list from the backend
  {
    value: "teams",
    label: "Teams",
    type: "select"
  },
  {
    value: "status",
    label: "Status",
    type: "select"
  },
  {
    value: "branch",
    label: "Branch",
    type: "select"
  }
];

interface MembersUIProps extends MemberTableActions {
  handleInviteMember: () => void;
  handleViewMembers: {
    loading: boolean;
    orgMembersData: MemberDataProps;
    handleParams: (filter: string, value: string | number) => void;
  };
}
const MembersUI: React.FC<MembersUIProps> = ({
  handleViewMembers,
  handleInviteMember,
  handleViewMember,
  handleSuspension,
  handleCancelInvitation,
  handleChangeRole,
  handleResendInvitation
}) => {
  const [filters, setFilters] = useState<FilterData[]>([]);
  const { loading, orgMembersData, handleParams } = handleViewMembers;

  const memberColumns = useMemo(
    () =>
      getMemberTableColumns({
        handleSuspension,
        handleCancelInvitation,
        handleChangeRole,
        handleResendInvitation,
        handleViewMember
      }),
    [
      handleSuspension,
      handleCancelInvitation,
      handleChangeRole,
      handleResendInvitation,
      handleViewMember
    ]
  );

  const membersData = orgMembersData?.membersArray;
  const { currentPage, totalCount, totalPages, pageLimit = 20 } = orgMembersData?.metaData;

  return (
    <>
      <SettingsPageTitle title="Members" className="max-w-none" />
      <section className="mb-6 flex justify-between gap-4 items-center">
        <Filter
          className="mb-0 h-9 w-20"
          filters={filters}
          setFilter={setFilters}
          attributes={attributes}
        />
        <Button
          onClick={handleInviteMember}
          className="flex gap-2 ml-auto"
          variant={"fill"}
          data-testid="invite-member">
          <IconPlus size={18} /> Invite member
        </Button>
      </section>
      {loading ? (
        <LoadingSpinner />
      ) : !membersData.length ? (
        <TableEmptyState
          pageIcon={<IconUsersGroup size={25} color="#101323" />}
          title="No members have been added yet."
          description="Start adding members to manage their profiles, track tasks, and monitor their activities."
          ctaFunction={handleInviteMember}
          btnText="Invite member"
        />
      ) : (
        <>
          <MemberTable columns={memberColumns} data={membersData} />
          <Pagination
            // hidePageLimit
            handleChange={(val) => handleParams("page", val)}
            handlePageLimit={(val) => handleParams("limit", val)}
            totalCount={totalCount}
            pageLimit={pageLimit}
            totalPages={totalPages}
            currentPage={currentPage}
            className="mt-4 mb-28"
            testId="pagination"
          />
        </>
      )}
    </>
  );
};

export { MembersUI };
export * from "./memberActivity";
export * from "./memberClients";
export * from "./memberComments";
export * from "./memberDetails";
export * from "./memberEmails";
export * from "./memberFiles";
export * from "./memberNotes";
export * from "./memberTasks";
export * from "./acceptInvite";
export * from "./invitationSuccessful";
export * from "./invitationFailed";
