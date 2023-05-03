import { atom } from "recoil";
import { ITodayRecord } from "@/typeModels/mygoals/myRecordInterface";

export const todayRecordState = atom<ITodayRecord>({
  key: "TodayRecord",
  default: {
    type: "github",
    message: "blah",
    problemId: null,
    writing_time: new Date(),
  },
});
