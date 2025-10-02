import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";
import { BlogContent } from "../components/BlogContent";

interface BlogEditorProps {
  content: string;
  onContentChange: (content: string) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  content,
  onContentChange,
}) => {
  const editorRef = useRef<TinyMCEEditor>(null);

  const handleContentChange = (content: string) => {
    onContentChange(content);
  };

  // console.log(content)

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Nội dung *
      </label>
      <Editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        value={content}
        onEditorChange={handleContentChange}
        initialValue="<p>Viết nội dung bài viết tại đây...</p>"
        init={{
          height: 600,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic underline forecolor backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | image media link | code preview fullscreen | help",
          automatic_uploads: true,
          image_title: true,
          file_picker_types: "image",
          file_picker_callback: (cb) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = async function () {
              const file = (this as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  const base64 = reader.result as string;
                  cb(base64, { title: file.name });
                };
                reader.readAsDataURL(file);
              }
            };

            input.click();
          },
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px; }",
        }}
      />

      {/* Optional: Hiển thị preview bài viết */}
      {content && <BlogContent content={content} />}
    </div>
  );
};

export default BlogEditor;
