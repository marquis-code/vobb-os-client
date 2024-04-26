import { patchRequest, resendVerifyEmailURL, verifyEmailURL } from "api";
import { useApiRequest } from "hooks";
import { useCallback } from "react";

const useVerifyEmailService = () => {
  const { run, data: response, error: apiError, requestStatus } = useApiRequest({});

  const verifyEmailService = useCallback(
    async (data: { token: number }) => {
      await run(
        patchRequest({
          url: verifyEmailURL,
          data: data
        })
      );
    },
    [run]
  );

  const resendVerify = useCallback(
    async (data: { email: string }) => {
      await run(
        patchRequest({
          url: resendVerifyEmailURL,
          data: data
        })
      );
    },
    [run]
  );

  return {
    verifyEmail: verifyEmailService,
    resendVerify: resendVerify,
    response,
    apiError,
    loading: requestStatus.isPending
  };
};

export { useVerifyEmailService };
