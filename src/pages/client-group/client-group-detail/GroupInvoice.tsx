import { IconFileDescription } from "@tabler/icons-react";
import { TableEmptyState } from "components";

export const GroupInvoice = () => {
  return (
    <TableEmptyState
      pageIcon={<IconFileDescription size={25} color="#101323" />}
      title="No invoice"
      description=""
    />
  );
};
