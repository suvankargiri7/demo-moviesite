import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './index';

test('home component render', () => {
  render(<Home />);
  expect(screen.getByTestId('appbar')).toBeInTheDocument();
  expect(screen.getByTestId('maincontainer')).toBeInTheDocument();
});
