export const formatDate = (date: Date | string) => {
  const dateObj = date instanceof Date ? date : new Date(date);

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Ngày không hợp lệ';
  }

  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(dateObj);
};
