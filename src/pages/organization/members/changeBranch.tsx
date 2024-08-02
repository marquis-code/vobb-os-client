import { ChangeBranchModal } from "components";
import { ModalProps } from "types";

interface ChangeBranchProps extends ModalProps {
  name: string;
  id: string;
}

const ChangeBranch = (props: ChangeBranchProps) => {
  return <ChangeBranchModal submit={console.log} {...props} />;
};

export { ChangeBranch };
