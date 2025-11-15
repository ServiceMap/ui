import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import { StripeSandboxButton } from "@/features/payments";
import { Button, useAuthContext, useThemeContext } from "@/shared/ui";

export const TestWidget = () => {
  const { t } = useTranslation();
  const { isLoggedIn, user, login, logout } = useAuthContext();

  const { theme } = useThemeContext();

  console.log("HomePage", theme);

  useEffect(() => {
    toast("dd", { type: "error" });
  }, []);

  return (
    <div
      className="tw:flex tw:flex-col tw:items-center tw:gap-4"
      data-testid="home-page"
    >
      <h1>{t("welcome_message")}</h1>

      <p>Mode: {import.meta.env.MODE}</p>

      <p>{dayjs().format()}</p>
      <p>{dayjs().format("LLLL")}</p>

      <p>
        <Button
          onClick={() => {
            throw new Error("Test SENTRY button clicked!");
          }}
        >
          TEST SENTRY
        </Button>
      </p>

      <p>
        <StripeSandboxButton />
      </p>

      {!isLoggedIn ? (
        <button data-testid="login-btn" onClick={() => void login()}>
          {t("login_btn")}
        </button>
      ) : (
        <>
          <p data-testid="hello-message">
            <Trans
              i18nKey="hello_user_message"
              values={{
                username: user?.username ?? user?.preferredName,
              }}
            />
          </p>
          <button data-testid="logout-btn" onClick={() => void logout()}>
            {t("logout_btn")}
          </button>
        </>
      )}
    </div>
  );
};
