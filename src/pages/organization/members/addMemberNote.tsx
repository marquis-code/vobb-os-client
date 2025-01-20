import { createMemberNoteService } from "api";
import { AddMemberNoteModal, toast } from "components";
import { useApiRequest } from "hooks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ExistingUserTypes, HandlerActionProps, MemberProfileProps, ModalProps } from "types";

interface AddMemberNoteProps extends ModalProps {
  callback: () => void;
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

const AddMemberNote: React.FC<AddMemberNoteProps> = (props) => {
  const { id: userId } = useParams();
  const { close, callback } = props;
  const {
    run: runAddNote,
    data: addNoteResponse,
    error: addNoteError,
    requestStatus: addNoteStatus
  } = useApiRequest({});

  const handleAddNote = (data) => {
    if (userId)
      runAddNote(
        createMemberNoteService(userId, {
          body: data.body,
          title: data.title,
          is_public: data.isPublic
        })
      );
  };

  useMemo(() => {
    if (addNoteResponse?.status === 201) {
      toast({
        description: addNoteResponse?.data?.message
      });
      close();
      callback?.();
    } else if (addNoteError) {
      toast({
        variant: "destructive",
        description: addNoteError?.response?.data?.error
      });
    }
  }, [addNoteResponse, addNoteError]);

  return <AddMemberNoteModal submit={handleAddNote} {...props} loading={addNoteStatus.isPending} />;
};

export { AddMemberNote };
