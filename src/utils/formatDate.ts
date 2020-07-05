const formatDate = (date: Date): string => {
  const slicedDate = date.toString().slice(0, 10);
  const splitedDate = slicedDate.split('-');
  const remountedDate = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`;
  return remountedDate;
};

export default formatDate;
