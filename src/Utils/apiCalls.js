export const recentTopicsFetchCall = async () => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations?start=0&end=60`;
  const response = await fetch(url);
  const data = await response.json();
  return cleanInitialFetch(data);
};

export const lobbyistFetchCall = async () => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbyists`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const lobbyistListFetchCall = async () => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations?lobbyist=1270`;
  const response = await fetch(url);
  const data = await response.json();
  return cleanWordFetch(data);
};

export const wordCloudFetch = async () => {
  const url = `https://informant-words-staging.herokuapp.com/api/v1/common_words`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const specificWordFetch = async word => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations?word=${word}`;
  const response = await fetch(url);
  const data = await response.json();
  return cleanWordFetch(data);
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
      return { name: person.name, id: person.id };
    });
    return {
      filingId: object.filing_id,
      date: object.created_at,
      clientName: object.client.name,
      topic: object.issue.slice(2, object.issue.length - 2),
      lobbyists: cleanLobbyists,
      register: object.registrant.name
    };
  });
};

const cleanWordFetch = data => {
  return data.map(object => {
    return {
      filingId: object.filing_id,
      date: object.created_at,
      clientName: object.client.name,
      topic: object.issue.slice(2, object.issue.length - 2),
      register: object.registrant.name
    };
  });
};
