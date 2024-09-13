import { Routes } from "router";
import { CompletedEmailVerifyUI } from "modules";
import { useNavigate } from "react-router-dom";

const CompletedEmailVerify = () => {
  const navigate = useNavigate();
  const submit = () => {
    navigate(Routes.onboarding_user_details);
  };
  return (
    <>
      <CompletedEmailVerifyUI submit={submit} />
    </>
  );
};

export { CompletedEmailVerify };
