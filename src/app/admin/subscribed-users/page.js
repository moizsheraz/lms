"use client";
import React, { useState, useEffect } from "react";
import LoadingScreen from "@/components/common/loading/Loading";
import AdminLayout from "@/components/layout/adminLayout/adminLayout";
import { fetchSubscribers } from "@/app/utils/common/newslatter/api";

const SubscribedUsers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSubscribers = async () => {
      try {
        const response = await fetchSubscribers();
        setSubscribers(response);
      } catch (err) {
        setError("Failed to load subscribers.");
      } finally {
        setLoading(false);
      }
    };

    loadSubscribers();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <AdminLayout>
      <div className="p-2 md:p-4 lg:p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Subscribed Users
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {subscribers.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full bg-gray-100 border border-gray-200">
              <thead>
                <tr className="bg-white">
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date Subscribed
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subscriber.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscriber.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6">
            No subscribers found.
          </p>
        )}
      </div>
    </AdminLayout>
  );
};

export default SubscribedUsers;
