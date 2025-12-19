import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginPage from '@/app/[locale]/(auth)/login/page';
import QueryProvider from '@/providers/QueryProvider';

// Mock necessary hooks
vi.mock('@/i18n/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  Link: ({ children }: any) => <div>{children}</div>
}));

// Mock Translations
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('Login Page Validation', () => {
  const renderLogin = () => {
    render(
      <QueryProvider>
        <LoginPage />
      </QueryProvider>
    );
  };

  it('shows error when typing invalid data', async () => {
    renderLogin();

    const usernameInput = screen.getByPlaceholderText(/mor_2314/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);

    // 1. Simulate typing something then clearing it to trigger "Required" error
    fireEvent.change(usernameInput, { target: { value: 'a' } });
    fireEvent.change(usernameInput, { target: { value: '' } }); // Clear it

    await waitFor(() => {
      expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    });

    // 2. Simulate typing a short password to trigger "Min Length" error
    fireEvent.change(passwordInput, { target: { value: '123' } }); // Too short

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
    });
  });

  it('button is disabled initially', () => {
    renderLogin();
    const button = screen.getByRole('button', { name: /Log In/i });
    
    // The button should be disabled because the form is empty
    expect(button).toBeDisabled();
  });

  it('button enables when form is valid', async () => {
    renderLogin();
    const button = screen.getByRole('button', { name: /Log In/i });
    const usernameInput = screen.getByPlaceholderText(/mor_2314/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);

    // Type valid data
    fireEvent.change(usernameInput, { target: { value: 'validUser' } });
    fireEvent.change(passwordInput, { target: { value: 'validPass123' } });

    // Wait for the button to become enabled
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });
});