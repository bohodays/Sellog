import React from "react";
import { SModal } from "./styles";

function EditProfileModal() {
  return (
    <SModal>
      <p>정보를 수정 하시겠습니까?</p>
      <div className="box__button">
        <button className="button__yes">예</button>
        <button className="button__yes">아니오</button>
      </div>
    </SModal>
  );
}

export default EditProfileModal;
