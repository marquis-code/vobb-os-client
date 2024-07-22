import { createContext, useState, useContext, ReactNode } from "react";
import {
  AttributesDataProps,
  BranchesDataProps,
  BranchMembersProps,
  BranchTeamsProps,
  OrganisationProfileProps,
  UserProfileProps
} from "types";

interface UserContextProps {
  userDetails: UserProfileProps | null;
  orgDetails: OrganisationProfileProps | null;
  orgBranches: BranchesDataProps | null;
  orgMemberAttributes: AttributesDataProps | null;
  branchMembers: BranchMembersProps | null;
  branchTeams: BranchTeamsProps | null;
  clientAttributes: AttributesDataProps | null;
  handleUpdateUser: (userDetails: UserProfileProps | null) => void;
  handleUpdateOrg: (orgDetails: OrganisationProfileProps | null) => void;
  handleUpdateBranches: (orgBranches: BranchesDataProps | null) => void;
  handleUpdateMemberAttributes: (orgMemberAttributes: AttributesDataProps | null) => void;
  handleUpdateBranchMembers: (branchMembers: BranchMembersProps | null) => void;
  handleUpdateBranchTeams: (branchTeams: BranchTeamsProps | null) => void;
  handleUpdateClientAttributes: (clientAttributes: AttributesDataProps | null) => void;
}

const UserDetailsContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserDetailsProvider");
  }
  return context;
};

export const UserDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserProfileProps | null>(null);
  const [orgDetails, setOrgDetails] = useState<OrganisationProfileProps | null>(null);
  const [orgBranches, setOrgBranches] = useState<BranchesDataProps | null>(null);
  const [orgMemberAttributes, setOrgAttributes] = useState<AttributesDataProps | null>(null);
  const [branchMembers, setBranchMembers] = useState<BranchMembersProps | null>(null);
  const [branchTeams, setBranchTeams] = useState<BranchTeamsProps | null>(null);
  const [clientAttributes, setClientAttributes] = useState<AttributesDataProps | null>(null);

  const handleUpdateUser = (userDetails: UserProfileProps | null) => {
    setUserDetails(userDetails);
  };

  const handleUpdateOrg = (orgDetails: OrganisationProfileProps | null) => {
    setOrgDetails(orgDetails);
  };

  const handleUpdateBranches = (orgBranches: BranchesDataProps | null) => {
    setOrgBranches(orgBranches);
  };

  const handleUpdateMemberAttributes = (orgMemberAttributes: AttributesDataProps | null) => {
    setOrgAttributes(orgMemberAttributes);
  };

  const handleUpdateBranchMembers = (branchMembers: BranchMembersProps | null) => {
    setBranchMembers(branchMembers);
  };
  const handleUpdateBranchTeams = (branchTeams: BranchTeamsProps | null) => {
    setBranchTeams(branchTeams);
  };
  const handleUpdateClientAttributes = (clientAttributes: AttributesDataProps | null) => {
    setClientAttributes(clientAttributes);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        userDetails,
        orgDetails,
        orgBranches,
        orgMemberAttributes,
        branchMembers,
        branchTeams,
        clientAttributes,
        handleUpdateUser,
        handleUpdateOrg,
        handleUpdateBranches,
        handleUpdateMemberAttributes,
        handleUpdateBranchMembers,
        handleUpdateBranchTeams,
        handleUpdateClientAttributes
      }}>
      {children}
    </UserDetailsContext.Provider>
  );
};
