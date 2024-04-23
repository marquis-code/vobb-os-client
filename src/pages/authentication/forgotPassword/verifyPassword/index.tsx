import { Routes } from "router";
import { VerifyPasswordUI } from "modules";
import { useNavigate } from "react-router-dom";

const VerifyPassword = () => {
  const navigate = useNavigate();
  const submit = () => {
    navigate(Routes.new_password);
  };
  return (
    <>
      <VerifyPasswordUI submit={submit} />
    </>
  );
};

export { VerifyPassword };
