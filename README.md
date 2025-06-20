
# ỨNG DỤNG WEB MÃ QR

## GIỚI THIỆU

Ứng dụng web hỗ trợ người dùng:
- Tạo mã QR từ văn bản hoặc đường dẫn URL
- Quét mã QR bằng camera thiết bị
- Đăng ký, đăng nhập và xác thực người dùng bằng JWT

Ứng dụng được xây dựng bằng **Next.js App Router**, sử dụng **MongoDB Atlas** để lưu dữ liệu người dùng và mã QR. Giao diện được thiết kế với **TailwindCSS**. 

Ảnh chụp minh họa:
![Ảnh minh họa](https://soict.hust.edu.vn/wp-content/uploads/logo-soict-hust-1-1024x416.png)

---

## TÁC GIẢ

- Tên nhóm: **Cá nhân**
- Thành viên trong nhóm:

| STT | Họ tên           | MSSV       |
|----:|------------------|------------|
| 1   | Lương Tiến Dũng | 20232013P  |

---

## MÔI TRƯỜNG HOẠT ĐỘNG

- Ứng dụng chạy tốt trên máy tính và thiết bị di động có trình duyệt hỗ trợ camera (Chrome, Safari, ...)
- Server backend và frontend cùng nằm trong ứng dụng Next.js được deploy trên **Vercel**
- Cơ sở dữ liệu lưu trữ bằng **MongoDB Atlas (Cloud)**
- Hệ thống vận hành trên nền **Linux** tại môi trường build của Vercel

Sơ đồ tích hợp hệ thống:
```
[Trình duyệt người dùng] ─┬─> Next.js App Router (Vercel Hosting)
                          └─> API Route xử lý đăng nhập, đăng ký, sinh QR
                                  └─> MongoDB Atlas (Cloud Database)
```

---

## HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY THỬ

```bash
# 1. Clone project
$ git clone https://github.com/your-username/qr-code-reader.git
$ cd qr-code-reader

# 2. Cài đặt dependencies
$ npm install

# 3. Tạo file .env.local
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/myqrapp?retryWrites=true&w=majority
JWT_SECRET=your-super-secret

# 4. Chạy ứng dụng
$ npm run dev
```

- Truy cập tại `http://localhost:3000`
- Tự test:
  - Vào trang `/register` để tạo tài khoản
  - Đăng nhập tại `/login`
  - Truy cập `/generate` và `/scan` để sử dụng chức năng chính

---

## NGUYÊN LÝ CƠ BẢN

### TÍCH HỢP HỆ THỐNG

- Phần mềm:
  - **Frontend & Backend**: Cùng trong project Next.js (`/src/app/...`)
  - **Database**: MongoDB Atlas, kết nối thông qua Mongoose
  - **Middleware**: JWT Middleware bảo vệ route yêu cầu xác thực

### CÁC THUẬT TOÁN CƠ BẢN

- Mã hóa mật khẩu bằng Bcrypt:
  ```ts
  const hash = await bcrypt.hash(password, 10);
  ```
- Tạo token JWT:
  ```ts
  const token = jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: '7d' });
  ```
- Giải mã token JWT:
  ```ts
  const decoded = jwt.verify(token, JWT_SECRET);
  ```

### THIẾT KẾ CƠ SỞ DỮ LIỆU

- **Collection: users**
  ```ts
  {
    username: String,
    password: String, // hashed
    createdAt: Date,
    updatedAt: Date
  }
  ```
- Cấu hình `.env.local`:
  ```env
  MONGODB_URI=...
  JWT_SECRET=...
  ```

### CÁC PAYLOAD

- **Đăng ký**:
  ```json
  POST /api/auth/register
  {
    "username": "dunglt",
    "password": "123456"
  }
  ```
- **Đăng nhập**:
  ```json
  POST /api/auth/login
  {
    "username": "dunglt",
    "password": "123456"
  }
  ```
- **Phản hồi thành công**:
  ```json
  {
    "token": "<JWT_TOKEN>",
    "username": "dunglt"
  }
  ```

### ĐẶC TẢ HÀM

- `registerUser(data)`:
  - Tạo người dùng mới và lưu vào MongoDB
  - Kiểm tra trùng username trước khi lưu
- `loginUser(data)`:
  - Kiểm tra thông tin đăng nhập và tạo JWT
- `verifyJwt(token)`:
  - Xác minh và trích xuất thông tin từ token JWT

```ts
/**
 * Tạo token từ thông tin người dùng
 * @param userId ID của người dùng
 * @param username tên tài khoản
 */
function generateJwt(userId: string, username: string): string { ... }
```

---

## PHÁT SINH

- ❗ **Lỗi:** `Please define the MONGODB_URI environment variable`
  - Nguyên nhân: Quên cấu hình biến môi trường trên Vercel
  - Giải pháp: Thêm trong dashboard > Project > Settings > Environment Variables

- ❗ **Lỗi ESLint/TypeScript khi build**
  - Nguyên nhân: Quy tắc chặt trong Next.js
  - Giải pháp: Thêm `ignoreDuringBuilds: true` vào `next.config.js`

---

## KẾT QUẢ

### Một số ảnh giao diện minh họa (nếu có):
- Đăng ký / Đăng nhập
- Trang tạo QR
- Trang quét QR (hiển thị kết quả)

---

## License
This project is for educational purposes.
