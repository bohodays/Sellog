import GoalsSetting from "@/components/MyGoals/GoalsSetting/GoalsSetting";
import { SMain } from "./styles";
import Record from "@/components/MyGoals/Record/Record";

const MyGoals = () => {
  return (
    <SMain>
      {/* 목표 설정 */}
      <GoalsSetting />

      {/* 목표 통계 */}
      <Record />
    </SMain>
  );
};

export default MyGoals;
