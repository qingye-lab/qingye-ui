import "./_env";
import { render, screen } from '@testing-library/react';
import { Hello } from '../Hello';

describe('T0', () => {
  it('[api] 渲染带 data-slot="button" 的“你好”按钮', () => {
    render(<Hello />);
    const button = screen.getByRole('button', { name: '你好' });
    expect(button).toHaveAttribute('data-slot', 'button');
  });
});
