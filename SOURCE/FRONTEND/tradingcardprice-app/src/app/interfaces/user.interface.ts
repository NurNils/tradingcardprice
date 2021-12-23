export interface User {
  /** A generic (mongodb) id */
  _id?: string;

  /** Username (e.q.: Tradingcartname) */
  username: string;

  /** E-Mail (e.q.: mail@example.com) */
  email: string;

  /** Rank */
  rank: UserRank;
}

export enum UserRank {
  user = 'user',
  admin = 'admin',
}
