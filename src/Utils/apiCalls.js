export const initialFetchCall = async () => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations`;
  const response = await fetch(url);
  const data = await response.json();
  return cleanInitialFetch(data);
};

const cleanInitialFetch = data => {
  return data.map(object => {
    return {
      FilingId: object.filing_id,
      ClientName: object.client.name,
      Topic: object.issue,
      Lobbyists: object.lobbyists
    };
  });
};
