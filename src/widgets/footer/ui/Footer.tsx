import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="tw:border-t">
      <div className="tw:mx-auto tw:grid tw:max-w-7xl tw:grid-cols-1 tw:gap-8 tw:px-6 tw:py-10 tw:sm:grid-cols-2 tw:md:grid-cols-3">
        <div>
          <Link
            to="/"
            className="tw:text-xl tw:font-bold tw:text-primary tw:hover:opacity-80"
          >
            ServiceMap
          </Link>
          <p className="tw:mt-3 tw:text-sm tw:leading-relaxed">
            Connecting services and companies in one simple platform. Manage
            your tenants, data, and integrations easily.
          </p>
        </div>

        <div>
          <h1 className="tw:mb-3 tw:font-semibold">Quick Links</h1>
          <ul className="tw:space-y-2 tw:text-sm">
            <li>
              <Link
                to="/about"
                className="tw:transition-colors tw:hover:text-primary"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="tw:transition-colors tw:hover:text-primary"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="tw:transition-colors tw:hover:text-primary"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="tw:transition-colors tw:hover:text-primary"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        <div className="tw:flex tw:flex-col tw:justify-between">
          <div>
            <h1 className="tw:mb-3 tw:font-semibold">Follow Us</h1>
            <div className="tw:flex tw:gap-3">
              <a
                href="https://facebook.com"
                className="tw:transition-colors tw:hover:text-primary"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="tw:transition-colors tw:hover:text-primary"
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="tw:transition-colors tw:hover:text-primary"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                className="tw:transition-colors tw:hover:text-primary"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="tw:mt-6 tw:flex tw:items-center">
            <p className="tw:text-xs">
              © {new Date().getFullYear()} ServiceMap.{" "}
              {t("all_rights_reserved")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
