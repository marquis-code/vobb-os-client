import { createMemberNoteService, editNoteService, fetchAMemberNoteService } from "api";
import { EditMemberNoteModal, toast } from "components";
import { format } from "date-fns";
import { useApiRequest } from "hooks";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  ExistingUserTypes,
  HandlerActionProps,
  MemberNotesData,
  MemberProfileProps,
  ModalProps
} from "types";

interface EditMemberNoteProps extends ModalProps {
  id: string;
  memberProfile: MemberProfileProps;
  deleteNote: HandlerActionProps;
  updateVisibility: {
    submit: (id: string, isPublic: boolean, allowedMembers: string[]) => void;
    loading: boolean;
  };
  allUsers: {
    usersearchQuery: string;
    users: ExistingUserTypes[];
    loadingUsers: boolean;
    handleSearch: (filter: string, value: string | number) => void;
  };
}

const EditMemberNote: React.FC<EditMemberNoteProps> = (props) => {
  const { id: userId } = useParams();
  const { id: noteId } = props;
  const {
    run: runFetchNote,
    data: fetchNoteResponse,
    requestStatus: fetchNoteStatus
  } = useApiRequest({});

  const {
    run: runEditNote,
    data: editNoteResponse,
    error: editNoteError,
    requestStatus: editNoteStatus
  } = useApiRequest({});

  //Fetch note
  const handleFetchNote = () => {
    if (noteId) runFetchNote(fetchAMemberNoteService(noteId));
  };
  const memberNote = useMemo<MemberNotesData>(() => {
    if (fetchNoteResponse?.status === 200) {
      const note = fetchNoteResponse?.data?.data?.note;
      const data = {
        id: note._id,
        title: note.title,
        body: note.body,
        creator: {
          id: note.creator._id,
          avatar: note.creator.avatar,
          name: note.creator.name
        },
        isPublic: note.is_public,
        createdAt: format(new Date(note.time), "do MMM, yyyy")
      };

      return data;
    }

    return {} as MemberNotesData;
  }, [fetchNoteResponse]);

  //Edit note
  const handleEditNote = (taskId: string, data) => {
    runEditNote(
      editNoteService(taskId, {
        body: data.body,
        title: data.title
      })
    );
  };

  useMemo(() => {
    if (editNoteResponse?.status === 201) {
      toast({
        description: editNoteResponse?.data?.message
      });
      handleFetchNote();
    } else if (editNoteError) {
      toast({
        variant: "destructive",
        description: editNoteError?.response?.data?.error
      });
    }
  }, [editNoteResponse, editNoteError]);

  useEffect(() => {
    handleFetchNote();
  }, [noteId]);
  return (
    <EditMemberNoteModal
      submit={handleEditNote}
      {...props}
      loading={fetchNoteStatus.isPending}
      initData={memberNote}
    />
  );
};

export { EditMemberNote };
