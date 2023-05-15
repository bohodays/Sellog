export interface IFeed {
  company: string;
  title: string;
  view: string;
  link: string;
  pub_date: string;
}

export interface IFeedProps {
  props?: object;
}

export interface IRecordCSFeed {
  type: string;
  message: string;
}
