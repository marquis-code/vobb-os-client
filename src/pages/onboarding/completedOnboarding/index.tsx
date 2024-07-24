import { CompletedOnboardingUI } from "modules";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";

const CompletedOnboarding = () => {
  const navigate = useNavigate();
  const submit = () => navigate(Routes.overview);
  return (
    <>
      <CompletedOnboardingUI submit={submit} />
    </>
  );
};

export { CompletedOnboarding };
