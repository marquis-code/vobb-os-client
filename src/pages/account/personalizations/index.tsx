import {
  fetchMemberPropertiesService,
  personalAccountUpdateService,
  updateOrgPropertiesService
} from "api";
import { toast } from "components";
import { useApiRequest, useFetchOrgAttributes, useFetchUser } from "hooks";
import { AccountPersonalizationsUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { MemberPropertiesData, optionType, updatePropertiesRequestBody } from "types";

const AccountPersonalizations = () => {
  const { fetchUserDetails } = useFetchUser();
  const { fetchOrgProperties, orgProperties } = useFetchOrgAttributes();

  const [orgAttrQueryParams, setOrgAttrQueryParam] = useState({ page: 1, limit: 20 });
  const { page, limit } = orgAttrQueryParams;

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

  const { run: runFetchMemberProps, data: memberPropsResponse } = useApiRequest({});

  const {
    run: runUpdateProperties,
    data: updatePropertiesResponse,
    error: updatePropertiesError
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

  const fetchMemberProperties = () => {
    runFetchMemberProps(fetchMemberPropertiesService());
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

  useMemo(() => {
    if (updatePropertiesResponse?.status === 200) {
      toast({
        description: updatePropertiesResponse?.data?.message
      });
      fetchMemberProperties();
    } else if (updatePropertiesError) {
      toast({
        variant: "destructive",
        description: updatePropertiesError?.response?.data?.error
      });
    }
  }, [updatePropertiesResponse, updatePropertiesError]);

  //already set member's properties.(used to determine update or create)
  const memberProperties = useMemo<MemberPropertiesData[]>(() => {
    if (memberPropsResponse?.status === 200) {
      const propertiesArray = memberPropsResponse?.data?.data?.attributes.map((item) => ({
        id: item._id,
        attribute: item.attribute,
        values: item.data,
        title: item.label,
        type: item.type
      }));

      return propertiesArray;
    }

    return [];
  }, [memberPropsResponse]);

  //Create or update the account's (member's) property.
  const handleMemberProperties = (data: {
    name: string;
    value: optionType | string;
    orgId: string;
  }) => {
    const { name, value, orgId } = data;
    const type = name.split("_")[0];
    const attribute = name.split("_")[1];

    const body =
      type === "phone-number"
        ? [(value as string).replace(/\D/g, "")]
        : type === "country"
        ? [(value as optionType).value]
        : type === "multiple-choice"
        ? [(value as optionType).value]
        : [value as string];

    const requestBody: updatePropertiesRequestBody = {
      attribute: orgId ?? attribute,
      type,
      data: body
    };

    runUpdateProperties(updateOrgPropertiesService(requestBody));
  };

  useEffect(() => {
    fetchOrgProperties({ page, limit });
  }, [orgAttrQueryParams]);

  useEffect(() => {
    fetchMemberProperties();
  }, []);

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
        orgProperties={{
          orgProperties,
          memberProperties,
          submit: handleMemberProperties
        }}
      />
    </>
  );
};

export { AccountPersonalizations };
