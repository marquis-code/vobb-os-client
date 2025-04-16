import { IconListCheck } from "@tabler/icons-react";
import { TableEmptyState } from "components";

export const GroupTasks = () => {
  return (
    <TableEmptyState
      pageIcon={<IconListCheck size={25} color="#101323" />}
      title="No tasks have been assigned"
      description=""
    />
  );
};
