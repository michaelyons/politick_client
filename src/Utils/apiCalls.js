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

export const congressMemberFetch = async zipcode => {
  const url = `https://www.googleapis.com/civicinfo/v2/representatives?key=${
    process.env.REACT_APP_CONGRESS_KEY
  }&address=${zipcode}&roles=legislatorLowerBody`;
  const response = await fetch(url);
  const data = await response.json();
  return cleanCongressMembers(data.officials);
};

export const tweetPostRequest = async infoPayload => {
  const url = 'https://ml-politick-server.herokuapp.com/twitter/posttweet';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(infoPayload),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response;
};

export const grabTwitterUsername = async id => {
  const url = `https://ml-politick-server.herokuapp.com/api/users/${id}`;
  const response = await fetch(url);
  const user = await response.json();
  return user.username;
};

export const lobbyistListFetchCall = async () => {
  const url = `https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations?lobbyist=1827`;
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

const cleanCongressMembers = data => {
  return data.map(congressMember => {
    const twitter = congressMember.channels.find(
      object => object.type === 'Twitter'
    );
    return {
      repName: congressMember.name,
      twitterName: twitter.id
    };
  });
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
