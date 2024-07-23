import { Badge } from "components";
import { MemberProfileBody } from "modules/organization/members/components/memberProfileBody";
import { MemberProfileHeader } from "modules/organization/members/components/memberProfileHeader";
import { MemberProfileTabs } from "modules/organization/members/components/memberProfileTabs";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "router";
import { MemberProfileDetails } from "./memberDetails";
import { MemberProfileContext } from "context";
import { useContext } from "react";
import { MemberProfileComments } from "./memberComments";
import { MemberProfileActivity } from "./memberActivity";
import { MemberProfileEmails } from "./memberEmails";
import { MemberProfileFiles } from "./memberFiles";
import { MemberProfileNotes } from "./memberNotes";
import { MemberProfileTasks } from "./memberTasks";
import { MemberProfileClients } from "./memberClients";

const Member = () => {
  const params = useParams();

  const navigate = useNavigate();

  const handleMainTabChange = (route) => {
    navigate(Routes.member(params.id, route));
  };

  const { subTab } = useContext(MemberProfileContext);

  return (
    <>
      {/* Only shown when member is suspended */}
      <Badge
        text={"This member has been suspended"}
        btnText={"Undo suspension"}
        variant={"light"}
        action={console.log}
        type={"error"}
        badge={"trailing"}
        size={"md"}
        className="justify-center rounded-none -mt-4 -ml-4 w-[calc(100%+2rem)] border-t-0 border-x-0 py-2 gap-2"
        btnClassName="ml-0"
      />
      <MemberProfileHeader />
      <MemberProfileTabs
        handleMainTabChange={handleMainTabChange}
        mainTab={params.route ?? "activity"}
      />
      <MemberProfileBody
        subSection={subTab === "comments" ? <MemberProfileComments /> : <MemberProfileDetails />}>
        {params.route === "activity" ? (
          <MemberProfileActivity />
        ) : params.route === "emails" ? (
          <MemberProfileEmails />
        ) : params.route === "file" ? (
          <MemberProfileFiles />
        ) : params.route === "tasks" ? (
          <MemberProfileTasks />
        ) : params.route === "notes" ? (
          <MemberProfileNotes />
        ) : params.route === "clients" ? (
          <MemberProfileClients />
        ) : (
          ""
        )}
      </MemberProfileBody>
    </>
  );
};

export { Member };
