export const initialFetchCall = async () => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
