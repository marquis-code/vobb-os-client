import { Routes } from "router";
import { OnboardingUI } from "modules";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  
  const handleSubmit = ({ data, callback }) => {
    navigate(Routes.completed_onboarding);
  };

  return (
    <>
      <OnboardingUI handleSubmit={handleSubmit} />
    </>
  );
};

export { Onboarding };
