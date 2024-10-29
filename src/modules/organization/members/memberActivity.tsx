import { IconFlame } from "@tabler/icons-react";
import { TableEmptyState } from "components";

const MemberProfileActivityUI = () => {
  const memberActivities = [];
  return (
    <div>
      {!memberActivities.length ? (
        <TableEmptyState
          pageIcon={<IconFlame size={25} color="#101323" />}
          title="No recent activities."
          description="Track important updates, tasks, or changes related to this member as they progress through your services."
        />
      ) : (
        <>Member Activities</>
      )}
    </div>
  );
};

export { MemberProfileActivityUI };
