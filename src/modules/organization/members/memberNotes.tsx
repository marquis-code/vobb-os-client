import { IconClipboardText } from "@tabler/icons-react";
import { TableEmptyState } from "components";

const MemberProfileNotesUI = () => {
  const memberNotes = [];
  return (
    <div>
      {" "}
      {!memberNotes.length ? (
        <TableEmptyState
          pageIcon={<IconClipboardText size={25} color="#101323" />}
          title="No notes have been added."
          description="Keep track of important internal information and feedback related to this member by adding notes."
          ctaFunction={console.log}
          btnText="Add Note"
        />
      ) : (
        <>Member Files</>
      )}
    </div>
  );
};

export { MemberProfileNotesUI };
