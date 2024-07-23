import { EditTeamModal } from "components";
import { ModalProps } from "types";

interface EditTeamProps extends ModalProps {
  callback: () => void;
}

const EditTeam = (props: EditTeamProps) => {
  const handleSubmit = (data) => {
    console.log(data);
    props.callback();
  };
  return (
    <>
      <EditTeamModal
        initData={{
          name: "Finance",
          description: "Manage money and financial records",
          icon: "",
          isGeneral: true,
        }}
        submit={handleSubmit}
        {...props}
      />
    </>
  );
};

export { EditTeam };
