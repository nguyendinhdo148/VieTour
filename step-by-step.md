# Hướng dẫn cài đặt và cấu hình VieJobs

## Yêu cầu tiền điều kiện

1. Node.js phiên bản 18.0.0 trở lên
2. MongoDB đã được cài đặt
3. Git
4. VS Code (khuyến nghị)

## Bước 1: Clone dự án

```bash
git clone <repository-url>
cd VieJobs
```

## Bước 2: Cài đặt Backend

1. Di chuyển vào thư mục backend:
```bash
cd be
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` trong thư mục `be` với nội dung:
```env
MONGO_URI=
PORT=8000
SECRET_KEY=
REFRESH_SECRET_KEY=
EMAIL_USER=
EMAIL_PASSWORD=
FRONTEND_URL=
API_SECRET=
API_KEY=
CLOUD_NAME=
OPENAI_API_KEY=
```

4. Khởi động server phát triển:
```bash
npm run dev
```

## Bước 3: Cài đặt Frontend

1. Mở terminal mới, di chuyển vào thư mục frontend:
```bash
cd fe
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Khởi động ứng dụng:
```bash
npm run dev
```

## Bước 4: Cấu hình Database

1. Đảm bảo MongoDB đang chạy
2. Database sẽ tự động được tạo khi khởi động backend
3. Dữ liệu mẫu sẽ được seed tự động

## Bước 5: Truy cập ứng dụng

- http://localhost:5173

