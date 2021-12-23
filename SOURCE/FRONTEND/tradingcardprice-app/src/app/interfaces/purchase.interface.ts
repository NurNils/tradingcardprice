import { TranslateItem } from './translate-item.interface';

export interface Purchase {
  /** A generic (mongodb) id */
  _id?: string;

  /** Sale date of product */
  saleDate: Date;

  /** Product _id */
  productId: string;

  /** Price of article */
  price: number;

  /** Ebay auction currency */
  currency: string;

  /** Ebay auction title */
  title: string;

  /** Ebay auction _id */
  auctionId: string;

  /** Ebay seller id */
  sellerId: string;

  /** Ebay sale type */
  saleType: string;
}
