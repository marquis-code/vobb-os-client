/*
=================================
AUTH SERVICES
=================================
*/

import { fetchCountriesURL } from "api";
import axios from "axios";

/**
 * Fetch countries service
 * @returns axios promise
 */

export const fetchCountriesService = () => {
  return axios.get(fetchCountriesURL());
};
