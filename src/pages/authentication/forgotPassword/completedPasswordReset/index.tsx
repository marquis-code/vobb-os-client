import { Routes } from "router";
import { CompletedPasswordResetUI } from "modules";
import { useNavigate } from "react-router-dom";

const CompletedPasswordReset = () => {
  const navigate = useNavigate();
  const submit = () => {
    navigate(Routes.login);
  };
  return (
    <>
      <CompletedPasswordResetUI submit={submit} />
    </>
  );
};

export { CompletedPasswordReset };
