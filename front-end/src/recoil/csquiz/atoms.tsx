import { atom, useRecoilState } from "recoil";

type csQuiz = {
  option1: string | null;
  option2: string | null;
  option3: string | null;
  option4: string | null;
  answer: string | null;
  category: string | null;
  comment: string | null;
  quest: string | null;
};

export const csQuizState = atom<Array<csQuiz>>({
  key: "CSQuiz",
  default: [
    {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      category: "",
      comment: "",
      quest: "",
    },
    {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      category: "",
      comment: "",
      quest: "",
    },
    {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      category: "",
      comment: "",
      quest: "",
    },
    {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      category: "",
      comment: "",
      quest: "",
    },
    {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
      category: "",
      comment: "",
      quest: "",
    },
  ],
});
