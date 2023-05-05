import React from "react";
import { SModal } from "./styles";

interface EditProps {
  isModal: boolean;
  setIsModal: any;
  isEdit: boolean;
  setIsEdit: any;
}

function EditProfileModal(props: EditProps) {
  const yesHandler = () => {
    props.setIsEdit(!props.isEdit);
    props.setIsModal(!props.isModal);
  };
  const noHandler = () => {
    props.setIsModal(!props.isModal);
  };
  return (
    <SModal>
      <div className="modal__content">
        <p>정보를 수정 하시겠습니까?</p>
        <div className="box__button">
          <button className="button__yes" onClick={yesHandler}>
            Yes
          </button>
          <button className="button__yes" onClick={noHandler}>
            No
          </button>
        </div>
      </div>
    </SModal>
  );
}

export default EditProfileModal;
