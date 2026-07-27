import { Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 text-sm text-gray-600 mt-16">
      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-200">
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase">Support</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:underline">Help Centre</a></li>
              <li><a href="#" className="hover:underline">AirCover</a></li>
              <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
              <li><a href="#" className="hover:underline">Disability support</a></li>
              <li><a href="#" className="hover:underline">Cancellation options</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase">Hosting</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:underline">Airbnb your home</a></li>
              <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
              <li><a href="#" className="hover:underline">Hosting resources</a></li>
              <li><a href="#" className="hover:underline">Community forum</a></li>
              <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase">Airbnb</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:underline">Newsroom</a></li>
              <li><a href="#" className="hover:underline">New features</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Investors</a></li>
              <li><a href="#" className="hover:underline">Emergency stays</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-3 text-xs tracking-wider uppercase">Location</h3>
            <p className="text-gray-600 mb-3">Candolim, Goa, India</p>
            <p className="text-xs text-gray-500">Popular beach destination with vibrant cafes & nightlife.</p>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline">Company details</a>
          </div>

          <div className="flex items-center gap-6 font-semibold text-gray-900">
            <button className="flex items-center gap-2 hover:underline">
              <Globe className="w-4 h-4" />
              <span>English (IN)</span>
            </button>
            <button className="hover:underline">₹ INR</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
