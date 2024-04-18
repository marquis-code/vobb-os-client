import { OnboardingUI } from "modules";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  const handleSubmit = ({ data, callback }) => {
    navigate("/completed");
  };

  return (
    <>
      <OnboardingUI handleSubmit={handleSubmit} />
    </>
  );
};

export { Onboarding };
