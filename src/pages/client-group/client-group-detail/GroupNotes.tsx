import { IconClipboardText } from "@tabler/icons-react";
import { TableEmptyState } from "components";

export const GroupNotes = () => {
  return (
    <TableEmptyState
      pageIcon={<IconClipboardText size={25} color="#101323" />}
      title="No notes"
      description=""
    />
  );
};
