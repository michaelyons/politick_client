import {
  recentTopicsFetchCall
  // cleanInitialFetch,
  // lobbyistFetchCall,
  // lobbyistListFetchCall,
  // wordCloudFetch
} from './apiCalls';
import { mockRecentTopicsFetch } from '../mockData';

describe('Api Calls', () => {
  describe('recentTopicsFetchCall', () => {
    let cleanRecentTopicsFetch;
    beforeEach(() => {
      cleanRecentTopicsFetch = {
        id: 821,
        filing_id: 300928043,
        issue: "['Legislation affecting exempt organizations']",
        created_at: '2018-11-01',
        lobbyists: [
          { id: 1286, name: 'Dan C. Tate Sr.' },
          { id: 1285, name: 'Daniel Tate Sr.' },
          { id: 1284, name: 'Danny Tate, Sr.' },
          { id: 1283, name: 'Dan Tate Sr.' },
          { id: 1282, name: 'Dan Tate' },
          { id: 1281, name: 'Danny Tate' },
          { id: 1280, name: 'Danny Tate Sr.' }
        ],
        registrant: { id: 347, name: 'DAN TATE, LLC' },
        client: { id: 802, name: 'PGA TOUR' }
      };
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(cleanRecentTopicsFetch)
        })
      );
    });
    it('should match fetch with the correct params', () => {
      recentTopicsFetchCall();
      expect(window.fetch).toHaveBeenCalledWith(
        'https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations?start=0&end=60'
      );
    });

    // it('should return an object if the response is ok', async () => {
    //   const expected = cleanRecentTopicsFetch;
    //   const result = await recentTopicsFetchCall();
    //   expect(result).toEqual(expected);
    // });

    it('should throw and error if the fetch fails', async () => {
      const expected = new Error('failed to fetch');
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('failed to fetch'));
      });

      await expect(
        recentTopicsFetchCall(mockRecentTopicsFetch)
      ).rejects.toEqual(expected);
    });
  });
});
