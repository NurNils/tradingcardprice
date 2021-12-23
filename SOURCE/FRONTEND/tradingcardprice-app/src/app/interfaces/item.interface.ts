import { TranslateItem } from './translate-item.interface';

export interface Item {
  /** A generic (mongodb) id */
  _id?: string;

  /** All important dates */
  dates?: {
    createdAt: Date;
    lastChanges: Date;
  };

  /** Unique key (e.q.: base-set) */
  key: string;

  /** Priority for sort */
  priority: number;

  /** Product _id */
  productId: string;

  /** Unique index (e.q.: 1/3) */
  index: string;

  /** Is it activated? */
  activated: boolean;

  /** Displayname */
  displayname: TranslateItem;

  /** Description as markdown */
  description: TranslateItem;

  /** Thumbnail (image) */
  thumbnail: string;

  /** Images (image urls) */
  images: string[];

  /** Total clicks */
  clicks: number;
}
