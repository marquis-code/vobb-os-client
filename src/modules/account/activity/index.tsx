import {
  ActivityCard,
  ActivityCardProps,
  Pagination,
  SettingsPageTitle,
  SortBy,
  DateFilter,
  LoadingSpinner
} from "components";
import { QueryParamProps } from "pages";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import { MetaDataProps, optionType } from "types";

// {
//   from: addDays(new Date(), -30),
//   to: new Date()
// }

const sortOptions: optionType[] = [
  {
    label: "Date",
    value: "date"
  }
];

interface AccountActivityProps {
  userActivities: AccountActivityData[];
  metaData: MetaDataProps;
  handleFilter: (param: string, value: string | number) => void;
  queryParams: QueryParamProps;
  loading: boolean;
}

const AccountActivityUI: React.FC<AccountActivityProps> = ({
  userActivities,
  metaData,
  handleFilter,
  queryParams,
  loading
}) => {
  const { order: sortOrder, startDate, endDate } = queryParams;
  const { currentPage, totalCount, totalPages, pageLimit = 20 } = metaData;

  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [sortBy, setSortBy] = useState<optionType | undefined>(sortOptions[0]);

  const activityList: ActivityCardProps[] = userActivities.map(
    ({ date, time, action, metadata, initiator }) => ({
      time,
      date,
      message: getMessage({ action, metadata, initiator }),
      isFirstAction: action === "joined_org"
    })
  );

  return (
    <>
      <SettingsPageTitle
        title="Account Activity"
        description={"Monitor your account activities over time"}
      />

      <section className="grid gap-4 max-w-[800px]">
        <div className="flex gap-2" data-cy="filter-div">
          <SortBy
            isClearable
            sort={{
              active: sortBy,
              items: sortOptions,
              handleChange: setSortBy
            }}
            order={{
              show: true,
              active: sortOrder,
              handleChange: (val) => handleFilter("order", val as string)
            }}
          />
          <DateFilter
            showPreset
            value={date}
            handleChange={(val) => {
              setDate(val);
              if (val) {
                handleFilter(
                  "startDate",
                  val.from ? val.from.toISOString().slice(0, 10) : startDate
                );
                handleFilter("endDate", val.to ? val.to.toISOString().slice(0, 10) : endDate);
              }
            }}
          />
        </div>
        {loading ? (
          <LoadingSpinner data-cy="loading-spinner" />
        ) : !activityList.length ? (
          <p>No Account activities for this time.</p>
        ) : (
          <>
            {activityList.map((item, index) => (
              <ActivityCard {...item} key={`${index}_${item.date}`} data-cy="activity-card" />
            ))}
            <Pagination
              handleChange={(val) => handleFilter("page", val)}
              handlePageLimit={(val) => handleFilter("limit", val)}
              totalCount={totalCount}
              pageLimit={pageLimit}
              totalPages={totalPages}
              currentPage={currentPage}
              data-cy="pagination"
            />
          </>
        )}
      </section>
    </>
  );
};

type accountActions =
  | "joined_org"
  | "joined_team"
  | "joined_branch"
  | "updated_profile"
  | "changed_email"
  | "verified_email"
  | "changed_password"
  | "added_google_auth"
  | "removed_google_auth"
  | "enabled_2fa"
  | "disabled_2fa"
  | "assigned_role"
  | "updated_role";

type initiator = { name: string; id: string } | "self";

export interface AccountActivityData {
  action: accountActions;
  date: string;
  time: string;
  metadata: any | undefined;
  initiator: initiator;
}

const getMessage = ({
  action,
  metadata,
  initiator
}: {
  action: accountActions;
  metadata: any;
  initiator: initiator;
}) => {
  let message: string | React.ReactNode = "";
  switch (action) {
    case "joined_org":
      message = "You joined the workspace";
      break;
    case "joined_branch":
      message = (
        <>
          Added to the branch <span className="font-semibold">{metadata?.branchName}</span>
        </>
      );
      break;
    case "joined_team":
      message = (
        <>
          Added to the team{" "}
          <Link
            target="_blank"
            to={""}
            className="text-vobb-primary-70 hover:underline cursor-pointer">
            {metadata?.team?.name}
          </Link>
        </>
      );
      break;
    case "updated_profile":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} updated your profile:{" "}
          {Array.isArray(metadata?.modified_fields) && metadata.modified_fields.length > 0
            ? metadata.modified_fields.join(", ")
            : "no fields were modified"}
        </>
      );
      break;
    case "changed_password":
      message = <>You changed your password</>;
      break;
    case "changed_email":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} changed your email from{" "}
          <span className="font-semibold">{metadata.old_email}</span> to{" "}
          <span className="font-semibold">{metadata.new_email}</span>
        </>
      );
      break;
    case "verified_email":
      message = (
        <>
          Your new email <span className="font-semibold">{metadata.email}</span> was verified!
        </>
      );
      break;
    case "added_google_auth":
      message = <>You added google authentication</>;
      break;
    case "removed_google_auth":
      message = <>You disconnected google authentication</>;
      break;
    case "enabled_2fa":
      message = <>You added two-factor authentication</>;
      break;
    case "disabled_2fa":
      message = <>You disabled two-factor authentication</>;
      break;
    case "assigned_role":
      message = (
        <>
          Assigned the role of <span className="font-semibold">{metadata.role}</span>
        </>
      );
      break;
    case "updated_role":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} updated your role from{" "}
          <span className="font-semibold">{metadata.oldRole}</span> to{" "}
          <span className="font-semibold">{metadata.newRole}</span>
        </>
      );
      break;
    default:
      message = "Unidentified action";
      break;
  }
  return message;
};

export { AccountActivityUI };
