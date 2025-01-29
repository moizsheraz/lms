import axios from "axios";

export const createCoupon = async (couponData) => {
  const response = await axios.post("/api/admin/coupon/create", couponData);
  return response.data;
};

export const deleteCoupon = async (id) => {
  const response = await axios.delete("/api/admin/coupon/delete", { data: { id } });
  return response.data;
};

export const updateCoupon = async (couponData) => {
  const response = await axios.put("/api/admin/coupon/edit", couponData);
  return response.data;
};

export const getAllCoupons = async () => {
  const response = await axios.post("/api/admin/coupon/getAll");
  return response.data;
};

export const applyCoupon = async (code, price) => {
  const response = await axios.post("/api/admin/coupon/applycoupon", { code, price });
  return response.data;
};