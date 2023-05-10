
export interface IDoneItem {
  type: string;
  message: string;
  problemId: number | null;
  writing_time: Date;
}

export interface IDoneList {
  [key: string]: IDoneItem[] | null;
}

export interface IDoneItemProps {
  doneItem: IDoneItem;
}

export interface IAccumulatedRecordItem {
  day: number;
  last: number[];
  mid: number[];
  start: number[];
}

export interface IAccumulatedRecordList {
  [key: string]: IAccumulatedRecordItem | null;
}
