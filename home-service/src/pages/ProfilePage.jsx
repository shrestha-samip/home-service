import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, Briefcase, Calendar } from 'lucide-react';
import { api } from '../api/client';

const ProfilePage = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await api.getUserProfile(userId);
        if (!cancelled) setProfile(data);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || 'Could not load profile');
          setProfile(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const displayRole =
    profile?.role === 'customer'
      ? 'Customer'
      : profile?.role === 'provider'
        ? 'Service provider'
        : profile?.role ?? '—';

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Your profile</h2>

      {loading && <p className="text-gray-600">Loading…</p>}
      {error && (
        <p className="text-red-600 font-semibold mb-4">{error}</p>
      )}

      {!loading && profile && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-10 text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full p-4">
                <User size={40} className="text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-sm uppercase tracking-wide">Signed in as</p>
                <h3 className="text-2xl font-bold">{profile.name}</h3>
                <p className="text-blue-100 mt-1">{displayRole}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-start gap-3 text-gray-700">
              <Mail className="text-indigo-500 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                <p className="break-all">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <Phone className="text-purple-500 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">Phone</p>
                <p>{profile.phone || '—'}</p>
              </div>
            </div>

            {profile.role === 'provider' ? (
              <>
                <div className="flex items-start gap-3 text-gray-700">
                  <Briefcase className="text-green-600 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Experience</p>
                    <p>
                      {profile.experience != null
                        ? `${profile.experience} years`
                        : '—'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <User className="text-blue-500 shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase">Specialization</p>
                    <p>{profile.specialization || '—'}</p>
                  </div>
                </div>
              </>
            ) : null}

            {profile.created_at && (
              <div className="flex items-start gap-3 text-gray-500 text-sm pt-4 border-t border-gray-100">
                <Calendar size={18} className="shrink-0 mt-0.5" />
                <span>Member since {new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
