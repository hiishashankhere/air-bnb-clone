import { Globe, Menu, Search, User } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Airbnb Brand Logo */}
        <a
          href="/"
          className="flex items-center gap-2 text-[#FF385C] focus:outline-none focus:ring-2 focus:ring-black rounded-lg p-1.5 transition-opacity hover:opacity-90"
          aria-label="Airbnb homepage"
        >
          <svg
            className="w-9 h-9 fill-current"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.008-3.292 7.806-8.01 7.806-3.41 0-6.195-2.002-7.5-5.068-1.305 3.066-4.09 5.068-7.5 5.068-4.718 0-8.01-3.798-8.01-7.806 0-.974.223-1.895.845-3.43l.281-.634c.94-2.215 5.065-10.89 7.072-14.855l.504-.972C8.537 1.963 9.992 1 12 1zm0 4.108c-1.12 0-2.029.588-3.047 2.455l-.367.712c-1.92 3.791-5.918 12.18-6.792 14.18l-.136.315c-.44 1.05-.658 1.706-.658 2.23 0 2.656 2.08 4.806 4.99 4.806 2.632 0 4.894-1.745 5.586-4.43l.115-.506.618.001c.732 0 1.488.243 2.115 1.135l.235.352c1.077 1.724 2.825 3.448 5.342 3.448 2.91 0 4.99-2.15 4.99-4.806 0-.524-.218-1.18-.658-2.23l-.136-.315c-.874-2-4.872-10.389-6.792-14.18l-.367-.712C18.029 5.696 17.12 5.108 16 5.108z" />
          </svg>
          <span className="text-xl font-bold tracking-tight hidden md:inline text-[#FF385C]">airbnb</span>
        </a>

        {/* Search Bar Pill */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center border border-gray-300 rounded-full py-2 pl-4 pr-2 shadow-airbnb-search hover:shadow-airbnb transition cursor-pointer text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
          aria-label="Start your search"
        >
          <span className="px-3 text-gray-900 border-r border-gray-200 hover:text-black">Anywhere</span>
          <span className="px-3 text-gray-900 border-r border-gray-200 hover:text-black">Any week</span>
          <span className="px-3 text-gray-500 hover:text-gray-800 font-normal">Add guests</span>
          <div className="p-2 bg-[#FF385C] text-white rounded-full ml-1 hover:bg-[#E00B41] transition">
            <Search className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </button>

        {/* Right Nav */}
        <div className="flex items-center gap-1.5">
          <button className="hidden lg:block text-sm font-semibold text-gray-900 hover:bg-gray-100 px-4 py-2.5 rounded-full transition focus:outline-none focus:ring-2 focus:ring-black">
            Airbnb your home
          </button>
          <button
            className="text-gray-800 hover:bg-gray-100 p-3 rounded-full transition focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Choose a language and currency"
          >
            <Globe className="w-4 h-4" />
          </button>
          <button
            className="flex items-center gap-3 border border-gray-300 rounded-full py-1.5 px-3 hover:shadow-airbnb transition focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Main navigation menu"
          >
            <Menu className="w-4 h-4 text-gray-700" />
            <div className="w-7 h-7 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
              <User className="w-4 h-4 fill-current" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
