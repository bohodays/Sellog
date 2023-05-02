import GoalsSetting from "@/components/MyGoals/GoalsSetting/GoalsSetting";
import { SMain } from "./styles";
import Achievement from "@/components/MyGoals/Achievement/Achievement";

const MyGoals = () => {
  return (
    <SMain>
      {/* 목표 설정 */}
      <GoalsSetting />

      {/* 목표 통계 */}
      <Achievement />
    </SMain>
  );
};

export default MyGoals;
