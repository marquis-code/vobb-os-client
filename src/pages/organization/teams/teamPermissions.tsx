import { TeamPermissionsModal } from "components";
import { ModalProps } from "types";

interface TeamPermissionsProps extends ModalProps {
  teamId: string;
}

const TeamPermissions: React.FC<TeamPermissionsProps> = (props) => {
  const submit = () => {};

  return (
    <>
      <TeamPermissionsModal submit={submit} loading={false} {...props} />
    </>
  );
};

export { TeamPermissions };
