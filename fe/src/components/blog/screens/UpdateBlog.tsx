import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BlogEditor from "../editor/BlogEditor";
import { API } from "@/utils/constant";
import Swal from "sweetalert2";

interface BlogFormData {
  title: string;
  content: string;
  image: {
    url: string | File;
  };
  tags: string[];
  category: string;
}

const UpdateBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Loading khi submit
  const [isLoadingBlog, setIsLoadingBlog] = useState(false); // Loading khi lấy dữ liệu
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    image: {
      url: "",
    },
    tags: [],
    category: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [originalData, setOriginalData] = useState<BlogFormData | null>(null);
  const { user } = useSelector((store: RootState) => store.auth);

  const loadBlogData = async (id: string) => {
    setIsLoadingBlog(true);
    try {
      const res = await axios.get(`${API}/blog/detail/update/${id}`, {
        withCredentials: true,
      });
      if (res.data.success && res.data.blog) {
        const blog = res.data.blog;
        setFormData({
          title: blog.title,
          content: blog.content,
          image: { url: blog.image.url },
          tags: blog.tags,
          category: blog.category,
        });
        setOriginalData({
          title: blog.title,
          content: blog.content,
          image: blog.image.url,
          tags: blog.tags,
          category: blog.category,
        });
        setImagePreview(blog.image.url);
      } else {
        throw new Error("Không thể tải dữ liệu bài viết");
      }
    } catch (error) {
      console.error("Error loading blog:", error);
      toast.error("Có lỗi xảy ra khi tải bài viết");
      navigate("/blog/manager-blogs");
    } finally {
      setIsLoadingBlog(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (id) {
      loadBlogData(id);
    }
  }, [id, user, navigate]);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
    }));
  };

  // Xử lý tag
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Xử lý ảnh upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      image: { url: file },
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  // Validator
  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề");
      return false;
    }
    if (!formData.content.trim()) {
      toast.error("Vui lòng nhập nội dung");
      return false;
    }
    if (!formData.category.trim()) {
      toast.error("Vui lòng nhập danh mục");
      return false;
    }
    return true;
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  // Submit cập nhật bài viết
  const handleUpdate = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    const blogFormData = new FormData();
    blogFormData.append("title", formData.title);
    blogFormData.append("content", formData.content);
    blogFormData.append("category", formData.category);
    blogFormData.append("tags", formData.tags.join(", "));

    if (formData.image.url) {
      blogFormData.append("file", formData.image.url);
    }

    try {
      const res = await axios.put(
        `${API}/blog/update-blog/${id}`,
        blogFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Cập nhật bài viết thành công!");
        console.log(res.data.updatedBlog);

        if (user?.role === "admin") {
          navigate(`/admin/blogs`);
        } else navigate(`/blog/manager-blogs`);
      } else {
        throw new Error(res.data.message || "Lỗi khi cập nhật bài viết");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Có lỗi xảy ra khi cập nhật bài viết");
    } finally {
      setIsLoading(false);
    }
  };

  // Kiểm tra thay đổi để cảnh báo khi rời trang
  const hasChanges = (): boolean => {
    if (!originalData) return false;
    return JSON.stringify(formData) !== JSON.stringify(originalData);
  };

  const handleCancel = async () => {
    if (hasChanges()) {
      const result = await Swal.fire({
        title: "Bạn có chắc muốn hủy bài viết đang thay đổi này ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Có",
        cancelButtonText: "Hủy",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });
      if (result.isConfirmed) {
        navigate("/blog/manager-blogs");
      }
    } else {
      navigate("/blog/manager-blogs");
    }
  };

  // Loading khi lấy dữ liệu
  if (isLoadingBlog) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold">
          Đang tải dữ liệu bài viết...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Chỉnh sửa bài viết</h1>
      </div>

      {/* Warning alert */}
      {hasChanges() && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="flex items-center gap-2 text-yellow-700 font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M12 21c4.968 0 9-4.032 9-9s-4.032-9-9-9-9 4.032-9 9 4.032 9 9 9z"
              />
            </svg>
            <span>Bạn có thay đổi chưa được lưu</span>
          </p>
        </div>
      )}

      {/* Title Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tiêu đề <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Nhập tiêu đề bài viết..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Category Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Danh mục <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
          placeholder="Nhập danh mục (ví dụ: Công nghệ, Lối sống, Kinh doanh...)"
          list="categories"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <datalist id="categories">
          <option value="Công nghệ" />
          <option value="Lối sống" />
          <option value="Kinh doanh" />
          <option value="Giáo dục" />
          <option value="Sức khỏe" />
        </datalist>
      </div>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ảnh đại diện (để trống nếu không thay đổi)
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Ảnh đại diện bài viết"
              className="max-w-[300px] h-auto rounded-lg border border-gray-200"
            />
          </div>
        )}
      </div>

      {/* Tags Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Nhập tag, nhấn Enter hoặc nút Thêm"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Thêm
          </button>
        </div>

        {/* Render tags */}
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2"></label>
        <BlogEditor
          content={formData.content}
          onContentChange={handleContentChange}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-3 cursor-pointer border border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Hủy
        </button>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-6 py-3 cursor-pointer bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Đang cập nhật..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
