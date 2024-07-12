import { LoadingSpinner, SettingsPageTitle } from "components";
import { MemberAttributes } from "./member";
import { ClientAttributes } from "./client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { OrganisationAttributesData } from "types";

interface OrgAttributesUIProps {
  handleAddMemberAttr: () => void;
  handleAddClientAttr: () => void;
  handleEditAttr: {
    setEditAttr: () => void;
    handleSetDefaultAttribute: (attr: OrganisationAttributesData) => void;
  };
  handleDuplicateClientAttr: {
    setDuplicateAttr: () => void;
    handleSetDefaultDuplicate: (attr: OrganisationAttributesData) => void;
  };
  handleArchiveAttr: (id: string) => void;
  handleRestoreAttr: (id: string) => void;
  handleClientAttrAction: {
    loading: boolean;
    handlePagination: (param: string, value: number) => void;
  };
}
const OrgAttributesUI: React.FC<OrgAttributesUIProps> = ({
  handleAddMemberAttr,
  handleAddClientAttr,
  handleEditAttr,
  handleDuplicateClientAttr,
  handleArchiveAttr,
  handleRestoreAttr,
  handleClientAttrAction
}) => {
  const { loading: clientLoading, handlePagination } = handleClientAttrAction;
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
          <MemberAttributes
            handleAddAttribute={handleAddMemberAttr}
            handleEditAttribute={{ setEditAttr: () => {}, handleSetDefaultAttribute: () => {} }}
            handleDuplicateAttribute={{
              setDuplicateAttr: () => {},
              handleSetDefaultDuplicate: () => {}
            }}
            handleRestoreAttribute={console.log}
            handleArchiveAttribute={console.log}
          />
        </TabsContent>
        <TabsContent value="client">
          {clientLoading ? (
            <LoadingSpinner />
          ) : (
            <ClientAttributes
              handleAddAttribute={handleAddClientAttr}
              handleEditAttribute={handleEditAttr}
              handleDuplicateAttribute={handleDuplicateClientAttr}
              handleRestoreAttribute={handleRestoreAttr}
              handleArchiveAttribute={handleArchiveAttr}
              handlePagination={handlePagination}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
};

export { OrgAttributesUI };
