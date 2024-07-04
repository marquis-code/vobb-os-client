import { SettingsPageTitle } from "components";
import { MemberAttributes } from "./member";
import { ClientAttributes } from "./client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { OrganisationAttributesData } from "types";

interface OrgAttributesUIProps {
  handleAddMemberAttr: () => void;
  handleEditMemberAttr: {
    setEditAttr: () => void;
    handleSetDefaultAttribute: (attr: OrganisationAttributesData) => void;
  };
  handleDuplicateMemberAttr: {
    setDuplicateAttr: () => void;
    handleSetDefaultDuplicate: (attr: OrganisationAttributesData) => void;
  };
  handleArchiveAttr: (id: string) => void;
  handleRestoreAttr: (id: string) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}
const OrgAttributesUI: React.FC<OrgAttributesUIProps> = ({
  handleAddMemberAttr,
  handleEditMemberAttr,
  handleDuplicateMemberAttr,
  handleArchiveAttr,
  handleRestoreAttr,
  setPage,
  setLimit,
  limit
}) => {
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
            handleEditAttribute={handleEditMemberAttr}
            handleDuplicateAttribute={handleDuplicateMemberAttr}
            handleRestoreAttribute={handleRestoreAttr}
            handleArchiveAttribute={handleArchiveAttr}
            limit={limit}
            setPage={setPage}
            setLimit={setLimit}
          />
        </TabsContent>
        <TabsContent value="client">
          <ClientAttributes
            handleAddAttribute={console.log}
            handleEditAttribute={handleEditMemberAttr}
            handleDuplicateAttribute={handleDuplicateMemberAttr}
            handleRestoreAttribute={console.log}
            handleArchiveAttribute={console.log}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export { OrgAttributesUI };
