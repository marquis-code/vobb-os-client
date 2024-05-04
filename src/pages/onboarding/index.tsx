import { Routes } from "router";
import { OnboardingUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFetchCountries } from "hooks";

const Onboarding = () => {
  const navigate = useNavigate();
  const { countries, fetchCountries } = useFetchCountries();

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSubmit = ({ data, callback }) => {
    navigate(Routes.completed_onboarding);
  };

  return (
    <>
      <OnboardingUI handleSubmit={handleSubmit} countries={countries} />
    </>
  );
};

export { Onboarding };
