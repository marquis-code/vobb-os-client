import { Routes } from "router";
import { CompletedEmailVerifyUI } from "modules";
import { useNavigate } from "react-router-dom";

const CompletedEmailVerify = () => {
  const navigate = useNavigate();
  const submit = () => {
    navigate(Routes.login);
  };
  return (
    <>
      <CompletedEmailVerifyUI submit={submit} />
    </>
  );
};

export { CompletedEmailVerify };
