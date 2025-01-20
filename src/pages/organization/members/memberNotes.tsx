import { deleteANoteService, fetchMemberNotesService, updateVisibilityOfNoteService } from "api";
import { toast } from "components";
import { useApiRequest, useDebounce, useFetchOrgMembers } from "hooks";
import { MemberProfileNotesUI } from "modules";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { MemberNotesProps } from "types";
import { AddMemberNote } from "./addMemberNote";
import { EditMemberNote } from "./editMemberNote";
import { format } from "date-fns";

const MemberProfileNotes = ({ handleUpdateProfileTabLengths, memberProfile }) => {
  const { id: userId } = useParams();
  const {
    run: runFetchAllNotes,
    data: fetchAllNotesResponse,
    requestStatus: fetchAllNotesStatus
  } = useApiRequest({});

  const {
    run: runDeleteANote,
    data: deleteANoteResponse,
    error: deleteANoteError,
    requestStatus: deleteANoteStatus
  } = useApiRequest({});

  const {
    run: runUpdateVisibility,
    data: updateVisibilityResponse,
    error: updateVisibilityError,
    requestStatus: updateVisibilityStatus
  } = useApiRequest({});

  const [addNoteModal, setAddNoteModal] = useState(false);
  const [editNoteModal, setEditNoteModal] = useState({ id: "", show: false });

  const handleOpenAddNote = () => setAddNoteModal(true);
  const handleCloseAddNote = () => setAddNoteModal(false);

  const handleOpenEditNote = (id: string) => setEditNoteModal({ id, show: true });
  const handleCloseEditNote = () => setEditNoteModal({ id: "", show: false });

  const [noteQueryParams, setNoteQueryParams] = useState({
    page: 1,
    limit: 6,
    sort: undefined,
    visibility: undefined,
    start: "",
    end: ""
  });
  const handleUpdateParams = (param: string, value: string | number) => {
    setNoteQueryParams((prev) => ({ ...prev, [param]: value }));
  };

  //FEtch all notes
  const handleFetchAllNotes = () => {
    if (userId) runFetchAllNotes(fetchMemberNotesService(userId, noteQueryParams));
  };
  const memberNotes = useMemo<MemberNotesProps>(() => {
    if (fetchAllNotesResponse?.status === 200) {
      const data =
        fetchAllNotesResponse?.data?.data?.notes.map((note) => ({
          id: note._id,
          title: note.title,
          body: note.body,
          creator: note.creator
            ? {
                id: note.creator._id,
                avatar: note.creator.avatar,
                name: note.creator.name
              }
            : null,
          isPublic: note.is_public,
          createdAt: format(new Date(note.time), "do MMM, yyyy")
        })) ?? [];

      const metaData = {
        currentPage: fetchAllNotesResponse?.data?.data?.page ?? 1,
        totalPages: fetchAllNotesResponse?.data?.data?.total_pages,
        totalCount: fetchAllNotesResponse?.data?.data?.total_count,
        pageLimit: noteQueryParams.limit
      };

      return { data, metaData };
    }

    return {} as MemberNotesProps;
  }, [fetchAllNotesResponse, noteQueryParams]);

  //Delete a note
  const handleDeleteANote = (id: string) => {
    runDeleteANote(deleteANoteService(id));
  };
  useMemo(() => {
    if (deleteANoteResponse?.status === 201) {
      toast({
        description: deleteANoteResponse?.data?.message
      });
      handleFetchAllNotes();
    } else if (deleteANoteError) {
      toast({
        variant: "destructive",
        description: deleteANoteError?.response?.data?.error
      });
    }
  }, [deleteANoteResponse, deleteANoteError]);

  //Update visibility of a task
  const handleUpdateVisibility = (id: string, isPublic: boolean, allowedMembers) => {
    runUpdateVisibility(
      updateVisibilityOfNoteService(id, { is_public: isPublic, allowed_members: allowedMembers })
    );
  };
  useMemo(() => {
    if (updateVisibilityResponse?.status === 200) {
      toast({
        description: updateVisibilityResponse?.data?.message
      });
      handleFetchAllNotes();
    } else if (updateVisibilityError) {
      toast({
        variant: "destructive",
        description: updateVisibilityError?.response?.data?.error
      });
    }
  }, [updateVisibilityResponse, updateVisibilityError]);

  useEffect(() => {
    handleFetchAllNotes();
    handleUpdateProfileTabLengths("notes", memberNotes?.metaData?.totalCount);
  }, [noteQueryParams]);

  const [allMembersQueryParams, setAllMembersQueryParams] = useState({
    limit: 5,
    search: ""
  });
  const handleUpdateMembersQueryParams = (filter: string, value: string | number) => {
    setAllMembersQueryParams((prev) => ({ ...prev, [filter]: value }));
  };
  const { search } = allMembersQueryParams;
  const debouncedSearchTerm = useDebounce(search, 1000);

  const { fetchOrgMembers, orgMembersData, loading: loadingUsers } = useFetchOrgMembers({});

  const formattedMembers = orgMembersData?.membersArray
    .filter((member) => member.status === "active")
    .map((member) => ({
      avatar: member.avatar,
      label: member.name,
      value: member.id
    }));
  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      fetchOrgMembers({ search: debouncedSearchTerm });
    } else {
      fetchOrgMembers({});
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <MemberProfileNotesUI
        memberProfile={{ avatar: memberProfile.avatar, fullName: memberProfile.fullName }}
        handleOpenAddNote={handleOpenAddNote}
        handleOpenEditNote={handleOpenEditNote}
        allNotesFetch={{
          data: memberNotes,
          loading: fetchAllNotesStatus.isPending,
          params: noteQueryParams,
          handleUpdateParams
        }}
        deleteNote={{
          submit: handleDeleteANote,
          loading: deleteANoteStatus.isPending
        }}
        updateVisibility={{
          submit: handleUpdateVisibility,
          loading: updateVisibilityStatus.isPending
        }}
      />

      <AddMemberNote
        show={addNoteModal}
        close={handleCloseAddNote}
        callback={() => handleFetchAllNotes()}
        memberProfile={memberProfile}
        deleteNote={{
          submit: handleDeleteANote,
          loading: deleteANoteStatus.isPending
        }}
        updateVisibility={{
          submit: handleUpdateVisibility,
          loading: updateVisibilityStatus.isPending
        }}
        allUsers={{
          usersearchQuery: search,
          users: formattedMembers,
          loadingUsers,
          handleSearch: handleUpdateMembersQueryParams
        }}
      />

      <EditMemberNote
        id={editNoteModal.id}
        show={editNoteModal.show}
        close={handleCloseEditNote}
        memberProfile={memberProfile}
        deleteNote={{
          submit: handleDeleteANote,
          loading: deleteANoteStatus.isPending
        }}
        updateVisibility={{
          submit: handleUpdateVisibility,
          loading: updateVisibilityStatus.isPending
        }}
        allUsers={{
          usersearchQuery: search,
          users: formattedMembers,
          loadingUsers,
          handleSearch: handleUpdateMembersQueryParams
        }}
      />
    </>
  );
};

export { MemberProfileNotes };
