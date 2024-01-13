
export function getTourStatus(tour: any) {
  const now = new Date();
  const startDate = new Date(tour.startDate);
  const endDate = new Date(tour.endDate);

  if (startDate.getTime() > now.getTime()) {
    return 'upcoming';
  }
  else if (endDate.getTime() < now.getTime()) {
    return 'finished';
  }
  else {
    return 'ongoing';
  }
}
