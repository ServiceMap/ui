import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { StripeProvider } from "@/app/providers";
import { HomePage } from "@/pages/home";
import { authService } from "@/shared/api/auth";
import { AuthProvider, ThemeProvider } from "@/shared/ui";
import { TEST_USERNAME } from "@/tests/consts.ts";

describe("HomePage", () => {
  beforeEach(() => {
    Object.defineProperty(authService, "_isInitiated", {
      value: false,
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderComponent = () => {
    render(
      <AuthProvider>
        <StripeProvider>
          <ThemeProvider>
            <HomePage />
          </ThemeProvider>
        </StripeProvider>
      </AuthProvider>,
    );
  };

  it("renders with the login button", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.getByText(/Welcome to ServiceMap/i)).toBeInTheDocument();
      expect(screen.getByTestId("login-btn")).toBeInTheDocument();
    });
  });

  it("Show username and logout button when click login", async () => {
    renderComponent();

    await waitFor(() => {
      const loginBtn = screen.getByTestId("login-btn");
      userEvent.click(loginBtn);
    });

    await waitFor(() => {
      expect(screen.getByTestId("hello-message")).toHaveTextContent(
        `Hello, ${TEST_USERNAME}`,
      );
      expect(screen.getByTestId("logout-btn")).toBeInTheDocument();
    });
  });

  it("Show login button when click logout", async () => {
    renderComponent();

    await waitFor(() => {
      expect(screen.queryByTestId("logout-btn")).not.toBeInTheDocument();
      const loginBtn = screen.getByTestId("login-btn");
      userEvent.click(loginBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("login-btn")).not.toBeInTheDocument();
      const logoutBtn = screen.getByTestId("logout-btn");
      userEvent.click(logoutBtn);
    });

    await waitFor(() => {
      expect(screen.queryByTestId("logout-btn")).not.toBeInTheDocument();
      expect(screen.getByTestId("login-btn")).toBeInTheDocument();
    });
  });
});
