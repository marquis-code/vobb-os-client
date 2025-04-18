import { LoadingSpinner, SettingsPageTitle } from "components";
import { MemberAttributes } from "./member";
import { ClientAttributes } from "./client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { AttributesDataProps, OrganisationAttributesData } from "types";

interface OrgAttributesUIProps {
  handleAddMemberAttr: () => void;
  handleAddClientAttr: () => void;
  setEditMemberAttr: (attr: OrganisationAttributesData) => void;
  setEditClientAttr: (attr: OrganisationAttributesData) => void;
  setDuplicateMemberAttr: (attr: OrganisationAttributesData) => void;
  setDuplicateClientAttr: (attr: OrganisationAttributesData) => void;
  handleArchiveAttr: (id: string) => void;
  handleRestoreAttr: (id: string) => void;
  handleMemberAttrAction: {
    loading: boolean;
    handlePagination: (param: string, value: number) => void;
  };
  handleClientAttrAction: {
    loading: boolean;
    handlePagination: (param: string, value: number) => void;
  };
  clientAttributes: AttributesDataProps;
  memberAttributes: AttributesDataProps;
}
const OrgAttributesUI: React.FC<OrgAttributesUIProps> = ({
  handleAddMemberAttr,
  handleAddClientAttr,
  setEditMemberAttr,
  setEditClientAttr,
  setDuplicateMemberAttr,
  setDuplicateClientAttr,
  handleArchiveAttr,
  handleRestoreAttr,
  handleMemberAttrAction,
  handleClientAttrAction,
  memberAttributes,
  clientAttributes
}) => {
  const { loading: memberLoading, handlePagination: handleMemberPagination } =
    handleMemberAttrAction;
  const { loading: clientLoading, handlePagination: handleClientPagination } =
    handleClientAttrAction;
  return (
    <>
      <SettingsPageTitle
        title="Attributes"
        description={"Collect as much data as you want from your team members or clients"}
        className="max-w-none"
      />
      <Tabs defaultValue="member">
        <TabsList className="mb-2" data-testid="attr-tablist">
          <TabsTrigger
            className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
            value="member"
            data-testid="member-attr">
            Team member attributes
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
            value="client"
            data-testid="client-attr">
            Client attributes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="member">
          {memberLoading ? (
            <LoadingSpinner testId="loading-spinner" />
          ) : (
            <MemberAttributes
              handleAddAttribute={handleAddMemberAttr}
              handleEditAttribute={setEditMemberAttr}
              handleDuplicateAttribute={setDuplicateMemberAttr}
              handleRestoreAttribute={handleRestoreAttr}
              handleArchiveAttribute={handleArchiveAttr}
              handlePagination={handleMemberPagination}
              memberAttributes={memberAttributes}
            />
          )}
        </TabsContent>
        <TabsContent value="client">
          {clientLoading ? (
            <LoadingSpinner testId="loading-spinner" />
          ) : (
            <ClientAttributes
              handleAddAttribute={handleAddClientAttr}
              handleEditAttribute={setEditClientAttr}
              handleDuplicateAttribute={setDuplicateClientAttr}
              handleRestoreAttribute={handleRestoreAttr}
              handleArchiveAttribute={handleArchiveAttr}
              handlePagination={handleClientPagination}
              clientAttributes={clientAttributes}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export { OrgAttributesUI };
