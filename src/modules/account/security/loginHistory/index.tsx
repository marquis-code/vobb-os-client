import { Button, Pagination } from "components";
import { useUserContext } from "context";
import { format } from "date-fns";
import { cn } from "lib";
import { LoginHistoryDataProps, LoginHistoryDeviceProps } from "pages";
import { BlacklistProps } from "types";

interface LoginHistoryProps {
  loginHistoryData: LoginHistoryDataProps;
  handleFetchLoginHistory: (page: number) => void;
  handleBlacklist: (data: BlacklistProps) => void;
}

const LoginHistory: React.FC<LoginHistoryProps> = ({
  loginHistoryData,
  handleFetchLoginHistory,
  handleBlacklist
}) => {
  const { loginHistory, historyMetaData } = loginHistoryData;
  const { currentPage, totalCount, totalPages } = historyMetaData;
  const handleChangePage = (page: number) => {
    handleFetchLoginHistory(page);
  };
  const { userDetails } = useUserContext();
  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Who logged in?</h2>
          <p className="text-xs">
            We’ll alert you via <b>{userDetails?.email}</b> if there is any unusual activity on your
            account
          </p>
        </div>
        <div className="">
          {loginHistory &&
            loginHistory?.map((item, index) => (
              <Device
                key={index}
                device={item}
                myIP={loginHistory[0]?.ipAddress}
                handleBlacklist={handleBlacklist}
              />
            ))}
          <Pagination
            hidePageLimit
            handleChange={handleChangePage}
            handlePageLimit={console.log}
            totalCount={totalCount}
            pageLimit={8}
            totalPages={totalPages}
            currentPage={currentPage}
            className="mt-8"
          />
        </div>
      </section>
    </>
  );
};

interface DeviceProps {
  device: LoginHistoryDeviceProps;
  myIP: string;
  handleBlacklist: (data: BlacklistProps) => void;
}

const Device: React.FC<DeviceProps> = ({ device, myIP, handleBlacklist }) => {
  const { location, ipAddress, time, user, device: gadget, isBlacklisted } = device;
  return (
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-vobb-neutral-20 text-sm">
      <div>
        <p className="mb-2 flex items-center gap-2">
          {ipAddress} {myIP === ipAddress ? "(You)" : ""}
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              !isBlacklisted ? "text-success-20 bg-success-0" : "text-error-20 bg-error-0"
            )}>
            {!isBlacklisted ? "Active" : "Blacklisted"}
          </span>
        </p>
        <p className="text-xs text-vobb-neutral-70">
          {location} |
          {/* {format(new Date(time), "dd/MM/yyyy")} at {format(new Date(time), "HH:mm")} */}
        </p>
      </div>
      {myIP !== ipAddress ? (
        <Button
          className={!isBlacklisted ? "text-error-20" : "text-vobb-primary-70"}
          variant="ghost"
          onClick={() => handleBlacklist({ ipAddress, status: !isBlacklisted })}>
          {!isBlacklisted ? "Blacklist" : "Whitelist"}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export { LoginHistory };
