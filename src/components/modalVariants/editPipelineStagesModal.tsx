import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  IconArrowNarrowLeft,
  IconCircleDotFilled,
  IconClockHour5,
  IconGripVertical,
  IconPlus,
  IconRotateClockwise,
  IconTrash
} from "@tabler/icons-react";
import { Modal } from "components/modal";
import { Button } from "components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { ModalProps, stagesType } from "types";
import { useRef, useState } from "react";

interface StageBlock {
  id: string;
  title: string;
  color: string;
}
export interface EditPipelineStagesData {
  name: string;
  stages?: stagesType[];
}

const stagesTypeSchemaReq = yup
  .object({
    title: yup.string(),
    color: yup.string()
  })
  .required("Required");

const schema = yup.object({
  name: yup.string().required("Required"),
  stages: yup.array().of(stagesTypeSchemaReq)
});

interface EditPipelineStageModalProps extends ModalProps {
  submit: (data: EditPipelineStagesData) => void;
  loading: boolean;
}

const EditPipelineStagesModal: React.FC<EditPipelineStageModalProps> = ({
  show,
  close,
  submit,
  loading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue
  } = useForm<EditPipelineStagesData>({
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<EditPipelineStagesData> = (data) => {
    submit(data);
  };
  const [blocks, setBlocks] = useState<StageBlock[]>([
    { id: "1", title: "Stage title", color: "green" },
    { id: "2", title: "Proposal Sent", color: "blue" }
  ]);

  const handleDragStop = (oldIndex: number, newIndex: number) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      const [removedBlock] = updatedBlocks.splice(oldIndex, 1);
      updatedBlocks.splice(newIndex, 0, removedBlock);
      return updatedBlocks;
    });
  };

  const handleAddStage = (index: number) => {
    setBlocks((prevBlocks) => {
      const newBlock: StageBlock = {
        id: `${prevBlocks.length + 1}`,
        title: `New Block ${prevBlocks.length + 1}`,
        color: "green"
      };
      return [...prevBlocks.slice(0, index + 1), newBlock, ...prevBlocks.slice(index + 1)];
    });
  };

  const handleDeleteStage = (index: number) => {
    setBlocks((prevBlocks) => prevBlocks.filter((_, i) => i !== index));
  };

  let blockDragRef = useRef();
  let blockDragOverRef = useRef();

  const handleDragStart = (e, index) => {
    blockDragRef.current = index;
  };
  const handleDragEnter = (e, index) => {
    blockDragOverRef.current = index;
  };
  const handleDragEnd = (e, index) => {};

  return (
    <>
      <Modal
        contentClassName="max-w-[1136px] h-[812px] p-0"
        show={show}
        close={close}
        testId="addBranch-modal">
        <div className="flex items-center justify-between p-3 border-b border-vobb-neutral-20">
          <div className="flex items-center gap-4">
            <Button
              onClick={close}
              variant={"outline"}
              size={"icon"}
              data-testid="close-btn"
              className=" w-[26px] h-[26px]  p-0 shadow-sm">
              <IconArrowNarrowLeft size={18} />
            </Button>
            <h2 className=" font-medium text-vobb-neutral-95">Pipeline Creation</h2>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Button
              onClick={close}
              variant={"outline"}
              size={"icon"}
              data-testid="reset-btn"
              className="flex items-center gap-2 w-fit px-[10px] shadow-sm">
              <IconRotateClockwise size={18} />
              Reset
            </Button>
            <p className="flex items-center gap-2">
              <IconClockHour5 size={18} />
              Updated 2 mins ago
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[280px,auto] divide-x">
          <div>sidebar</div>
          <div className="bg-grid-bg bg-[#F3F6F9] h-[700px] overflow-scroll flex flex-col gap-12">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="flex gap-10 items-center bg-transparent w-fit"
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={(e) => handleDragEnd(e, index)}>
                <Button variant={"outline"} className="w-7 h-7 border rounded-sm">
                  <IconGripVertical />
                </Button>
                <div className="w-[350px] h-[104px] rounded-lg grid grid-cols-2 relative p-4 bg-vobb-neutral-0 ">
                  <div className="flex flex-col gap-4">
                    <Button variant={"outline"}>{block.id}</Button>
                    <span>{block.title}</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Button variant={"outline"} onClick={() => handleDeleteStage(index)}>
                      <IconTrash />
                    </Button>
                    <Button variant={"outline"} className="flex gap-2 items-center">
                      <IconCircleDotFilled color={block.color} /> color
                    </Button>
                  </div>
                  <Button
                    variant={"outline"}
                    onClick={() => handleAddStage(index)}
                    className="absolute -bottom-10 left-2/4">
                    <IconPlus />
                  </Button>
                </div>
                <Button variant={"outline"} className="w-7 h-7 border rounded-sm">
                  All
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* <form className="p-4 border-b border-vobb-neutral-20">
          <CustomInput
            label="Name"
            placeholder="Enter pipeline name"
            name="name"
            register={register}
            validatorMessage={errors.name?.message}
          />
        </form> */}
        <div className="flex justify-between py-2 px-4 bg-vobb-neutral-10">
          <Button
            onClick={() => close()}
            className="text-xs rounded-sm"
            size={"default"}
            variant={"outline"}
            disabled={!isDirty || loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty}
            loading={loading}
            size={"default"}
            variant={"fill"}
            className="text-xs rounded-sm">
            Create
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { EditPipelineStagesModal };
