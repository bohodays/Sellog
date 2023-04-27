import GoalsSetting from "@/components/MyGoals/GoalsSetting/GoalsSetting";
import { SMain } from "./styles";
import Chart from "@/components/MyGoals/Chart/Chart";

const MyGoals = () => {
  return (
    <SMain>
      {/* 목표 설정 */}
      <GoalsSetting />

      {/* 목표 통계 */}
      <Chart />
    </SMain>
  );
};

export default MyGoals;
