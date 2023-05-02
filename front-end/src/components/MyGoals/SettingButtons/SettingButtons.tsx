import React from "react";
import { SArticle } from "./styles";

const SettingButtons = () => {
  return (
    <SArticle>
      <button>
        <p className="item1 purple">commit</p>
        <p className="item2">1 일 1 commit</p>
      </button>
      <button>
        <p className="item1 red">blog</p>
        <p className="item2">목표를 설정해주세요.</p>
      </button>
      <button>
        <p className="item1 yellow">algorithm</p>
        <p className="item2">목표를 설정해주세요.</p>
      </button>
      <button>
        <p className="item1 blue">feed</p>
        <p className="item2">목표를 설정해주세요.</p>
      </button>
      <button>
        <p className="item1 green">cs quiz</p>
        <p className="item2">목표를 설정해주세요.</p>
      </button>
    </SArticle>
  );
};

export default SettingButtons;
