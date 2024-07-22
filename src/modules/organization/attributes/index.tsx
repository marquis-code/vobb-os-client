import { LoadingSpinner, SettingsPageTitle } from "components";
import { MemberAttributes } from "./member";
import { ClientAttributes } from "./client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { OrganisationAttributesData } from "types";

interface OrgAttributesUIProps {
  handleAddMemberAttr: () => void;
  handleAddClientAttr: () => void;
  setEditMemberAttr: (attr: OrganisationAttributesData) => void;
  setEditClientAttr: (attr: OrganisationAttributesData) => void;
  setDuplicateAttr: (attr: OrganisationAttributesData) => void;
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
}
const OrgAttributesUI: React.FC<OrgAttributesUIProps> = ({
  handleAddMemberAttr,
  handleAddClientAttr,
  setEditMemberAttr,
  setEditClientAttr,
  setDuplicateAttr,
  handleArchiveAttr,
  handleRestoreAttr,
  handleMemberAttrAction,
  handleClientAttrAction
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
        <TabsList className="mb-2">
          <TabsTrigger
            className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
            value="member">
            Team member attributes
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-vobb-primary-70 data-[state=active]:text-white"
            value="client">
            Client attributes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="member">
          {memberLoading ? (
            <LoadingSpinner />
          ) : (
            <MemberAttributes
              handleAddAttribute={handleAddMemberAttr}
              handleEditAttribute={setEditMemberAttr}
              handleDuplicateAttribute={setDuplicateAttr}
              handleRestoreAttribute={handleRestoreAttr}
              handleArchiveAttribute={handleArchiveAttr}
              handlePagination={handleMemberPagination}
            />
          )}
        </TabsContent>
        <TabsContent value="client">
          {clientLoading ? (
            <LoadingSpinner />
          ) : (
            <ClientAttributes
              handleAddAttribute={handleAddClientAttr}
              handleEditAttribute={setEditClientAttr}
              handleDuplicateAttribute={setDuplicateAttr}
              handleRestoreAttribute={handleRestoreAttr}
              handleArchiveAttribute={handleArchiveAttr}
              handlePagination={handleClientPagination}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export { OrgAttributesUI };
