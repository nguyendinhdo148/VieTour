import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BlogEditor from "../editor/BlogEditor";
import { API } from "@/utils/constant";
import { setSingleBlog } from "@/redux/blogSlice";
import Swal from "sweetalert2";
import { Blog } from "@/types/blog";

const UpdateBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBlog, setIsLoadingBlog] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [originalData, setOriginalData] = useState<Blog | null>(null);

  const { user } = useSelector((store: RootState) => store.auth);
  const { singleBlog } = useSelector((store: RootState) => store.blog);

  // Load dữ liệu blog ban đầu
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const loadBlogData = async () => {
      setIsLoadingBlog(true);
      try {
        const res = await axios.get(`${API}/blog/detail/update/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const blog = res.data.blog;
          dispatch(setSingleBlog(blog));
          setOriginalData(blog);
          setImagePreview(blog.image?.url || "");
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
    loadBlogData();
  }, [id, user, dispatch, navigate]);

  // Xử lý thay đổi tiêu đề
  const handleTitleChange = (title: string) => {
    dispatch(setSingleBlog({ ...singleBlog, title }));
  };

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (category: string) => {
    dispatch(setSingleBlog({ ...singleBlog, category }));
  };

  // Xử lý thay đổi nội dung
  const handleContentChange = (content: string) => {
    dispatch(setSingleBlog({ ...singleBlog, content }));
  };

  //  Tag
  const handleAddTag = () => {
    if (tagInput.trim() && !singleBlog?.tags.includes(tagInput.trim())) {
      dispatch(
        setSingleBlog({
          ...singleBlog,
          tags: [...[singleBlog?.tags], tagInput.trim()],
        })
      );
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    dispatch(
      setSingleBlog({
        ...singleBlog,
        tags: singleBlog?.tags.filter((tag) => tag !== tagToRemove),
      })
    );
  };

  // Ảnh upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    dispatch(
      setSingleBlog({
        ...singleBlog,
        image: { url: file },
      })
    );
    setImagePreview(URL.createObjectURL(file));
  };

  // Validator
  const validateForm = (): boolean => {
    if (!singleBlog?.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề");
      return false;
    }
    if (!singleBlog?.content.trim()) {
      toast.error("Vui lòng nhập nội dung");
      return false;
    }
    if (!singleBlog?.category.trim()) {
      toast.error("Vui lòng nhập danh mục");
      return false;
    }
    return true;
  };

  //  Submit cập nhật
  const handleUpdate = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    const blogFormData = new FormData();
    blogFormData.append("title", singleBlog?.title || "");
    blogFormData.append("content", singleBlog?.content || "");
    blogFormData.append("category", singleBlog?.category || "");
    blogFormData.append("tags", singleBlog?.tags.join(", ") || "");

    if (singleBlog?.image?.url) {
      blogFormData.append("file", singleBlog?.image.url);
    }

    try {
      const res = await axios.put(
        `${API}/blog/update-blog/${id}`,
        blogFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success("Cập nhật bài viết thành công!");
        navigate(
          user?.role === "admin" ? "/admin/blogs" : "/blog/manager-blogs"
        );
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

  // Kiểm tra thay đổi
  const hasChanges = (): boolean => {
    if (!originalData || !singleBlog) return false;
    const current = {
      ...singleBlog,
      image: {
        url:
          typeof singleBlog.image.url === "string" ? singleBlog.image.url : "",
      },
    };
    const original = {
      ...originalData,
      image: { url: originalData.image.url },
    };
    return JSON.stringify(current) !== JSON.stringify(original);
  };

  const handleCancel = async () => {
    if (hasChanges()) {
      const result = await Swal.fire({
        title: "Bạn có chắc muốn hủy bài viết đang thay đổi này?",
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

  // Loading
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
    <div className="max-w-5xl mx-auto p-4 my-10 md:p-8 bg-white rounded-xl shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Chỉnh sửa bài viết</h1>
      </div>

      {hasChanges() && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <p className="text-yellow-700 font-medium">
            Bạn có thay đổi chưa được lưu
          </p>
        </div>
      )}

      {/* Tiêu đề */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tiêu đề <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={singleBlog?.title || ""}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Nhập tiêu đề bài viết..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Danh mục */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Danh mục <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={singleBlog?.category || ""}
          onChange={(e) => handleCategoryChange(e.target.value)}
          placeholder="Nhập danh mục..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Ảnh */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ảnh đại diện
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Ảnh đại diện"
            className="mt-3 max-w-[300px] rounded-lg border"
          />
        )}
      </div>

      {/* Tags */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Nhập tag và nhấn Enter"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            onKeyUp={(e) => e.key === "Enter" && handleAddTag()}
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thêm
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {singleBlog?.tags?.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-blue-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="mb-8">
        <BlogEditor
          content={singleBlog?.content || ""}
          onContentChange={handleContentChange}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-between flex-col sm:flex-row gap-4">
        <button
          onClick={handleCancel}
          className="px-6 py-3 border cursor-pointer border-gray-300 bg-white rounded-lg hover:bg-gray-50"
        >
          Hủy
        </button>
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Đang cập nhật..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
};

export default UpdateBlog;
