import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { SWithdrawModal } from "@/components/MyRoom/WithdrawModal/styles";
//api
import { apiDelUserInfo } from "@/api/user";

interface IWithdrawModal {
  isOutModal: boolean;
  setIsOutModal: Dispatch<SetStateAction<boolean>>;
}

function WithdrawModal(props: IWithdrawModal) {
  const outYesHandler = () => {
    apiDelUserInfo().then(() => {
      props.setIsOutModal(!props.isOutModal);
    });
  };
  const outNoHandler = () => {
    props.setIsOutModal(!props.isOutModal);
  };
  return (
    <SWithdrawModal>
      <div className="modal__content">
        <p> 정말 SELLOG 탈퇴 하시겠습니까?</p>
        <div className="box__button">
          <Link
            className="button__yes"
            to={`https://chrome.google.com/webstore/detail/sellog/baafapflapkopdlopohcmebnadhkambm?hl=ko&authuser=0`}
            onClick={outYesHandler}
          >
            YES
          </Link>
          <button className="button__yes" onClick={outNoHandler}>
            NO
          </button>
        </div>
      </div>
    </SWithdrawModal>
  );
}

export default WithdrawModal;
