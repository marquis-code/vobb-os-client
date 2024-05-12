import { fetchCountriesService } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { CountryType } from "types/onboarding";
import { useCountriesContext } from "context";

export const useFetchCountries = () => {
  // API Request Hooks
  const { run, data: response, requestStatus, error } = useApiRequest({});
  const { handleUpdateCountries } = useCountriesContext();

  const fetchCountries = () => run(fetchCountriesService());

  const countries = useMemo<CountryType[]>(() => {
    if (response?.status === 200) {
      const data = response.data.map((item) => ({
        label: item.name.common,
        value: item.cca3,
        postalCode: item.postalCode
      }));

      const countries = data.sort((a, b) => a.label.localeCompare(b.label));
      handleUpdateCountries(countries);
      return countries;
    }
    return [];
  }, [response, error]);

  return { fetchCountries, countries, loadingCountries: requestStatus.isPending };
};
