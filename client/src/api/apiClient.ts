import axios from 'axios';

export const postData = async (url: string, data: any) => {
  const res = await axios({
    url,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data,
  });
  if (!res.data) {
    throw new Error('Failed to get the data.');
  }
  return res.data;
};
