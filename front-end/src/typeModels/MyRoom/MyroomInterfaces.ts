export interface IMyRoomProps {
  activePage: string;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}
