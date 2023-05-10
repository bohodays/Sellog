export interface IItem {
  id?: number | null;
  roomId?: number;
  itemId?: number;
  name?: string;
  point?: number;
  category?: string;
  x: number | null;
  y: number | null;
  z: number | null;
  rotation?: number | null;
  path?: string;
}

export interface IItemProps {
  item?: IItem;
}
