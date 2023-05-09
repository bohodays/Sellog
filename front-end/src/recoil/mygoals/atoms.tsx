import { atom } from "recoil";
import { IDoneItem } from "@/typeModels/mygoals/myRecordInterfaces";
import { IUserGoalSetting } from "@/typeModels/mygoals/myGoalInterfaces";

export const todayRecordState = atom<IDoneItem>({
  key: "TodayRecord",
  default: {
    type: "github",
    message: "blah",
    problemId: null,
    writing_time: new Date(),
  },
});

export const myGoalState = atom<IUserGoalSetting>({
  key: "myGoal",
  default: {
    githubTarget: "1-1",
    blogTarget: "7-1",
    feedTarget: true,
    bojTarget: "1-1",
    csTarget: true,
  },
});
