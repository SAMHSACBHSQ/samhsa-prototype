import React from 'react';
import { shallow } from 'enzyme';
import { FormFilters } from './FormFilters';

const testProps = {
  dispatch: jest.fn(),
  handleSubmit: jest.fn(),
  initialValues: {},
  isDesktop: true,
  location: {},
  loading: false,
  recordCount: 0,
  resetForm: jest.fn(),
  toggleFilters: jest.fn()
};

describe('FormFilters component', () => {
  describe('with an invalid location prop', () => {
    it('disables the submit button without a valid location', () => {
      const props = {
        ...testProps,
        isDesktop: false
      };
      const component = shallow(<FormFilters {...props} />);

      expect(
        component
          .find('FormFilters___StyledButton')
          .first()
          .prop('disabled')
      ).toBe(true);
    });

    it('disallows form submission', () => {
      const mockSubmit = jest.fn();
      const props = {
        ...testProps,
        handleSubmit: mockSubmit
      };
      const component = shallow(<FormFilters {...props} />);
      const form = component.find('form');

      form.simulate('submit', { preventDefault() {} });

      expect(mockSubmit.mock.calls.length).toBe(0);
    });
  });

  describe('with a valid location prop', () => {
    it('calls its handleSubmit prop when the form changed', () => {
      const props = {
        ...testProps,
        location: { latLng: {} }
      };
      const component = shallow(<FormFilters {...props} />);
      const form = component.find('form');

      form.simulate('submit');

      expect(props.handleSubmit.mock.calls.length).toBe(1);
    });
  });

  describe('on mobile', () => {
    it('shows an animation when loading results', () => {
      const props = {
        ...testProps,
        isDesktop: false,
        loading: true
      };
      const component = shallow(<FormFilters {...props} />);

      expect(
        component.find('FormFilters___StyledChasingDots').first().length
      ).toBe(1);
    });

    it('hides animation once results have been retrieved', () => {
      const props = {
        ...testProps,
        isDesktop: false,
        loading: false
      };
      const component = shallow(<FormFilters {...props} />);

      expect(
        component.find('FormFilters___StyledChasingDots').first().length
      ).toBe(0);
    });
  });

  it('resets the form when Clear All button is clicked', () => {
    const resetFn = jest.fn();
    const props = {
      ...testProps,
      resetForm: resetFn
    };
    const component = shallow(<FormFilters {...props} />);
    const resetBtn = component.find('.reset-form');

    resetBtn.simulate('click');

    expect(resetFn.mock.calls.length).toBe(1);
  });
});
