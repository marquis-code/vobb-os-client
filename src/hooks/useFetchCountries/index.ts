import { fetchCountriesService } from "api";
import { useApiRequest } from "../useApiRequest";
import { useMemo } from "react";
import { CountryType } from "types/onboarding";

export const useFetchCountries = () => {
  // API Request Hooks
  const { run, data: response, requestStatus } = useApiRequest({});

  const fetchCountries = () => run(fetchCountriesService());

  const countries = useMemo<CountryType[]>(() => {
    if (response?.status === 200) {
      const data = response.data.map((item) => ({
        label: item.name.common,
        value: item.cca3,
        postalCode: item.postalCode
      }));

      return data.sort((a, b) => a.label.localeCompare(b.label));
    }
    return [];
  }, [response]);

  return { fetchCountries, countries, loading: requestStatus.isPending };
};
