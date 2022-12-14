import React from 'react';
import DarkModeToggler from './DarkModeToggler';

test('click on the button triggers the toggle function', () => {
  const wrapper = shallow(<DarkModeToggler />);
  const button = wrapper.find('[data-testid="dark-mode-toggler"]');
  button.simulate('click');
  expect(button.props().onClick).toHaveBeenCalled();
});

test('Image tag has correct src when isDarkMode is true or false', () => {
  const wrapper = shallow(<DarkModeToggler />);
  const img = wrapper.find('[data-testid="dark-mode-img"]');
  expect(img.props().src).toBe('/assets/icon-moon.svg');

  const button = wrapper.find('[data-testid="dark-mode-toggler"]');
  button.simulate('click');
  expect(img.props().src).toBe('/assets/icon-sun.svg');
});
