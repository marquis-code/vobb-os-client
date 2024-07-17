import { TeamPermissionsModal } from "components";
import { ModalProps } from "types";

interface Props extends ModalProps {
  hideSkip?: boolean;
}

const TeamPermissions = (props: Props) => {
  return (
    <>
      <TeamPermissionsModal submit={console.log} {...props} />
    </>
  );
};

export { TeamPermissions };
