/*
=================================
AUTH SERVICES
=================================
*/

import { fetchCountriesURL, fetchCountryWithCodeURL } from "api";
import axios from "axios";

/**
 * Fetch countries service
 * @returns axios promise
 */

export const fetchCountriesService = () => {
  return axios.get(fetchCountriesURL());
};

/**
 * Fetch countries service
 * @param code 3-letter code of country to retrieve name.
 * @returns axios promise
 */

export const fetchCountryWithCodeService = (code: string) => {
  return axios.get(fetchCountryWithCodeURL(code));
};
