import {
  changeMemberEmailService,
  editMemberAttributeService,
  editMemberDetailsService
} from "api";
import { toast } from "components";
import { useApiRequest, useFetchOrgAttributes } from "hooks";
import { MemberProfileDetailsUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MemberProfileProps, updatePropertiesRequestBody } from "types";

interface MemberProfileDetailsProps {
  profile: MemberProfileProps;
  callback: () => void;
}

const MemberProfileDetails: React.FC<MemberProfileDetailsProps> = ({ profile, callback }) => {
  const { id } = useParams();

  const [orgAttrQueryParams, setOrgAttrQueryParam] = useState({ page: 1, limit: 20 });
  const { page, limit } = orgAttrQueryParams;
  const { fetchOrgProperties, orgProperties, loading: loadingCustom } = useFetchOrgAttributes();

  const { run: runChangeEmail, data: emailResponse, error: emailError } = useApiRequest({});
  const { run: runEditDefaultAttr, data: defaultResponse, error: defaultError } = useApiRequest({});
  const { run: runEditCustomAttr, data: customResponse, error: customError } = useApiRequest({});

  const handleMemberDetails = async (data: { name: string; value; orgId: string }) => {
    const { name, value, orgId } = data;
    const type = name.split("_")[0];
    const customAttr = name.split("_")[1];

    const isEmail = name === "email";
    const isDefaultAttr = !customAttr && !isEmail;
    const isCustomAttr = customAttr && !isEmail;

    //default attributes
    let defaultAttrBody = new FormData();
    switch (name) {
      case "firstName":
        defaultAttrBody.append("first_name", value);
        break;
      case "lastName":
        defaultAttrBody.append("last_name", value);
        break;
      case "phoneNumber":
        defaultAttrBody.append("phone_number", value.replace(/\D/g, ""));

        break;
      case "jobTitle":
        defaultAttrBody.append("title", value);
        break;
      case "sysLanguage":
        defaultAttrBody.append("language", value.value);
        break;
      case "timeZone":
        defaultAttrBody.append("timezone", value.value);
        break;
      case "dateFormat":
        defaultAttrBody.append("date_format", value.value);
        break;
      case "languages":
        if (value.length) {
          value.forEach((language, index) => {
            defaultAttrBody.append(`fluent_languages[${index}]`, language.value);
          });
        }
        break;
      case "avatar":
        defaultAttrBody.append("avatar", value);
        break;
    }

    //custom attributes
    const body =
      type === "phone-number"
        ? [value.replace(/\D/g, "")]
        : type === "country"
        ? [value.value]
        : [value];

    const customAttrBody: updatePropertiesRequestBody = {
      attribute: orgId ?? customAttr,
      type,
      data: body
    };

    if (id) {
      isEmail && runChangeEmail(changeMemberEmailService(id, { email: value }));
      isDefaultAttr && runEditDefaultAttr(editMemberDetailsService(id, defaultAttrBody));
      isCustomAttr && runEditCustomAttr(editMemberAttributeService(id, customAttrBody));
    }
  };

  useMemo(() => {
    if (emailResponse?.status === 200) {
      toast({
        description: emailResponse?.data?.message
      });
      callback();
    } else if (emailError) {
      toast({
        variant: "destructive",
        description: emailError?.response?.data?.error
      });
    }
  }, [emailResponse, emailError]);

  useMemo(() => {
    if (defaultResponse?.status === 200) {
      toast({
        description: defaultResponse?.data?.message
      });
      callback();
    } else if (defaultError) {
      toast({
        variant: "destructive",
        description: defaultError?.response?.data?.error
      });
    }
  }, [defaultResponse, defaultError]);

  useMemo(() => {
    if (customResponse?.status === 200) {
      toast({
        description: customResponse?.data?.message
      });
      callback();
    } else if (customError) {
      toast({
        variant: "destructive",
        description: customError?.response?.data?.error
      });
    }
  }, [customResponse, customError]);

  useEffect(() => {
    fetchOrgProperties({ page, limit });
  }, [orgAttrQueryParams]);

  const customMemberAttr = profile?.userAttributes?.map((item) => ({
    id: item.attribute[0]?._id,
    attribute: item.attribute[0]?.attribute,
    values: item.data,
    label: item.attribute[0]?.label,
    type: item.attribute[0]?.type
  }));

  return (
    <>
      <MemberProfileDetailsUI
        profile={profile}
        customMemberAttr={customMemberAttr}
        orgAttributes={orgProperties}
        submit={handleMemberDetails}
        loadingCustom={loadingCustom}
      />
    </>
  );
};

export { MemberProfileDetails };
