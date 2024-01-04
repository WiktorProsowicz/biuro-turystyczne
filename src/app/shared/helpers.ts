export const currencyToFactor: { [key: string]: number } = {
  "PLN": 1,
  "EUR": 4.5,
  "USD": 4,
  "GBP": 5
};


export function getTourStatus(tour: any) {
  const now = new Date();

  if (tour.startDate > now) {
    return 'upcoming';
  }
  else if (tour.endDate < now) {
    return 'finished';
  }
  else {
    return 'ongoing';
  }
}
