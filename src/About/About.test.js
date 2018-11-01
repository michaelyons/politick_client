import React from 'react';
import About from './About';
import { shallow } from 'enzyme';

describe('About Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
