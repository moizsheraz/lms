import axios from "axios";

// Fetch all blogs
export const fetchBlogs = async () => {
  try {
    const response = await axios.get("/api/blog/getAll");
    return response.data.blogs;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch blogs.");
  }
};

// Fetch a blog by slug
export const fetchBlogBySlug = async (slug) => {
  try {
    const response = await axios.post("/api/blog", { action: "fetch", slug });
    return response.data.blog;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch blog.");
  }
};

// Create a new blog
export const createBlog = async (blogData) => {
  try {
    const response = await axios.post("/api/blog", {
      action: "create",
      ...blogData,
    });
    return response.data.blog;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create blog.");
  }
};

// Update a blog by slug
export const updateBlogBySlug = async (blogData) => {
  try {
    const response = await axios.put("/api/blog", blogData);
    return response.data.blog;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update blog.");
  }
};

// Delete a blog by slug
export const deleteBlogBySlug = async (slug) => {
  try {
    const response = await axios.post("/api/blog", { action: "delete", slug });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete blog.");
  }
};

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/category/getAll");
    return response.data.categories;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch categories.");
  }
};


// Fetch a category by ID
export const fetchCategoryById = async (id) => {
  try {
    const response = await axios.post("/api/category", { action: "fetch", id });
    return response.data.category;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch category.");
  }
};

// Create a new category
export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post("/api/category", {
      action: "create",
      ...categoryData,
    });
    return response.data.category;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create category.");
  }
};

// Update a category by ID
export const updateCategoryById = async (categoryData) => {
  try {
    const response = await axios.put("/api/category", categoryData);
    return response.data.category;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update category.");
  }
};

// Delete a category by ID
export const deleteCategoryById = async (id) => {
  try {
    const response = await axios.post("/api/category", { action: "delete", id });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete category.");
  }
};

// Fetch all blogs by teacher
export const fetchTeacherBlogs = async () => {
  try {
    const response = await axios.post("/api/blog/getTeacherBlog", {
      action: "fetchByTeacher",
    });
    return response.data.blogs;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch blogs.");
  }
};

// Fetch teacher courses analytics
export const fetchTeacherAnalytics = async (teacherId) => {
  if (!teacherId) {
    throw new Error("Teacher ID is required");
  }

  try {
    const response = await axios.get(`/api/teacher/analytics/${teacherId}`);
    return response.data.courses;
  } catch (error) {
    console.error("Error fetching teacher analytics:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch teacher analytics.");
  }
};

// Fetch all approved teachers
export const fetchApprovedTeachers = async () => {
  try {
    const response = await axios.get("/api/teacher/getAll"); 
    return response.data.teachers;
  } catch (error) {
    console.error("Error fetching approved teachers:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch approved teachers.");
  }
};