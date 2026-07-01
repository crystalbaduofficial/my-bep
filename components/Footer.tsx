import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-dark-1/40 backdrop-blur-sm py-12 md:py-16 px-4 md:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/learning-center" className="text-gray-400 hover:text-white transition">
                  Learning Center
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="text-gray-400 hover:text-white transition">
                  Simulator
                </Link>
              </li>
              <li>
                <Link href="/practice-exams" className="text-gray-400 hover:text-white transition">
                  Practice Exams
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white transition">
                  Courses
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/organizations" className="text-gray-400 hover:text-white transition">
                  Organizations
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-gray-400 hover:text-white transition">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://help.backflowexamprep.com" className="text-gray-400 hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="https://docs.backflowexamprep.com" className="text-gray-400 hover:text-white transition">
                  Docs
                </a>
              </li>
              <li>
                <a href="https://status.backflowexamprep.com" className="text-gray-400 hover:text-white transition">
                  Status
                </a>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition">
                  All Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-400 hover:text-white transition">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Store */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">
              Store
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://shop.backflowexamprep.com/pricing" className="text-gray-400 hover:text-white transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="https://shop.backflowexamprep.com" className="text-gray-400 hover:text-white transition">
                  Shop
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-400/30" />
            <div>
              <p className="text-sm font-semibold text-white">Backflow Exam Prep</p>
              <p className="text-xs text-gray-500">Professional training platform</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Backflow Exam Prep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
