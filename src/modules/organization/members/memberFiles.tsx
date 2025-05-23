import { IconArrowBarUp, IconFiles } from "@tabler/icons-react";
import { TableEmptyState } from "components";

const MemberProfileFilesUI = () => {
  const memberFiles = [];
  return (
    <div>
      {" "}
      {!memberFiles.length ? (
        <TableEmptyState
          pageIcon={<IconFiles size={25} color="#101323" />}
          title="No files uploaded."
          description="Upload important documents, contracts, or identification related to this member for easy access."
          ctaFunction={console.log}
          btnText="Upload File"
          btnIcon={<IconArrowBarUp size={16} />}
        />
      ) : (
        <>Member Files</>
      )}
    </div>
  );
};

export { MemberProfileFilesUI };
