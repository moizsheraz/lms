// pages/admin/login.js
import AdminLoginForm from "@/components/adminLoginForm/adminLoginForm";
import React from "react";

const AdminLogin = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-lg w-full max-w-md">
        <h1 className="text-3xl mb-4 font-bold text-center text-headingColor">
          Admin Login
        </h1>
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;
