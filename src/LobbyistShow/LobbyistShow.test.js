import React from 'react';
import LobbyistShow from './LobbyistShow';
import { shallow } from 'enzyme';
import { mockLobbyistShowFetch } from '../mockData';

describe('LobbyistShow Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LobbyistShow lobbyist={mockLobbyistShowFetch} />);
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
