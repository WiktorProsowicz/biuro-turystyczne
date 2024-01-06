import { Tour } from "./tour";

export interface Purchase {
  tour: Tour;
  date: string;
  seats: number;
};
