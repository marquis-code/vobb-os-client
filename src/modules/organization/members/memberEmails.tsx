import { IconMail } from "@tabler/icons-react";
import { TableEmptyState } from "components";

const MemberProfileEmailsUI = () => {
  const memberEmails = [];
  return (
    <div>
      {" "}
      {!memberEmails.length ? (
        <TableEmptyState
          pageIcon={<IconMail size={25} color="#101323" />}
          title="No emails have been sent."
          description="Send an email directly from this profile to communicate with the member or track your communication history."
          ctaFunction={console.log}
          btnText="Compose Email"
          btnIcon={<IconMail size={16} />}
        />
      ) : (
        <>Member Emails</>
      )}
    </div>
  );
};

export { MemberProfileEmailsUI };
