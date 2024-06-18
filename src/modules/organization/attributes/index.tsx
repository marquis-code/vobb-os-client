import { SettingsPageTitle } from "components";
import { MemberAttributes } from "./member";
import { ClientAttributes } from "./client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";

interface OrgAttributesUIProps {
  handleAddMemberAttr: () => void;
}
const OrgAttributesUI: React.FC<OrgAttributesUIProps> = ({ handleAddMemberAttr }) => {
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
            handleEditAttribute={console.log}
            handleDuplicateAttribute={console.log}
            handleRestoreAttribute={console.log}
            handleArchiveAttribute={console.log}
          />
        </TabsContent>
        <TabsContent value="client">
          <ClientAttributes />
        </TabsContent>
      </Tabs>
    </>
  );
};

export { OrgAttributesUI };
