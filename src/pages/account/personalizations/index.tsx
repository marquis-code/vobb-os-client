import { personalAccountUpdateService } from "api";
import { toast } from "components";
import { useApiRequest, useFetchUser } from "hooks";
import { AccountPersonalizationsUI } from "modules";
import { useMemo } from "react";

const AccountPersonalizations = () => {
  const { fetchUserDetails } = useFetchUser();
  const {
    run: runSystemLanguage,
    data: systemLangResponse,
    error: systemLangError,
    requestStatus: systemLangStatus
  } = useApiRequest({});

  const {
    run: runPreferredsLangs,
    data: preferredLangsResponse,
    error: preferredLangsError,
    requestStatus: preferredLangsStatus
  } = useApiRequest({});

  const {
    run: runDateFormat,
    data: dateFormatResponse,
    error: dateFormatError,
    requestStatus: dateFormatStatus
  } = useApiRequest({});

  const {
    run: runTimezone,
    data: timezoneResponse,
    error: timezoneError,
    requestStatus: timezoneStatus
  } = useApiRequest({});

  const handleChangeSystemLanguage = (formData: FormData) => {
    runSystemLanguage(personalAccountUpdateService(formData));
  };

  const handleSetPreferredLangs = (formData: FormData) => {
    runPreferredsLangs(personalAccountUpdateService(formData));
  };

  const handleSetDateFormat = (formData: FormData) => {
    runDateFormat(personalAccountUpdateService(formData));
  };

  const handleSetTimezone = (formData: FormData) => {
    runTimezone(personalAccountUpdateService(formData));
  };
  useMemo(() => {
    if (systemLangResponse?.status === 200) {
      toast({
        description: systemLangResponse?.data?.message
      });
      fetchUserDetails();
    } else if (systemLangError) {
      toast({
        variant: "destructive",
        description: systemLangError?.response?.data?.error
      });
    }
  }, [systemLangResponse, systemLangError]);

  useMemo(() => {
    if (preferredLangsResponse?.status === 200) {
      toast({
        description: preferredLangsResponse?.data?.message
      });
      fetchUserDetails();
    } else if (preferredLangsError) {
      toast({
        variant: "destructive",
        description: preferredLangsError?.response?.data?.error
      });
    }
  }, [preferredLangsResponse, preferredLangsError]);

  useMemo(() => {
    if (dateFormatResponse?.status === 200) {
      toast({
        description: dateFormatResponse?.data?.message
      });
      fetchUserDetails();
    } else if (dateFormatError) {
      toast({
        variant: "destructive",
        description: dateFormatError?.response?.data?.error
      });
    }
  }, [dateFormatResponse, dateFormatError]);

  useMemo(() => {
    if (timezoneResponse?.status === 200) {
      toast({
        description: timezoneResponse?.data?.message
      });
      fetchUserDetails();
    } else if (timezoneError) {
      toast({
        variant: "destructive",
        description: timezoneError?.response?.data?.error
      });
    }
  }, [timezoneResponse, timezoneError]);

  return (
    <>
      <AccountPersonalizationsUI
        systemLanguage={{
          submit: handleChangeSystemLanguage,
          loadingSytemLang: systemLangStatus.isPending
        }}
        yourLanguages={{
          submit: handleSetPreferredLangs,
          loadingPreferredLang: preferredLangsStatus.isPending
        }}
        dateFormat={{
          submit: handleSetDateFormat,
          loadingDateFormat: dateFormatStatus.isPending
        }}
        timeZone={{
          submit: handleSetTimezone,
          loadingTimezone: timezoneStatus.isPending
        }}
      />
    </>
  );
};

export { AccountPersonalizations };
