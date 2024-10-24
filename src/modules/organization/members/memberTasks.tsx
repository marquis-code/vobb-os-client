import { IconFileCheck } from "@tabler/icons-react";
import { EmptyStates } from "components";

const MemberProfileTasksUI = () => {
  const memberTasks = [];
  return (
    <div>
      {!memberTasks.length ? (
        <EmptyStates
          pageIcon={<IconFileCheck size={25} color="#101323" />}
          title="No tasks have been assigned yet."
          description="Assign tasks to ensure clear responsibilities and follow-up actions for this member."
          ctaFunction={console.log}
          btnText="Add Task"
        />
      ) : (
        <>Member Tasks</>
      )}
    </div>
  );
};

export { MemberProfileTasksUI };
