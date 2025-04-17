import { companyWebsiteService } from "api";
import { LoadingSpinner, toast } from "components";
import { useOnboardingContext } from "context";
import { useApiRequest } from "hooks";
import { useGetOnboardDetails } from "hooks/useGetOnboardDetails";
import { CompanyWebsiteUI } from "modules";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { CompanyWebsiteData } from "types";

const CompanyWebsite = () => {
  const { fetchOnboardDetails, onboardData, loadingOnboard } = useGetOnboardDetails();
  const { handleFormChange } = useOnboardingContext();
  const navigate = useNavigate();
  const { run, data: response, error, requestStatus } = useApiRequest({});

  const handleSubmit = (data: CompanyWebsiteData) => {
    run(companyWebsiteService(data));
  };
  useMemo(() => {
    if (response?.status === 200) {
      toast({
        description: response?.data?.message
      });
      navigate(Routes.onboarding_operating_address);
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate]);

  useEffect(() => {
    fetchOnboardDetails();
    handleFormChange("companyWeb", ["fullname", "companyInfo"]);
  }, []);

  const handleSkip = () => {
    navigate(Routes.onboarding_operating_address);
  };

  if (loadingOnboard) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <CompanyWebsiteUI
        initData={{ website: onboardData?.website ?? "" }}
        submit={(data) => {
          handleSubmit(data);
        }}
        loading={requestStatus.isPending}
        handleSkip={handleSkip}
      />
    </>
  );
};

export { CompanyWebsite };
