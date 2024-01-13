export interface Opinion {
  id: number;
  userId: number;
  tourId: number;
  topic: string;
  opinion: string;
  dateCreated: string;
  date?: string;
};
