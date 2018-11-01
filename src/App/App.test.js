import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { mockRecentTopicsFetch } from '../mockData';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('setInitialState', () => {
    it('should set the appropriate state when setInitialState gets called', async () => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockRecentTopicsFetch)
        })
      );

      await wrapper.instance().setInitialState();
      expect(window.fetch).toHaveBeenCalledWith(
        'https://whispering-fjord-31037.herokuapp.com/api/v1/lobbying_representations?start=0&end=60'
      );
      // expect(wrapper.state().recentTopics.length).toEqual(0);
    });
  });
});
