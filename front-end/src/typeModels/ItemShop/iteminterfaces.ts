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

export interface IShopItem {
  id: number;
  name?: string;
  point?: number;
  category?: string;
  possession?: number;
  path?: string;
}

export interface IItemProps {
  item: IItem;
}

export interface IShopItemProps {
  shopItem?: IShopItem;
}
