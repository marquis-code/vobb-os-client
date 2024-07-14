import { TeamPermissionsModal } from "components";
import { ModalProps } from "types";

const TeamPermissions = (props: ModalProps) => {
  return (
    <>
      <TeamPermissionsModal submit={console.log} {...props} />
    </>
  );
};

export { TeamPermissions };
