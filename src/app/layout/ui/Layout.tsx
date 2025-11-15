import { ScrollRestoration } from "react-router";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

export const Layout = () => {
  return (
    <>
      <Header />

      <main
        className="tw:mx-0 tw:flex tw:flex-col tw:p-4"
        style={{ minHeight: "calc(100dvh + 1px - var(--header-h))" }}
      >
        <Outlet />
      </main>

      <Footer />

      <ScrollRestoration />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
