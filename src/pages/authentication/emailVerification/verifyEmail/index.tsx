import { Routes } from "router";
import { VerifyEmailUI } from "modules";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const submit = () => {
    navigate(Routes.completed_email_verify);
  };
  return (
    <>
      <VerifyEmailUI submit={submit} />
    </>
  );
};

export { VerifyEmail };
