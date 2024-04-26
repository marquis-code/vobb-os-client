// import { emailLoginService } from "api";
import { useApiRequest } from "hooks/useApiRequest";
import { useCallback } from "react";
interface loginEmailData {
  email: string;
  password: string;
  rememberMe: boolean;
}
// export const emailLoginService = (data: loginEmailData) => {
//   return patchRequest({
//     url: emailLoginURL(),
//     data: data
//   });
// };
const useLogin = () => {
  const { run, data: response, error: apiError, requestStatus } = useApiRequest({});

  //   const loginUser = useCallback(
  //     async (data: loginEmailData) => {
  //       await run(emailLoginService(data));
  //     },
  //     [run]
  //   );

  return {
    emailLogin: "loginUser",
    response,
    apiError,
    loading: requestStatus.isPending
  };
};

export { useLogin };
