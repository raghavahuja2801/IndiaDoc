import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200">
      <p className="text-xs text-gray-600">© 2023 GlobalHealth. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          to="/terms-of-service"
          className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-orange-500"
        >
          Terms of Service
        </Link>
        <Link
          to="/privacy-policy"
          className="text-xs hover:underline underline-offset-4 text-gray-600 hover:text-orange-500"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
