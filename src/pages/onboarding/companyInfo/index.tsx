import { companyNameService, companySectorService, companySizeService } from "api";
import { LoadingSpinner, toast } from "components";
import { useOnboardingContext } from "context";
import { useApiRequest } from "hooks";
import { useGetOnboardDetails } from "hooks/useGetOnboardDetails";
import { sectorOptions, teamSizeOptions } from "lib";
import { CompanyInfoUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { CompanyFormData } from "types";

const CompanyInfo = () => {
  const { fetchOnboardDetails, onboardData, loadingOnboard } = useGetOnboardDetails();
  const { handleFormChange } = useOnboardingContext();
  const [activeCompanyInfo, setActiveCompanyInfo] = useState<string>("organisation");
  const handleCompanyChange = (step: string) => {
    setActiveCompanyInfo(step);
  };
  const navigate = useNavigate();
  const {
    run: runName,
    data: nameResponse,
    error: nameError,
    requestStatus: nameStatus
  } = useApiRequest({});
  const {
    run: runSize,
    data: sizeResponse,
    error: sizeError,
    requestStatus: sizeStatus
  } = useApiRequest({});
  const {
    run: runSector,
    data: sectorResponse,
    error: sectorError,
    requestStatus: sectorStatus
  } = useApiRequest({});

  const handleSubmit = (data: CompanyFormData) => {
    switch (activeCompanyInfo) {
      case "organisation":
        runName(companyNameService({ name: data.organisation ?? "" }));
        break;
      case "teamSize":
        data?.size && runSize(companySizeService({ size: data?.size?.value }));
        break;
      case "sector":
        data?.sector && runSector(companySectorService({ sector: data?.sector?.value }));
        break;
      default:
        break;
    }
  };

  useMemo(() => {
    if (nameResponse?.status === 200) {
      toast({
        description: nameResponse?.data?.message
      });
      handleCompanyChange("teamSize");
      fetchOnboardDetails();
    } else if (nameError) {
      toast({
        variant: "destructive",
        description: nameError?.response?.data?.error
      });
    }
  }, [nameResponse, nameError]);

  useMemo(() => {
    if (sizeResponse?.status === 200) {
      toast({
        description: sizeResponse?.data?.message
      });
      fetchOnboardDetails();
      handleCompanyChange("sector");
    } else if (sizeError) {
      toast({
        variant: "destructive",
        description: sizeError?.response?.data?.error
      });
    }
  }, [sizeResponse, sizeError]);

  useMemo(() => {
    if (sectorResponse?.status === 200) {
      toast({
        description: sectorResponse?.data?.message
      });
      fetchOnboardDetails();
      navigate(Routes.onboarding_company_website);
    } else if (sectorError) {
      toast({
        variant: "destructive",
        description: sectorError?.response?.data?.error
      });
    }
  }, [sectorResponse, sectorError, navigate]);

  useEffect(() => {
    fetchOnboardDetails();
    handleFormChange("companyWeb", ["fullname", "companyInfo"]);
  }, []);

  useEffect(() => {
    if (!loadingOnboard && onboardData) {
      if (!onboardData?.name) {
        handleCompanyChange("organisation");
      } else if (!onboardData?.size) {
        handleCompanyChange("teamSize");
      } else if (!onboardData?.sector.length) {
        handleCompanyChange("sector");
      }
    }
  }, [loadingOnboard, onboardData]);

  if (loadingOnboard) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <CompanyInfoUI
        initName={{ organisation: onboardData?.name ?? "" }}
        initSize={{
          size: onboardData?.size
            ? teamSizeOptions.find((item) => item.value === onboardData.size) ?? null
            : null
        }}
        initSector={{
          sector: onboardData?.sector.length
            ? sectorOptions.find((item) => item.value === onboardData.sector[0]) ?? null
            : null
        }}
        activeCompanyInfo={activeCompanyInfo}
        handleCompanyChange={handleCompanyChange}
        loading={nameStatus.isPending || sizeStatus.isPending || sectorStatus.isPending}
        submit={(data) => {
          handleSubmit(data);
        }}
      />
    </>
  );
};

export { CompanyInfo };
