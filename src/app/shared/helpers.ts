
export function getTourStatus(tour: any) {
  const now = new Date();
  const startDate = new Date(tour.startDate);
  const endDate = new Date(tour.endDate);

  if (startDate > now) {
    return 'upcoming';
  }
  else if (endDate < now) {
    return 'finished';
  }
  else {
    return 'ongoing';
  }
}
