import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import { mockRecentTopicsFetch } from '../mockData';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
    // window.fetch = jest.fn().mockImplementation(() =>
    //   Promise.resolve({
    //     json: () => Promise.resolve(mockDataFetch)
    //   })
    // );
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
