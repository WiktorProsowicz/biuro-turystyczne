import { Tour } from "./tour";

export interface Purchase {
  userId: number;
  tour: Tour;
  date: string;
  seats: number;
};
