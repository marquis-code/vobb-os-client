import { Button, Pagination } from "components";
import { ISOStringFormat, format } from "date-fns";
import { cn } from "lib";
import { MetaDataProps } from "pages";

interface LoginHistoryProps {
  loginHistory: any;
  historyMetaData: MetaDataProps;
  handleFetchLoginHistory: (page: number) => void;
}

const LoginHistory: React.FC<LoginHistoryProps> = ({
  loginHistory,
  historyMetaData,
  handleFetchLoginHistory
}) => {
  const { currentPage, totalCount, totalPages } = historyMetaData;
  const handleChangePage = (page: number) => {
    handleFetchLoginHistory(page); // Fetch login history for the new page
  };
  return (
    <>
      <section className="grid grid-cols-[1fr,2fr] gap-8 mb-12 max-w-[800px]">
        <div>
          <h2 className="text-[16px] font-semibold mb-2">Who logged in?</h2>
          <p className="text-xs">
            We’ll alert you via <b>account@gmail.com</b> if there is any unusual activity on your
            account
          </p>
        </div>
        <div className="">
          {loginHistory &&
            loginHistory?.map((item, index) => (
              <Device key={index} device={item} myIP="192.168.0.180" />
            ))}
          <Pagination
            hidePageLimit
            handleChange={handleChangePage}
            handlePageLimit={console.log}
            totalCount={totalCount}
            pageLimit={3}
            totalPages={totalPages}
            currentPage={currentPage}
            className="mt-8"
          />
        </div>
      </section>
    </>
  );
};

export interface DeviceData {
  location: string;
  date: string;
  time: string;
  isActive?: boolean;
  ip: string;
}

interface DeviceProps {
  device: DeviceData;
  myIP: string;
}

const Device: React.FC<DeviceProps> = ({ device, myIP }) => {
  const { time, location, isActive, date, ip: ipAddress } = device;
  return (
    <div className="flex items-center justify-between mb-4 pb-4 border-b border-vobb-neutral-20 text-sm">
      <div>
        <p className="mb-2 flex items-center gap-2">
          {ipAddress} {myIP === ipAddress ? "(You)" : ""}
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full",
              isActive ? "text-success-20 bg-success-0" : "text-error-20 bg-error-0"
            )}>
            {isActive ? "Active" : "Blacklisted"}
          </span>
        </p>
        <p className="text-xs text-vobb-neutral-70">
          {location} | {format(new Date(time), "MM/dd/yyyy")} at {format(new Date(time), "HH:mm")}
        </p>
      </div>
      {myIP !== ipAddress ? (
        <Button
          className={isActive ? "text-error-20" : "text-vobb-primary-70"}
          variant="ghost"
          onClick={console.log}>
          {isActive ? "Blacklist" : "Whitelist"}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export { LoginHistory };
