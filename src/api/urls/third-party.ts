/*
=================================
THIRD PARTY URLS
=================================
*/

/**
 * Fetch countries url
 *
 * @returns url string
 *
 */

export const fetchCountriesURL = () =>
  `https://restcountries.com/v3.1/all?fields=name,postalCode,flags,cca3`;

/**
 * Fetch country using code url
 *@param countryCode 3-letter code of country to retrieve name.
 * @returns url string
 *
 */
export const fetchCountryWithCodeURL = (countryCode: string) =>
  `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name`;
