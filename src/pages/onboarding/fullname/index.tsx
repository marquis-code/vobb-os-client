import { personalDetailsService } from "api";
import { LoadingSpinner, toast } from "components";
import { useOnboardingContext } from "context";
import { useApiRequest } from "hooks";
import { useGetOnboardDetails } from "hooks/useGetOnboardDetails";
import { FullnameUI } from "modules";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "router";
import { FullnameFormData } from "types";

const Fullname = () => {
  const { fetchOnboardDetails, onboardData, loadingOnboard } = useGetOnboardDetails();
  const { handleFormChange } = useOnboardingContext();
  const { run, data: response, error, requestStatus } = useApiRequest({});
  const navigate = useNavigate();
  const handleSubmit = (data: FullnameFormData) => {
    run(personalDetailsService({ first_name: data.firstName, last_name: data.lastName }));
  };

  useMemo(() => {
    if (response?.status === 200) {
      navigate(Routes.onboarding_company_details);
      toast({
        description: response?.data?.message
      });
    } else if (error) {
      toast({
        variant: "destructive",
        description: error?.response?.data?.error
      });
    }
  }, [response, error, navigate]);

  useEffect(() => {
    fetchOnboardDetails();
    handleFormChange("fullname",[]);
  }, []);

  const initData: FullnameFormData = {
    firstName: onboardData?.first_name ?? "",
    lastName: onboardData?.last_name ?? ""
  };
  if (loadingOnboard) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <FullnameUI
        initData={initData}
        submit={(data) => {
          handleSubmit(data);
        }}
        loading={requestStatus?.isPending}
      />
    </>
  );
};

export { Fullname };
