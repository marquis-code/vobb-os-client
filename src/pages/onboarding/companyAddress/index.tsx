import {
  companyAddressesService,
  companyCountryService,
  companyStateService,
  companyZipcodeService
} from "api";
import { LoadingSpinner, toast } from "components";
import { useOnboardingContext } from "context";
import { useApiRequest, useFetchCountries } from "hooks";
import { useGetOnboardDetails } from "hooks/useGetOnboardDetails";
import { CompanyAddressUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { CompanyAddressFormData, companyAddressRequestBody, optionType } from "types";

const CompanyAddress = () => {
  const { handleFormChange } = useOnboardingContext();
  const { fetchOnboardDetails, onboardData, loadingOnboard } = useGetOnboardDetails();
  const { countries, fetchCountries, loadingCountries } = useFetchCountries();
  const [activeCompanyAddress, setActiveCompanyInfo] = useState<string>("country");
  const [selectedCountry, setSelectedCountry] = useState<optionType>();

  const handleCompanyChange = (step: string) => {
    setActiveCompanyInfo(step);
  };
  const navigate = useNavigate();

  const {
    run: runCountry,
    data: countryResponse,
    error: countryError,
    requestStatus: countryStatus
  } = useApiRequest({});
  const {
    run: runZipcode,
    data: zipcodeResponse,
    error: zipcodeError,
    requestStatus: zipcodeStatus
  } = useApiRequest({});
  const {
    run: runState,
    data: stateResponse,
    error: stateError,
    requestStatus: stateStatus
  } = useApiRequest({});

  const {
    run: runCity,
    data: cityResponse,
    error: cityError,
    requestStatus: cityStatus
  } = useApiRequest({});

  const handleSubmit = (data: CompanyAddressFormData) => {
    switch (activeCompanyAddress) {
      case "country":
        runCountry(companyCountryService({ country: data?.country?.value ?? "" }));
        setSelectedCountry(data?.country ?? undefined);
        break;
      case "zipcode":
        runZipcode(companyZipcodeService({ zip_code: data.zipCode ?? "" }));
        break;
      case "province":
        runState(companyStateService({ state: data.state ?? "" }));
        break;
      case "cityAddress":
        const requestBody: companyAddressRequestBody = {
          address_line_1: data.addressLine1 ?? "",
          city: data.city ?? ""
        };

        if (data.addressLine2 && data.addressLine2.trim() !== "") {
          requestBody.address_line_2 = data.addressLine2;
        }
        runCity(companyAddressesService(requestBody));
        break;
      default:
        break;
    }
  };

  useMemo(() => {
    if (countryResponse?.status === 200) {
      toast({
        description: countryResponse?.data?.message
      });
      handleCompanyChange("zipcode");
      fetchOnboardDetails();
    } else if (countryError) {
      toast({
        variant: "destructive",
        description: countryError?.response?.data?.error
      });
    }
  }, [countryResponse, countryError]);

  useMemo(() => {
    if (zipcodeResponse?.status === 200) {
      toast({
        description: zipcodeResponse?.data?.message
      });

      handleCompanyChange("province");
      fetchOnboardDetails();
    } else if (zipcodeError) {
      toast({
        variant: "destructive",
        description: zipcodeError?.response?.data?.error
      });
    }
  }, [zipcodeResponse, zipcodeError]);

  useMemo(() => {
    if (stateResponse?.status === 200) {
      toast({
        description: stateResponse?.data?.message
      });
      handleCompanyChange("cityAddress");
      fetchOnboardDetails();
    } else if (stateError) {
      toast({
        variant: "destructive",
        description: stateError?.response?.data?.error
      });
    }
  }, [stateResponse, stateError]);

  useMemo(() => {
    if (cityResponse?.status === 200) {
      localStorage.removeItem("vobbOSAccess");
      navigate(Routes.completed_onboarding);
      toast({
        description: cityResponse?.data?.message
      });
    } else if (cityError) {
      toast({
        variant: "destructive",
        description: cityError?.response?.data?.error
      });
    }
  }, [cityResponse, cityError, navigate]);

  const initAddresses: CompanyAddressFormData = {
    addressLine1: onboardData?.address_line_1 ?? "",
    addressLine2: onboardData?.address_line_2 ?? "",
    city: onboardData?.city ?? ""
  };

  useEffect(() => {
    fetchCountries();
    fetchOnboardDetails();
    handleFormChange("companyWeb", ["fullname", "companyInfo", "companyWeb", "address"]);
  }, []);

  useEffect(() => {
    if (!loadingOnboard && onboardData) {
      if (!onboardData?.country) {
        handleCompanyChange("country");
      } else if (!onboardData?.zip_code) {
        handleCompanyChange("zipcode");
      } else if (!onboardData?.state) {
        handleCompanyChange("province");
      } else if (!onboardData?.address_line_1) {
        handleCompanyChange("cityAddress");
      }
    }
  }, [onboardData, loadingOnboard]);

  if (loadingOnboard || loadingCountries) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <CompanyAddressUI
        initCountry={{
          country: onboardData?.country
            ? countries.find((item) => item.value === onboardData.country) ?? null
            : null
        }}
        initZipcode={{ zipCode: onboardData?.zip_code ?? "" }}
        initState={{ state: onboardData?.state ?? "" }}
        initCityAddresses={initAddresses}
        activeCompanyAddress={activeCompanyAddress}
        handleCompanyChange={handleCompanyChange}
        loading={
          countryStatus.isPending ||
          zipcodeStatus.isPending ||
          stateStatus.isPending ||
          cityStatus.isPending
        }
        submit={(data) => {
          handleSubmit(data);
        }}
        countries={countries}
        selectedCountry={selectedCountry}
      />
    </>
  );
};

export { CompanyAddress };
