import React from 'react';
import LoadingGif from './LoadingGif';
import { shallow } from 'enzyme';

describe('LoadingGif Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoadingGif />);
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
