import { Routes } from "router";
import { EmailUI } from "modules";
import { useNavigate } from "react-router-dom";

const Email = () => {
  const navigate = useNavigate();
  const submit = () => {
    navigate(Routes.forgot_password_verify);
  };
  return (
    <>
      <EmailUI submit={submit} />
    </>
  );
};

export { Email };
