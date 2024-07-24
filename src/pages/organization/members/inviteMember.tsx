import { InviteMemberModal } from "components";
import { ModalProps } from "types";

const InviteMember = (props: ModalProps) => {
  return <InviteMemberModal submit={console.log} {...props} />;
};

export { InviteMember };
