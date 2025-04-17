import { IconFlame } from "@tabler/icons-react";
import { TableEmptyState } from "components";

export const GroupActivity = () => {
  const groupActivities = [];

  return (
    <div>
      {!groupActivities.length ? (
        <TableEmptyState
          pageIcon={<IconFlame size={25} color="#101323" />}
          title="No recent activities."
          description="Track important updates, tasks, or changes related to this member as they progress through your services."
        />
      ) : (
        <>Group Activities</>
      )}
    </div>
  );
};
