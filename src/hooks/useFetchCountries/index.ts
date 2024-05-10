import { fetchCountriesService, fetchCountryWithCodeService } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { CountryType } from "types/onboarding";

export const useFetchCountries = () => {
  // API Request Hooks
  const {
    run: runCountries,
    data: countriesResponse,
    requestStatus: countriesStatus
  } = useApiRequest({});
  const {
    run: runCountry,
    data: countryResponse,
    requestStatus: countryRequest
  } = useApiRequest({});

  const fetchCountries = () => runCountries(fetchCountriesService());
  const fetchCountry = (code: string) => runCountry(fetchCountryWithCodeService(code));

  const countries = useMemo<CountryType[]>(() => {
    if (countriesResponse?.status === 200) {
      const data = countriesResponse.data.map((item) => ({
        label: item.name.common,
        value: item.cca3,
        postalCode: item.postalCode
      }));

      return data.sort((a, b) => a.label.localeCompare(b.label));
    }
    return [];
  }, [countriesResponse]);

  const country = useMemo(() => {
    if (countryResponse?.status === 200) {
      return countryResponse?.data?.name?.common;
    }
  }, [countryResponse]);

  return {
    fetchCountries,
    countries,
    fetchCountry,
    country,
    loadingCountries: countriesStatus.isPending,
    loadingCountry: countryRequest.isPending
  };
};
