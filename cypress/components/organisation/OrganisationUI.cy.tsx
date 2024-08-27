import React from "react";
import { mount } from "cypress/react";
import { OrgActivityData, OrgActivityUI } from "../../../src/modules";

describe("OrgActivityUI Component Tests", () => {
  const orgActivities: OrgActivityData[] = [
    {
      action: "created",
      date: "2023-08-25",
      time: "12:00",
      metadata: { organization: "Vobb" },
      initiator: { name: "Admin", id: "1" }
    },
    {
      action: "create_org_team",
      date: "2023-08-26",
      time: "14:00",
      metadata: { team: { name: "Dev Team" } },
      initiator: "self"
    }
  ];

  const metaData = {
    currentPage: 1,
    totalCount: 2,
    totalPages: 1,
    pageLimit: 20
  };

  const handleFilter = cy.stub();
  const queryParams = {
    order: "asc",
    startDate: "2023-08-01",
    endDate: "2023-08-31"
  };

  it("renders the component with activities", () => {
    mount(
      <OrgActivityUI
        orgActivities={orgActivities}
        metaData={metaData}
        handleFilter={handleFilter}
        queryParams={queryParams}
        loading={false}
      />
    );

    // Check that the title and description are rendered
    cy.contains("Organization Activity").should("exist");
    cy.contains("Monitor your organization activities over time").should("exist");

    // Check that ActivityCards are rendered correctly
    cy.get('[data-cy="activity-card"]').should("have.length", 2);
    cy.contains("created a Vobb workspace").should("exist");
    cy.contains("added a new team Dev Team").should("exist");
  });

  it("displays a loading spinner when loading", () => {
    mount(
      <OrgActivityUI
        orgActivities={[]}
        metaData={metaData}
        handleFilter={handleFilter}
        queryParams={queryParams}
        loading={true}
      />
    );

    // Check that the LoadingSpinner is rendered
    cy.get('[data-cy="loading-spinner"]').should("exist");
  });

  it("displays no activities message when there are no activities", () => {
    mount(
      <OrgActivityUI
        orgActivities={[]}
        metaData={metaData}
        handleFilter={handleFilter}
        queryParams={queryParams}
        loading={false}
      />
    );

    // Check that the "No Organisation activities" message is displayed
    cy.contains("No Organisation activities for this time.").should("exist");
  });

  it("triggers filter handling on filter change", () => {
    mount(
      <OrgActivityUI
        orgActivities={orgActivities}
        metaData={metaData}
        handleFilter={handleFilter}
        queryParams={queryParams}
        loading={false}
      />
    );

    // Simulate a filter change
    cy.get("select").first().select("date");
    cy.wrap(handleFilter).should("have.been.called");
  });

  it("displays pagination controls", () => {
    mount(
      <OrgActivityUI
        orgActivities={orgActivities}
        metaData={metaData}
        handleFilter={handleFilter}
        queryParams={queryParams}
        loading={false}
      />
    );

    // Check that Pagination component is rendered
    cy.get('[data-cy="pagination"]').should("exist");
  });
});
