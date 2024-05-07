import {
  companyAddressesService,
  companyCountryService,
  companyStateService,
  companyZipcodeService
} from "api";
import { toast } from "components";
import { useOnboardingContext } from "context";
import { useApiRequest, useFetchCountries } from "hooks";
import { CompanyAddressUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { CompanyAddressFormData } from "types";

const initAddresses: CompanyAddressFormData = {
  address_line_1: "",
  address_line_2: "",
  city: ""
};

const CompanyAddress = () => {
  const { handleFormChange } = useOnboardingContext();
  const { countries, fetchCountries } = useFetchCountries();
  const [activeCompanyAddress, setActiveCompanyInfo] = useState<string>("country");
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
        runCountry(companyCountryService({ country: (data?.country as { value: any })?.value }));
        break;
      case "zipcode":
        runZipcode(companyZipcodeService({ zip_code: data.zip_code }));
        break;
      case "province":
        runState(companyStateService({ state: data.state }));
        break;
      case "cityAddress":
        const requestBody: CompanyAddressFormData = {
          address_line_1: data.address_line_1,
          city: data.city
        };

        if (data.address_line_2 && data.address_line_2.trim() !== "") {
          requestBody.address_line_2 = data.address_line_2;
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
    } else if (stateError) {
      toast({
        variant: "destructive",
        description: stateError?.response?.data?.error
      });
    }
  }, [stateResponse, stateError]);

  useMemo(() => {
    if (cityResponse?.status === 200) {
      toast({
        description: cityResponse?.data?.message
      });
      localStorage.removeItem("vobbOSAccess");
      navigate(Routes.completed_onboarding);
    } else if (cityError) {
      toast({
        variant: "destructive",
        description: cityError?.response?.data?.error
      });
    }
  }, [cityResponse, cityError, navigate]);

  useEffect(() => {
    fetchCountries();
  }, []);
  return (
    <>
      <CompanyAddressUI
        initCountry={{ country: null }}
        initZipcode={{ zip_code: "" }}
        initState={{ state: "" }}
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
          handleFormChange("companyWeb", ["fullname", "companyInfo"]);
        }}
        countries={countries}
      />
    </>
  );
};

export { CompanyAddress };
