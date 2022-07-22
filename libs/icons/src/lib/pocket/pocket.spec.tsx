import { render } from '@testing-library/react';

import Pocket from './pocket';

describe('Pocket', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Pocket />);
    expect(baseElement).toBeTruthy();
  });
});
