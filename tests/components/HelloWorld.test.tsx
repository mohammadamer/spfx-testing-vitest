import * as React from "react";
import { render, screen } from '@testing-library/react';
import HelloWorld from '@src/webparts/helloWorld/components/HelloWorld';

describe('HelloWorld component', () => {
  const baseProps = {
    description: 'Test description',
    isDarkTheme: false,
    environmentMessage: 'Test environment',
    hasTeamsContext: false,
    userDisplayName: 'Test User'
  };

  it('renders user display name and description', () => {
    render(<HelloWorld {...baseProps} />);
    expect(screen.getByText(/Well done, Test User!/)).toBeInTheDocument();
    expect(screen.getByText(/Web part property value:/)).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders environment message', () => {
    render(<HelloWorld {...baseProps} />);
    expect(screen.getByText('Test environment')).toBeInTheDocument();
  });

  it('shows dark image when isDarkTheme is true', () => {
    render(<HelloWorld {...baseProps} isDarkTheme={true} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('welcome-dark.png'));
  });

  it('shows light image when isDarkTheme is false', () => {
    render(<HelloWorld {...baseProps} isDarkTheme={false} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('welcome-light.png'));
  });

  it('applies Teams style when hasTeamsContext is true', () => {
    const { container } = render(<HelloWorld {...baseProps} hasTeamsContext={true} />);
    expect(container.querySelector('section')?.className).toMatch(/teams/);
  });

  it('renders all documentation links', () => {
    render(<HelloWorld {...baseProps} />);
    expect(screen.getAllByRole('link').length).toBeGreaterThanOrEqual(7);
  });
});