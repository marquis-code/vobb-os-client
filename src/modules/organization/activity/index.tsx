import {
  ActivityCard,
  ActivityCardProps,
  DateFilter,
  Pagination,
  SettingsPageTitle,
  SortBy,
  SortOrderType
} from "components";
import { orgActivityMockData } from "lib";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import { optionType } from "types";

const sortOptions: optionType[] = [
  {
    label: "Date",
    value: "date"
  }
];

const OrgActivityUI = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [sortBy, setSortBy] = useState<optionType | undefined>(sortOptions[0]);
  const [sortOrder, setSortOrder] = useState<SortOrderType | undefined>(undefined);

  const activityList: ActivityCardProps[] = orgActivityMockData.map(
    ({ date, time, action, metadata, initiator }) => ({
      time,
      date,
      message: getMessage({ action, metadata, initiator }),
      isFirstAction: action === "created"
    })
  );

  return (
    <>
      <SettingsPageTitle
        title="Organization Activity"
        description={"Monitor your organization activities over time"}
        className="max-w-none"
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

type orgActions =
  | "created"
  | "updated_profile"
  | "added_team"
  | "added_branch"
  | "removed_team"
  | "removed_branch"
  | "added_member_attribute"
  | "added_client_attribute"
  | "disabled_client_attribute"
  | "new_bank_account"
  | "removed_bank_account"
  | "updated_branding";

type initiator = { name: string; id: string } | "self";

export interface OrgActivityData {
  action: orgActions;
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
  action: orgActions;
  metadata: any;
  initiator: initiator;
}) => {
  let message: string | React.ReactNode = "";
  switch (action) {
    case "created":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} created a Vobb workspace for{" "}
          {metadata.organization}
        </>
      );
      break;
    case "added_branch":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new branch{" "}
          <span className="font-semibold">{metadata?.branchName}</span>
        </>
      );
      break;
    case "added_team":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new team{" "}
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
          {initiator === "self" ? "You" : initiator.name} updated the organization profile:{" "}
          <span className="font-semibold">{metadata.fields}</span>
        </>
      );
      break;
    case "removed_branch":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} removed the branch{" "}
          <span className="font-semibold">{metadata?.branchName}</span>
        </>
      );
      break;
    case "removed_team":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} removed the team{" "}
          <span className="font-semibold">{metadata?.teamName}</span>
        </>
      );
      break;
    case "added_member_attribute":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new attribute for team member
          profiles: <span className="font-semibold">{metadata?.attribute}</span>
        </>
      );
      break;
    case "added_client_attribute":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new attribute for client profiles:{" "}
          <span className="font-semibold">{metadata?.attribute}</span>
        </>
      );
      break;
    case "disabled_client_attribute":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} disabled a client attribute:{" "}
          <span className="font-semibold">{metadata?.attribute}</span>
        </>
      );
      break;
    case "new_bank_account":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new bank account:{" "}
          <span className="font-semibold">{metadata?.currency}</span>
        </>
      );
      break;
    case "removed_bank_account":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} remove a bank account:{" "}
          <span className="font-semibold">{metadata?.currency}</span>
        </>
      );
      break;
    case "updated_branding":
      message = (
        <>{initiator === "self" ? "You" : initiator.name} updated your organization's branding</>
      );
      break;
    default:
      message = "Unidentified action";
      break;
  }
  return message;
};

export { OrgActivityUI };
