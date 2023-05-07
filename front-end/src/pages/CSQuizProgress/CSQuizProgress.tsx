import React from "react";
import { SMain } from "./styles";
import CSQuizTimer from "@/components/CSQuiz/CSQuizTimer/CSQuizTimer";
import CSQuizContents from "@/components/CSQuiz/CSQuizContents/CSQuizContents";

const CSQuizProgress = () => {
  return (
    <SMain>
      <CSQuizTimer />

      <CSQuizContents />
    </SMain>
  );
};

export default CSQuizProgress;
