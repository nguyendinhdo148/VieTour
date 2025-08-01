import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";
import slugify from "slugify";

function generateBlogSlug(title, fullname, authorId) {
  const titleSlug = slugify(title, { lower: true, strict: true });
  const created_by = slugify(fullname, { lower: true, strict: true });
  const idSuffix = authorId.slice(-6);
  return `${titleSlug}-${created_by}-${idSuffix}`;
}

// create blog
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, tags, category } = req.body;

    const authorId = req.id; // middleware authentication

    // console.log(req.body);

    if (!title || !content || !category) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const blog_existed = await Blog.findOne({ title, created_by: authorId });
    if (blog_existed) {
      return res.status(400).json({
        message: "Blog with this title already exists.",
        success: false,
      });
    }

    // Handle file upload
    let image = null;
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        image = cloudResponse.secure_url;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res.status(500).json({
          message: "Error uploading profile photo",
          success: false,
        });
      }
    }

    const info_author = await User.findById(authorId).select("_id fullname");

    const slug = generateBlogSlug(
      title,
      info_author.fullname,
      info_author._id.toString()
    );

    let tagsArr;
    if (tags) {
      tagsArr = tags.split(", ").map((tag) => tag.trim());
    }

    // create job
    const newBlog = await Blog.create({
      title,
      slug: slug,
      content,
      image: image,
      tags: tagsArr,
      category,
      created_by: authorId,
    });

    return res.status(201).json({
      message: "Blog created successfully.",
      newBlog,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get blog by slug
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blogBySlug = req.params.slug;

    const blog = await Blog.findOneAndUpdate(
      { slug: blogBySlug },
      { $inc: { views: 1 } },
      { new: true }
    )
      .select("-_id -__v")
      .populate(
        "created_by",
        "_id fullname email phoneNumber profile.profilePhoto"
      );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blog retrieved successfully.",
      blog,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get blog by id to update blog
export const getBlogUpdateById = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id; // middleware authentication

    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const blog = await Blog.findById(blogId)
      .select("-_id -__v")
      .populate("created_by", "_id");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
        success: false,
      });
    }

    if (blog.created_by._id.toString() !== authorId && user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to update this blog.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blog retrieved successfully.",
      blog,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBlog = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("created_by", "_id fullname email profile.profilePhoto");

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        message: "No blogs found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blogs retrieved successfully.",
      blogsCount: blogs.length,
      blogs,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get blogs by author
export const getBlogsByAuthor = async (req, res, next) => {
  try {
    const authorId = req.id; // middleware authentication

    const blogs = await Blog.find({ created_by: authorId }).sort({
      createdAt: -1,
    });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({
        message: "No blogs found for this author.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Blogs retrieved successfully.",
      blogsCount: blogs.length,
      blogs,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get blog random Blogs
export const getBlogRandomBlogs = async (req, res, next) => {
  try {
    const { currentSlug } = req.query;

    const randomBlogs = await Blog.aggregate([
      {
        $match: {
          slug: { $ne: currentSlug },
        },
      },
      { $sample: { size: 5 } },
    ]);

    if (!randomBlogs || randomBlogs.length === 0) {
      return res.status(200).json({
        message: "No random blogs found.",
        randomBlogs: [],
        success: true,
      });
    }

    return res.status(200).json({
      message: "Random blogs retrieved successfully.",
      randomBlogs,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update blog
export const updateBlog = async (req, res, next) => {
  try {
    const { title, content, tags, category } = req.body;
    const blogId = req.params.id;

    const authorId = req.id; // middleware authentication

    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const blog = await Blog.findById(blogId)
      .select("-_id -__v")
      .populate("created_by", "_id fullname");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
        success: false,
      });
    }

    if (blog.created_by._id.toString() !== authorId && user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to update this blog.",
        success: false,
      });
    }

    // Handle file upload
    let image = null;
    if (req.file) {
      try {
        const fileUri = getDataUri(req.file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        image = cloudResponse.secure_url;
      } catch (uploadError) {
        console.error("File upload error:", uploadError);
        return res.status(500).json({
          message: "Error uploading profile photo",
          success: false,
        });
      }
    }

    let updateData = {
      title: title || blog.title,
      content: content || blog.content,
      category: category || blog.category,
      image: image || blog.image,
    };

    const slug = generateBlogSlug(
      updateData.title,
      blog.created_by.fullname,
      blog.created_by._id.toString()
    );

    updateData.slug = slug;

    if (tags) {
      updateData.tags = tags.split(", ").map((tag) => tag.trim());
    } else {
      updateData.tags = blog.tags;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Blog updated successfully.",
      updatedBlog,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// delete blog
export const deleteBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const authorId = req.id; // middleware authentication

    const user = await User.findById(authorId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    const blog = await Blog.findById(blogId)
      .select("-_id -__v")
      .populate("created_by", "_id fullname");

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found.",
        success: false,
      });
    }

    if (blog.created_by._id.toString() !== authorId && user.role !== "admin") {
      return res.status(403).json({
        message: "You are not authorized to delete this blog.",
        success: false,
      });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
      message: "Blog deleted successfully.",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
