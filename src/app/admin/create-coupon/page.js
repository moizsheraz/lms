"use client";
import CreateCouponMainPage from '@/components/admin/createCoupon/createCouponMainPage/createCouponMainPage';
import AdminLayout from '@/components/layout/adminLayout/adminLayout';
import React, { Suspense } from 'react';

// Child component handling any dynamic `useSearchParams` logic, if needed
const CreateCouponContent = () => {
  return <CreateCouponMainPage />;
};

// Main component with Suspense wrapper
const CreateCoupon = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<p>Loading coupon creation form...</p>}>
        <CreateCouponContent />
      </Suspense>
    </AdminLayout>
  );
};

export default CreateCoupon;
