import React from "react";
import { SSection } from "./styles";
import "animate.css";

const CSQuizContents = () => {
  return (
    <SSection>
      <h3>
        정보공학 방법론에서 데이터베이스 설계의 표현으로 사용하는 모델링 언어는?
        정보공학 방법론에서 데이터베이스 설계의 표현으로 사용하는 모델링 언어는?
        정보공학 방법론에서 데이터베이스 설계의 표현으로 사용하는 모델링 언어는?
      </h3>
      <div className="select__wrapper">
        <div className="post-it item select1 animate__animated animate__fadeInLeft">
          <div className="tape"></div>
          Package Diagram
        </div>
        <div className="post-it item select2 animate__animated animate__fadeInDown">
          <div className="tape"></div>
          State Transition Diagram
        </div>
        <div className="post-it item select3 animate__animated animate__fadeInUp">
          <div className="tape"></div>
          Deployment Diagram
        </div>
        <div className="post-it item select4 animate__animated animate__fadeInRight">
          <div className="tape"></div>
          Entity-Relationship Diagram
        </div>
      </div>
      <button className="submit">확인</button>
    </SSection>
  );
};

export default CSQuizContents;
