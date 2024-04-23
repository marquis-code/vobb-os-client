import { Routes } from "router";
import { useNavigate } from "react-router-dom";
import { NewPasswordUI } from "modules";

const NewPassword = () => {
  const navigate = useNavigate();
  const submit = () => {
    navigate(Routes.new_password_completed);
  };
  return (
    <>
      <NewPasswordUI submit={submit} />
    </>
  );
};

export { NewPassword };
