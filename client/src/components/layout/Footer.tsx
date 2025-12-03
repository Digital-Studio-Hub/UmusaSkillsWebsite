import { Link } from "wouter";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";
import lekkerLogo from "@assets/lekkerlogo_1764331673938.png";
import badgeLogo from "@assets/Badge Level 1_1764331665175.png";
import logoMain from "@assets/White-Logo_1764333406904.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* === TOP SECTION: 3 Columns === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4">
              {COMPANY_INFO.name}
            </h3>
            <p className="text-gray-400 mb-6">{COMPANY_INFO.tagline}</p>

            <div className="space-y-2 text-gray-300">
              <p>{COMPANY_INFO.phone}</p>
              <p>{COMPANY_INFO.email}</p>
              <p>{COMPANY_INFO.address}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-brand-gold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-brand-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empty for cleaner symmetry */}
          <div></div>
        </div>

        <div
          className="border-t border-gray-800 pt-8 pb-8 
             flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0"
        >
          {/* LEFT — Lekker Network Logo */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xl font-bold text-brand-gold mb-2">
              Powered By
            </h4>

            <a
              href="https://lekker.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <img
                src={lekkerLogo}
                alt="Lekker Network"
                className="h-16 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </a>

            <p className="text-sm text-gray-500 mt-2">Lekker Network</p>
          </div>

          {/* CENTER — MAIN COMPANY LOGO */}
          <div className="flex flex-col items-center">
            <img
              src={logoMain}
              alt="Main Company Logo"
              className="h-24 w-auto object-contain"
            />
          </div>

          {/* RIGHT — Verified Badge */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-xl font-bold text-brand-gold mb-2">
              Verified Badge
            </h4>

            <a
              href="https://lekker.network/the-lekker-network-verified"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-105 transition-transform"
            >
              <img
                src={badgeLogo}
                alt="Lekker Network Verified Level 1"
                className="h-32 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </a>

            <p className="text-sm text-gray-500 mt-2">Level 1 Verified</p>
          </div>
        </div>

        {/* === BOTTOM COPYRIGHT === */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
