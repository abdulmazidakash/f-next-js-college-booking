"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { FaSchoolFlag } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-gray-700 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Branding Section */}
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-4"><FaSchoolFlag className="text-button-bg" /> College Booking</h2>
          <p className="text-sm">Your trusted platform for booking top college facilities and services easily.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/">🏠 Home</Link></li>
            <li><Link href="/colleges">🏫 Colleges</Link></li>
            <li><Link href="/admission">📝 Admission</Link></li>
            <li><Link href="/my-college">🎓 My College</Link></li>
            <li><Link href="/add-college">📑 Add College</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">Contact</h3>
          <p className="text-sm">Feni, Bangladesh</p>
          <p className="text-sm">Email: support@collegebook.com</p>
          <p className="text-sm">Phone: +880-123456789</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-[#DA202F] transition-all "><FaFacebookF /></a>
            <a href="#" className="hover:text-[#DA202F] transition-all"><FaTwitter /></a>
            <a href="#" className="hover:text-[#DA202F] transition-all"><FaInstagram /></a>
            <a href="#" className="hover:text-[#DA202F] transition-all"><FaLinkedin /></a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="text-center py-4 border-t border-gray-200 text-sm bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent font-semibold">
        © {new Date().getFullYear()} College Booking. All Rights Reserved.
      </div>
    </footer>
  );
}
