import { TranslateItem } from './translate-item.interface';

export interface Supercategory {
  /** A generic (mongodb) id */
  _id?: string;

  /** All important dates */
  dates?: {
    createdAt: Date;
    lastChanges: Date;
  };

  /** Unique key (e.q.: xy-zyklus) */
  key: string;

  /** Priority for sort */
  priority: number;

  /** Game _id */
  gameId: number;

  /** Categories (_id) */
  categories: string[];

  /** Is it activated? */
  activated: boolean;

  /** Displayname */
  displayname: TranslateItem;

  /** Description as markdown */
  description: TranslateItem;

  /** Thumbnail (image) */
  thumbnail: string;

  /** Total clicks */
  clicks: number;
}
