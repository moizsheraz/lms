import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  blogName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const generateUniqueSlug = async () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let slug;

  do {
    slug = Array.from({ length: 10 })
      .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
      .join("");

    const slugExists = await mongoose.models.Blog.findOne({ slug });
    if (!slugExists) break;
  } while (true);

  return slug;
};

blogSchema.pre("save", async function (next) {
  if (!this.slug) {
    this.slug = await generateUniqueSlug();
  }
  this.updatedAt = Date.now();
  next();
});

export const Blog = mongoose.models.Blog ?? mongoose.model("Blog", blogSchema);
