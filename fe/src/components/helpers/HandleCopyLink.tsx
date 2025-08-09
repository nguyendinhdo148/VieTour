import Swal from "sweetalert2";

const handleCopyLink = (url: string) => {
  navigator.clipboard
    .writeText(url)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Đã sao chép liên kết!",
        showConfirmButton: false,
        timer: 1500,
        background: "#1e293b",
        color: "#fff",
      });
    })
    .catch((err) => {
      console.error("Lỗi khi sao chép liên kết:", err);
    });
};

export default handleCopyLink;
