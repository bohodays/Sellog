import React, { useEffect } from "react";
import { SInstallModal } from "./styles";
import { Link } from "react-router-dom";

interface IInstallProps {
  isInstalled: boolean;
  setIsInstalled: React.Dispatch<React.SetStateAction<boolean>>;
}

function InstallModal(props: IInstallProps) {
  console.log(props.isInstalled);
  console.log(props.setIsInstalled);

  return (
    <SInstallModal>
      <div className="modal__content">
        <p> 습관을 자동으로 기록하기 위해서 크롬 확장자 설치가 필요합니다.</p>
        <div className="box__button">
          <Link
            className="button__yes"
            to={`https://chrome.google.com/webstore/detail/sellog/baafapflapkopdlopohcmebnadhkambm?hl=ko&authuser=0`}
            onClick={() => props.setIsInstalled(true)}
          >
            설치하러 가기
          </Link>
          <button
            className="button__yes"
            onClick={() => props.setIsInstalled(true)}
          >
            나중에 하기
          </button>
        </div>
      </div>
    </SInstallModal>
  );
}

export default InstallModal;
