import React from 'react';
import LobbyCard from './LobbyCard';
import { shallow } from 'enzyme';

describe('LobbyCard Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LobbyCard />);
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
