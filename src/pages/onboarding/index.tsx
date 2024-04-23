import { Routes } from "router";
import { OnboardingUI } from "modules";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CountriesProps } from "@/types/onboarding";

const Onboarding = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState<CountriesProps[] | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,postalCode,flags"
        );
        setCountries(response?.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

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
