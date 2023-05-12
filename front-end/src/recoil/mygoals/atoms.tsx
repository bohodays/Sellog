import { atom } from "recoil";
import { IDoneItem } from "@/typeModels/mygoals/myRecordInterfaces";

export const todayRecordState = atom<IDoneItem>({
  key: "TodayRecord",
  default: {
    type: "github",
    message: "blah",
    problemId: null,
    writing_time: new Date(),
  },
});
