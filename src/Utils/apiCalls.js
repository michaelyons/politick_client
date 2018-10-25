export const initialFetchCall = async () => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations?start=0&end=30`;
  const response = await fetch(url);
  const data = await response.json();
  return cleanInitialFetch(data);
};

export const lobbyistFetchCall = async id => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations?lobbyists=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const cleanInitialFetch = data => {
  return data.map(object => {
    const removeDupLobbyists = object.lobbyists.filter(
      (person, index, self) =>
        index ===
        self.findIndex(
          item => item.place === person.place && item.name === person.name
        )
    );
    const cleanLobbyists = removeDupLobbyists.map(person => {
      return person.name;
    });
    return {
      filingId: object.filing_id,
      clientName: object.client.name,
      topic: object.issue.slice(2, object.issue.length - 2),
      lobbyists: cleanLobbyists,
      register: object.registrant.name
    };
  });
};
