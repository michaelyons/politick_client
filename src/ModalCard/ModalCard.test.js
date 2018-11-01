import React from 'react';
import ModalCard from './ModalCard';
import { shallow } from 'enzyme';

describe('ModalCard Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ModalCard />);
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
