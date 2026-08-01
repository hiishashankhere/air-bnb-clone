import { GraduationCap, ShieldCheck, UserCheck } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { SectionContainer } from '../components/common/SectionContainer';
import { BaseModal } from '../components/common/BaseModal';
import {
  clearHostMessageDraft,
  loadHostMessageDraft,
  loadHostMessages,
  saveHostMessage,
  saveHostMessageDraft,
} from '../lib/demoStorage';
import type { HostInfo } from '../types/listing';

interface HostProfileSectionProps {
  listingId: string;
  listingTitle: string;
  host: HostInfo;
}

export const HostProfileSection = memo(function HostProfileSection({
  listingId,
  listingTitle,
  host,
}: HostProfileSectionProps) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageStatus, setMessageStatus] = useState<string | null>(null);
  const [savedMessages, setSavedMessages] = useState(() => loadHostMessages(listingId));

  useEffect(() => {
    if (!isMessageOpen) return;

    const draft = loadHostMessageDraft(listingId);
    setGuestName(draft.guestName);
    setGuestEmail(draft.guestEmail);
    setMessage(draft.message);
    setSavedMessages(loadHostMessages(listingId));
    setMessageStatus(null);
  }, [isMessageOpen, listingId]);

  useEffect(() => {
    if (!isMessageOpen) return;
    saveHostMessageDraft(listingId, { guestName, guestEmail, message });
  }, [guestEmail, guestName, isMessageOpen, listingId, message]);

  const handleSendMessage = () => {
    if (!message.trim()) {
      setMessageStatus('Please add a message before saving it locally.');
      return;
    }

    const saved = saveHostMessage({
      listingId,
      guestName,
      guestEmail,
      message,
      checkIn: null,
      checkOut: null,
      guests: 1,
    });

    clearHostMessageDraft(listingId);
    setSavedMessages((prev) => [saved, ...prev].slice(0, 5));
    setMessage('');
    setGuestName('');
    setGuestEmail('');
    setMessageStatus('Message saved locally in this browser.');
  };

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

        <button
          type="button"
          onClick={() => setIsMessageOpen(true)}
          className="px-6 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-black"
        >
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

      <BaseModal
        isOpen={isMessageOpen}
        onClose={() => setIsMessageOpen(false)}
        title={`Message ${host.name}`}
        maxWidthClass="max-w-2xl"
      >
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-600">
              This demo stores host messages locally for {listingTitle}. Nothing is sent to a backend.
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-2">
              {savedMessages.length} local message(s) saved
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Your name
              </label>
              <input
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Guest name"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder={`Hi ${host.name}, I have a question about ${listingTitle}...`}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          {messageStatus && <p className="text-sm font-medium text-gray-600">{messageStatus}</p>}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              Your draft is preserved locally while the modal is open, and sent messages stay in this browser.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMessageOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-black"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSendMessage}
                className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-black"
              >
                Save message
              </button>
            </div>
          </div>

          {savedMessages.length > 0 && (
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-900">Recent local messages</h3>
              <div className="space-y-2">
                {savedMessages.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <div className="text-sm font-semibold text-gray-900">{entry.guestName}</div>
                    <p className="text-xs text-gray-500 mt-1">{entry.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </BaseModal>
    </SectionContainer>
  );
});
