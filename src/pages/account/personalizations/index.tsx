import { personalAccountUpdateService } from "api";
import { toast } from "components";
import { useApiRequest } from "hooks";
import { AccountPersonalizationsUI } from "modules";
import { useMemo } from "react";

const AccountPersonalizations = () => {
  const {
    run: runSystemLanguage,
    data: systemLangResponse,
    error: systemLangError,
    requestStatus: systemLangStatus
  } = useApiRequest({});

  const handleChangeSystemLanguage = (formData: FormData) => {
    runSystemLanguage(personalAccountUpdateService(formData));
  };

  useMemo(() => {
    if (systemLangResponse?.status === 200) {
      toast({
        description: systemLangResponse?.data?.message
      });
    } else if (systemLangError) {
      toast({
        variant: "destructive",
        description: systemLangError?.systemLangResponse?.data?.error
      });
    }
  }, [systemLangResponse, systemLangError]);

  return (
    <>
      <AccountPersonalizationsUI
        handleChangeSystemLanguage={handleChangeSystemLanguage}
        loadingSytemLang={systemLangStatus.isPending}
      />
    </>
  );
};

export { AccountPersonalizations };
