import React from 'react';
import RecentTopicsContainer from './RecentTopicsContainer';
import { shallow } from 'enzyme';
import { mockRecentTopicsCategoryFetch } from '../mockData';

describe('RecentTopicsContainer Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <RecentTopicsContainer
        recentTopicsCategory={mockRecentTopicsCategoryFetch}
      />
    );
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
