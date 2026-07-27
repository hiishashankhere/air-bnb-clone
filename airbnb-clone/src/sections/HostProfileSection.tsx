import { GraduationCap, ShieldCheck, UserCheck } from 'lucide-react';
import { memo } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';
import type { HostInfo } from '../types/listing';

interface HostProfileSectionProps {
  host: HostInfo;
}

export const HostProfileSection = memo(function HostProfileSection({ host }: HostProfileSectionProps) {
  return (
    <SectionContainer>
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Meet your host</h2>

      {/* Host Main Highlight Card */}
      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 max-w-2xl mb-8 shadow-airbnb-card">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md mb-3"
              loading="lazy"
            />
            <h3 className="text-2xl font-extrabold text-gray-900">{host.name}</h3>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
              Host
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6 text-center sm:border-l sm:border-gray-200 sm:pl-8 py-2">
            <div>
              <div className="text-2xl font-extrabold text-gray-900">{host.reviewCount.toLocaleString()}</div>
              <div className="text-xs text-gray-500 font-medium">Reviews</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900">{host.rating}★</div>
              <div className="text-xs text-gray-500 font-medium">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-gray-900">{host.yearsHosting}</div>
              <div className="text-xs text-gray-500 font-medium">Years hosting</div>
            </div>
          </div>
        </div>
      </div>

      {/* Host Bio Bullets */}
      <div className="space-y-4 max-w-xl mb-8">
        <div className="flex items-center gap-3 text-gray-800 text-base">
          <UserCheck className="w-5 h-5 text-gray-700 shrink-0" />
          <span>Born in the 80s</span>
        </div>
        <div className="flex items-center gap-3 text-gray-800 text-base">
          <GraduationCap className="w-5 h-5 text-gray-700 shrink-0" />
          <span>Where I went to school: NICMAR GOA</span>
        </div>
      </div>

      {/* Co-Hosts List */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 text-lg mb-4">Co-Hosts</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {host.coHosts.map((coHost) => (
            <div key={coHost.id} className="flex items-center gap-3">
              <img
                src={coHost.avatar}
                alt={coHost.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                loading="lazy"
              />
              <span className="text-sm font-medium text-gray-800">{coHost.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Host Details & Message Host */}
      <div className="space-y-4 mb-8">
        <h3 className="font-semibold text-gray-900 text-lg">Host details</h3>
        <div className="text-sm text-gray-700 space-y-1">
          <p>Response rate: {host.responseRate}%</p>
          <p>{host.responseSpeed}</p>
        </div>

        <button className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black">
          Message host
        </button>
      </div>

      {/* Payment Security Warning */}
      <div className="flex items-start gap-3 text-xs text-gray-500 max-w-lg pt-4 border-t border-gray-100">
        <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
        <span>
          To help protect your payment, always use Airbnb to send money and communicate with hosts.
        </span>
      </div>
    </SectionContainer>
  );
});

