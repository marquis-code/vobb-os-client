import { fireEvent, render, screen } from "@testing-library/react";
import selectEvent from "react-select-event";
import { MemberProfileContext } from "context";
import { MemberProfileBody } from "modules/organization/members/components/memberProfileBody";
import { MemberProfileHeader } from "modules/organization/members/components/memberProfileHeader";
import { MemberProfileTabs } from "modules/organization/members/components/memberProfileTabs";
import { MemberProfileActivity } from "pages/organization/members/memberActivity";
import { MemberProfileClients } from "pages/organization/members/memberClients";
import { MemberProfileComments } from "pages/organization/members/memberComments";
import { MemberProfileDetails } from "pages/organization/members/memberDetails";
import { MemberProfileEmails } from "pages/organization/members/memberEmails";
import { MemberProfileFiles } from "pages/organization/members/memberFiles";
import { MemberProfileNotes } from "pages/organization/members/memberNotes";
import { MemberProfileTasks } from "pages/organization/members/memberTasks";
import { BrowserRouter } from "react-router-dom";

vi.mock("api", async () => {
  const originalModule = await vi.importActual<any>("api");

  return {
    ...originalModule,
    fetchMemberProfileService: vi.fn()
  };
});

vi.mock("@radix-ui/react-icons", async () => {
  const originalModule = await vi.importActual<any>("@radix-ui/react-icons");

  return {
    ...originalModule,
    EnvelopeClosedIcon: () => <div>EnvelopeClosedIcon</div>,
    FileTextIcon: () => <div>FileTextIcon</div>,
    PersonIcon: () => <div>PersonIcon</div>
  };
});

vi.mock("assets", async () => {
  const originalModule = await vi.importActual<any>("assets");

  return {
    ...originalModule,
    CheckSquareIcon: () => <div>CheckSquareIcon</div>,
    FolderIcon: () => <div>FolderIcon</div>,
    LineChartUpIcon: () => <div>LineChartUpIcon</div>,
    UserCircleIcon: () => <div>UserCircleIcon</div>,
    MessageChatSquareIcon: () => <div>MessageChatSquareIcon</div>
  };
});

const mockMemberProfile = {
  avatar: "avatar_url",
  initials: "JD",
  fullName: "John Doe",
  email: "john.doe@example.com",
  jobTitle: "Software Engineer",
  role: "Admin",
  status: "Active",
  timeZone: "",
  phoneNumber: "123-456-7890",
  dateFormat: "DD/MM/YYYY",
  syslanguage: "English",
  pendingEmail: null,
  fluentLanguages: [],
  userAttributes: []
};
const mockHandleMainTabChange = vi.fn();
const mockHandleUpdateSubTab = vi.fn();
const mockHandleFetchProfile = vi.fn();

const renderComponent = (mainTab = "activity", subTab = "details") => {
  return render(
    <BrowserRouter>
      <MemberProfileHeader
        memberProfile={mockMemberProfile}
        loading={false}
        handleSuspension={vi.fn()}
        handleChangeRole={vi.fn()}
        handleChangeBranch={vi.fn()}
        handleChangeTeam={vi.fn()}
        handleComposeEmail={vi.fn()}
      />
      <MemberProfileContext.Provider value={{ subTab, handleUpdateSubTab: mockHandleUpdateSubTab }}>
        <MemberProfileTabs handleMainTabChange={mockHandleMainTabChange} mainTab={mainTab} />
      </MemberProfileContext.Provider>
      <MemberProfileBody
        children={
          mainTab === "activity" ? (
            <MemberProfileActivity />
          ) : mainTab === "emails" ? (
            <MemberProfileEmails />
          ) : mainTab === "file" ? (
            <MemberProfileFiles />
          ) : mainTab === "tasks" ? (
            <MemberProfileTasks />
          ) : mainTab === "notes" ? (
            <MemberProfileNotes />
          ) : mainTab === "clients" ? (
            <MemberProfileClients />
          ) : (
            ""
          )
        }
        subSection={
          subTab === "comments" ? (
            <MemberProfileComments />
          ) : (
            <MemberProfileDetails profile={mockMemberProfile} callback={mockHandleFetchProfile} />
          )
        }
      />{" "}
    </BrowserRouter>
  );
};

describe("Member Page Integration", () => {
  it("renders member profile header correctly", () => {
    renderComponent();
    const memberName = screen.getByText("John Doe");
    expect(memberName).toBeInTheDocument();

    const email = screen.getByText("john.doe@example.com");
    expect(email).toBeInTheDocument();

    const jobTitle = screen.getByText("Software Engineer");
    expect(jobTitle).toBeInTheDocument();

    const role = screen.getByText("Admin");
    expect(role).toBeInTheDocument();
  });

  it("test activity main tab change", () => {
    renderComponent();

    const activityTab = screen.getByText("Activity");
    fireEvent.click(activityTab);
    expect(mockHandleMainTabChange).toHaveBeenCalled();
    expect(screen.getByText("MemberprofileActivity")).toBeInTheDocument();
  });

  it("test Emails main tab change", () => {
    renderComponent();

    const emailsTab = screen.getByText("Emails");
    fireEvent.click(emailsTab);
    expect(mockHandleMainTabChange).toHaveBeenCalled();
  });

  it("test Assigned Clients main tab change", () => {
    renderComponent();

    const assignedClientsTab = screen.getByText("Assigned Clients");
    fireEvent.click(assignedClientsTab);
    expect(mockHandleMainTabChange).toHaveBeenCalled();
  });

  it("test Tasks main tab change", () => {
    renderComponent();

    const tasksTab = screen.getByText("Tasks");
    fireEvent.click(tasksTab);
    expect(mockHandleMainTabChange).toHaveBeenCalled();
  });

  it("test Notes main tab change", () => {
    renderComponent();

    const notesTab = screen.getByText("Notes");
    fireEvent.click(notesTab);
    expect(mockHandleMainTabChange).toHaveBeenCalled();
  });

  it("test Files main tab change", () => {
    renderComponent();

    const filesTab = screen.getByText("Files");
    fireEvent.click(filesTab);
    expect(mockHandleMainTabChange).toHaveBeenCalled();
  });

  it("test Comments subTab change", () => {
    renderComponent();

    const commentsTab = screen.getByText("Comments");
    fireEvent.click(commentsTab);
    expect(mockHandleUpdateSubTab).toHaveBeenCalled();
  });

  it("renders the Member Details component on subTab change", () => {
    renderComponent();

    const detailsTab = screen.getByText("Details");
    fireEvent.click(detailsTab);
    expect(mockHandleUpdateSubTab).toHaveBeenCalled();

    expect(screen.getByTestId("member-details")).toBeInTheDocument();
    expect(screen.getByText("Member Details")).toBeInTheDocument();
  });

  it("pre-fills input fields with profile data", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/Set first name/i)).toHaveValue("John");
    expect(screen.getByPlaceholderText(/Set last name/i)).toHaveValue("Doe");
    expect(screen.getByPlaceholderText(/Set email address/i)).toHaveValue("john.doe@example.com");
    expect(screen.getByPlaceholderText(/your Phone number/i)).toHaveValue("+1 (234) 567-890");
  });

  it("allows entering first name", () => {
    renderComponent();

    const firstNameInput = screen.getByPlaceholderText(/Set first name/i);
    fireEvent.change(firstNameInput, { target: { value: "Jane" } });
    expect(firstNameInput).toHaveValue("Jane");
  });

  it("allows entering last name", () => {
    renderComponent();

    const lastNameInput = screen.getByPlaceholderText(/Set last name/i);
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    expect(lastNameInput).toHaveValue("Doe");
  });

  it("allows entering email address", () => {
    renderComponent();

    const emailInput = screen.getByPlaceholderText(/Set email address/i);
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(emailInput).toHaveValue("john.doe@example.com");
  });

  it("allows entering phone number", () => {
    renderComponent();

    const phoneInput = screen.getByPlaceholderText(/your Phone number/i);
    fireEvent.change(phoneInput, { target: { value: "123-456-7890" } });
    expect(phoneInput).toHaveValue("+1 (234) 567-890");
  });

  it("allows selecting a system language", async () => {
    renderComponent();

    const systemLanguageSelect = screen.getAllByRole("combobox")[0];
    await selectEvent.select(systemLanguageSelect, ["English"]);
  });

  it("allows selecting a timezone", async () => {
    renderComponent();

    const timezoneSelect = screen.getAllByRole("combobox")[1];
    await selectEvent.select(timezoneSelect, ["Africa/Lagos (GMT+01:00)"]);
  });

  it("allows selecting a date format", async () => {
    renderComponent();

    const dateFormatSelect = screen.getAllByRole("combobox")[2];
    await selectEvent.select(dateFormatSelect, ["DD/MM/YYYY"]);
  });
});
