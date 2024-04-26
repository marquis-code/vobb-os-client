import { resendVerifyEmailService, verifyEmailService } from "api";
import { useApiRequest } from "hooks";
import { useCallback } from "react";

const useVerifyEmailService = () => {
  const { run, data: response, error: apiError, requestStatus } = useApiRequest({});

  const verifyEmail = useCallback(
    async (data: { token: number }) => {
      await run(verifyEmailService(data));
    },
    [run]
  );

  const resendVerify = useCallback(
    async (data: { email: string }) => {
      await run(resendVerifyEmailService(data));
    },
    [run]
  );

  return {
    verifyEmail: verifyEmail,
    resendVerify: resendVerify,
    response,
    apiError,
    loading: requestStatus.isPending
  };
};

export { useVerifyEmailService };
