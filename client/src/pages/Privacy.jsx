import { useState } from "react";
import { Link } from "react-router";
import {
  CiCalendar,
  CiGlobe,
  CiMapPin,
  CiServer,
  CiMonitor,
} from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { loginHistory } from "../api/user";
import LoadingScreen from "../components/LoadingScreen";

export default function Privacy() {
  const { data, isLoading } = useQuery({
    queryFn: loginHistory,
    queryKey: ["userLogins"],
    staleTime: 60 * 1000 * 5,
  });

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex" style={{ 
      backgroundImage: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 25%, #0f0f0f 50%, #0a0a0a 75%, #1a1a1a 100%)' 
    }}>
      {/* Page content */}
      <main className="p-4 sm:p-6 lg:p-8 mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Privacy & Security
          </h1>
          <p className="text-ink-300 pb-4">
            View your login history and security settings
          </p>

          {data && (
            <div className="flex flex-col gap-4">
              {data.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xs p-4 "
                >
                  <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
                    <div className="flex items-center">
                      <CiCalendar className="size-4 text-ink-400 mr-2" />
                      <span className="text-sm font-medium text-white">
                        Date & Time:
                      </span>
                      <span className="ml-2 text-sm text-ink-200">
                        {entry.dateTime}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiGlobe className="size-4 text-ink-400 mr-2" />
                      <span className="text-sm font-medium text-white">
                        IP Address:
                      </span>
                      <span className="ml-2 text-sm text-ink-200">
                        {entry.ipAddress}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiMapPin className="size-4 text-ink-400 mr-2" />
                      <span className="text-sm font-medium text-white">
                        Location:
                      </span>
                      <span className="ml-2 text-sm text-ink-200">
                        {entry.location}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiServer className="size-4 text-ink-400 mr-2" />
                      <span className="text-sm font-medium text-white">
                        ISP:
                      </span>
                      <span className="ml-2 text-sm text-ink-200">
                        {entry.isp}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CiMonitor className="size-4 text-ink-400 mr-2" />
                      <span className="text-sm font-medium text-white">
                        Device:
                      </span>
                      <span className="ml-2 text-sm text-ink-200">
                        {entry.device}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Security settings */}
        <div>
          <h2 className="text-lg font-medium text-white mb-4">
            Security Settings
          </h2>
          <div className="bg-white/5 backdrop-blur-xs border border-white/10  rounded-2xl overflow-hidden divide-y divide-white/10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-ink-300 mt-1">
                    Add an extra layer of security to your account by requiring
                    a verification code in addition to your password.
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    disabled
                    className="px-4 py-2 border border-white/20 text-sm font-medium rounded-2xl text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/30 disabled:opacity-50 cursor-not-allowed transition-all duration-300"
                  >
                    Enable
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Password
                  </h3>
                  <p className="text-sm text-ink-300 mt-1">
                    Change you password
                  </p>
                </div>
                <div className="ml-4">
                  <Link
                    to="/profile"
                    className="px-4 py-2 border border-white/20 text-sm font-medium rounded-2xl text-white bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-white/30 transition-all duration-300"
                  >
                    Change
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
