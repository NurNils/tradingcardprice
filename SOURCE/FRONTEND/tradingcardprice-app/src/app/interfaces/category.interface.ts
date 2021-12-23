import { TranslateItem } from './translate-item.interface';

export interface Category {
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

  /** Game _id */
  gameId: string;

  /** Release dates */
  releases: {
    germany: Date;
    usa: Date;
  };

  /** Is it activated? */
  activated: boolean;

  /** Is it new? */
  new: boolean;

  /** Displayname */
  displayname: TranslateItem;

  /** Description as markdown */
  description: TranslateItem;

  /** Thumbnail (image) */
  thumbnail: string;

  /** Symbol (image) */
  symbol: string;

  /** Images (image urls) */
  images: string[];

  /** Total clicks */
  clicks: number;
}
