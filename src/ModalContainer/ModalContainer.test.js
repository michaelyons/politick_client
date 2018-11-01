import React from 'react';
import ModalContainer from './ModalContainer';
import { shallow } from 'enzyme';
import { mockModalFetch } from '../mockData';

describe('ModalContainer Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ModalContainer modal={mockModalFetch} />);
  });

  describe('snapshot', () => {
    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
