import {
  ActivityCard,
  ActivityCardProps,
  Pagination,
  SettingsPageTitle,
  SortBy,
  DateFilter,
  SortOrderType
} from "components";
import { accountActivityMockData, cn } from "lib";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import { optionType } from "types";

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

const AccountActivityUI = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [sortBy, setSortBy] = useState<optionType | undefined>(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState<SortOrderType | undefined>(undefined);

  const activityList: ActivityCardProps[] = accountActivityMockData.map(
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
        <div className="flex gap-2">
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
              handleChange: setSortOrder
            }}
          />
          <DateFilter showPreset value={date} handleChange={setDate} />
        </div>
        {activityList.map((item, index) => (
          <ActivityCard {...item} key={`${index}_${item.date}`} />
        ))}
        <Pagination
          handleChange={console.log}
          handlePageLimit={console.log}
          totalCount={16}
          pageLimit={20}
          totalPages={1}
          currentPage={1}
        />
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
  | "added_2fa"
  | "removed_2fa"
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
            {metadata?.teamName}
          </Link>
        </>
      );
      break;
    case "updated_profile":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} updated your profile: {metadata.fields}
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
          <span className="font-semibold">{metadata.oldEmail}</span> to{" "}
          <span className="font-semibold">{metadata.newEmail}</span>
        </>
      );
      break;
    case "verified_email":
      message = (
        <>
          Your new email <span className="font-semibold">{metadata.email}</span> was
          verified!
        </>
      );
      break;
    case "added_google_auth":
      message = <>You added google authentication</>;
      break;
    case "removed_google_auth":
      message = <>You disconnected google authentication</>;
      break;
    case "added_2fa":
      message = <>You added two-factor authentication</>;
      break;
    case "removed_2fa":
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
