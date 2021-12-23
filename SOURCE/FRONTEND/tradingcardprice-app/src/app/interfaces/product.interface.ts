import { TranslateItem } from './translate-item.interface';

export interface Product {
  /** A generic (mongodb) id */
  _id?: string;

  /** All important dates */
  dates?: {
    createdAt: Date;
    lastChanges: Date;
  };

  /** Unique key (e.q.: Charizard) */
  key: string;

  /** Priority for sort */
  priority: number;

  /** Game _id */
  gameId: string;

  /** Category _id */
  categoryId: string;

  /** Unique index (e.q.: 1/102) */
  index: string;

  /** Is it activated? */
  activated: boolean;

  /** Displayname */
  displayname: TranslateItem;

  /** Description as markdown */
  description: TranslateItem;

  /** Thumbnail (image) */
  thumbnail: string;

  /** Rarity */
  rarity: string;

  /** Images (image urls) */
  images: string[];

  /** Total clicks */
  clicks: number;

  /** Ebay keywords */
  ebayKeywords: string;

  /** Ebay CategoryId */
  ebayCategoryId: string;
}
