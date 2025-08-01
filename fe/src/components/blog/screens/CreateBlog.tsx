import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogEditor from "../editor/BlogEditor";
import toast from "react-hot-toast";
import { API } from "@/utils/constant";
import axios from "axios";
import Navbar from "@/components/shared/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface BlogFormData {
  title: string;
  content: string;
  image: string | File;
  tags: string[];
  category: string;
}

const CreateBlog = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    image: "",
    tags: [],
    category: "",
  });

  const { user } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

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

  const handleCreateBlog = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const blogFormData = new FormData();
      blogFormData.append("title", formData.title);
      blogFormData.append("content", formData.content);
      blogFormData.append("category", formData.category);
      blogFormData.append("tags", JSON.stringify(formData.tags));

      if (formData.image) {
        blogFormData.append("file", formData.image);
      }

      const response = await axios.post(
        `${API}/blog/create-blog`,
        blogFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Xuất bản bài viết thành công!");
        navigate("/blog/manager-blogs");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error publishing blog:", error.response?.data || error);
        toast.error(
          error.response?.data?.message || "Có lỗi xảy ra khi xuất bản bài viết"
        );
      } else {
        console.error("Error publishing blog:", error);
        toast.error("Có lỗi xảy ra khi xuất bản bài viết");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/blog/manager-blogs");
  };

  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="max-w-4xl my-6 mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Tạo bài viết mới</h1>

        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tiêu đề *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Nhập tiêu đề bài viết..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Danh mục *
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            placeholder="Nhập danh mục (ví dụ: Công nghệ, Lối sống, Kinh doanh...)"
            list="categories"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <datalist id="categories">
            <option value="Công nghệ" />
            <option value="Lối sống" />
            <option value="Kinh doanh" />
            <option value="Giáo dục" />
            <option value="Sức khỏe" />
            <option value="Du lịch" />
            <option value="Ẩm thực" />
          </datalist>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ảnh đại diện
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imagePreview && (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-w-xs h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Nhập tag, nhấn Enter hoặc nút Thêm"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Thêm
            </button>
          </div>
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

        {/* Content Editor & preview */}
        <BlogEditor
          content={formData.content}
          onContentChange={handleContentChange}
        />

        {/* Action Buttons */}
        <div className="flex gap-4 justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 cursor-pointer border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Hủy
          </button>

          <div className="flex gap-4">
            {/* <button
            type="button"
            onClick={handleSaveDraft}
            disabled={isLoading}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50"
          >
            {isLoading ? "Đang lưu..." : "Lưu bản nháp"}
          </button> */}
            <button
              type="button"
              onClick={handleCreateBlog}
              disabled={isLoading}
              className="px-6 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Đang xuất bản..." : "Xuất bản"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
