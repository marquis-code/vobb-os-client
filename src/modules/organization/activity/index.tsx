import {
  ActivityCard,
  ActivityCardProps,
  DateFilter,
  LoadingSpinner,
  Pagination,
  SettingsPageTitle,
  SortBy
} from "components";
import { QueryParamProps } from "pages";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Link } from "react-router-dom";
import { MetaDataProps, optionType } from "types";

const sortOptions: optionType[] = [
  {
    label: "Date",
    value: "date"
  }
];

interface OrgActivityProps {
  orgActivities: OrgActivityData[];
  metaData: MetaDataProps;
  handleFilter: (param: string, value: string | number) => void;
  queryParams: QueryParamProps;
  loading: boolean;
}

const OrgActivityUI: React.FC<OrgActivityProps> = ({
  orgActivities,
  metaData,
  handleFilter,
  queryParams,
  loading
}) => {
  const { order: sortOrder, startDate, endDate } = queryParams;
  const { currentPage, totalCount, totalPages, pageLimit } = metaData;

  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [sortBy, setSortBy] = useState<optionType | undefined>(sortOptions[0]);

  const activityList: ActivityCardProps[] = orgActivities?.map(
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
          <LoadingSpinner />
        ) : !activityList.length ? (
          <p>No Organisation activities for this time.</p>
        ) : (
          <>
            {activityList.map((item, index) => (
              <ActivityCard {...item} key={`${index}_${item.date}`} />
            ))}
            <Pagination
              handleChange={(val) => handleFilter("page", val)}
              handlePageLimit={(val) => handleFilter("limit", val)}
              totalCount={totalCount}
              pageLimit={pageLimit}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </>
        )}
      </section>
    </>
  );
};

type orgActions =
  | "created"
  | "update_org_profile"
  | "create_org_team"
  | "create_org_branch"
  | "delete_org_team"
  | "delete_org_branch"
  | "create_member_attribute"
  | "create_client_attribute"
  | "disabled_client_attribute"
  | "new_bank_account"
  | "removed_bank_account"
  | "update_branding";

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
    case "create_org_branch":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new branch{" "}
          <span className="font-semibold">{metadata?.branch}</span>
        </>
      );
      break;
    case "create_org_team":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new team{" "}
          <Link
            target="_blank"
            to={""}
            className="text-vobb-primary-70 hover:underline cursor-pointer">
            {metadata?.team?.name}
          </Link>
        </>
      );
      break;
    case "update_org_profile":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} updated the organization profile:{" "}
          <span className="font-semibold">
            {Array.isArray(metadata?.modified_fields) && metadata.modified_fields.length > 0
              ? metadata.modified_fields.join(", ")
              : "no fields were modified"}
          </span>
        </>
      );
      break;
    case "delete_org_branch":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} removed the branch{" "}
          <span className="font-semibold">{metadata?.branch?.name}</span>
        </>
      );
      break;
    case "delete_org_team":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} removed the team{" "}
          <span className="font-semibold">{metadata?.team?.name}</span>
        </>
      );
      break;
    case "create_member_attribute":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new attribute for team member
          profiles: <span className="font-semibold">{metadata?.attribute?.label}</span>
        </>
      );
      break;
    case "create_client_attribute":
      message = (
        <>
          {initiator === "self" ? "You" : initiator.name} added a new attribute for client profiles:{" "}
          <span className="font-semibold">{metadata?.attribute?.label}</span>
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
    case "update_branding":
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
