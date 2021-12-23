import { TranslateItem } from './translate-item.interface';

export interface Game {
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
