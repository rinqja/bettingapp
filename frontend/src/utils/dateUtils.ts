export const formatMatchTime = (time: string) => {
  if (!time) return '';
  
  const date = new Date(time);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatFullDate = (date: string) => {
  if (!date) return '';
  
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}; 