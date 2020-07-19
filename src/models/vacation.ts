interface comment {
  username: string;
  comment: string;
}

export interface IVacation {
  id: number;
  description: string;
  destination: string;
  image: string;
  startDate: Date;
  endDate: Date;
  price: number | string;
  isFollowing: number;
  followers: number;
  comments: comment[] | null;
}
