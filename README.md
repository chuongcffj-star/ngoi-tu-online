# Ngồi Tu Online

Game tu tiên nhiều người chơi bản demo, dùng Node.js + Express + Socket.IO.

## Chạy trên máy tính

1. Cài Node.js bản LTS từ https://nodejs.org/
2. Giải nén thư mục này.
3. Mở thư mục `ngoi_tu_online` trong VS Code.
4. Mở Terminal trong VS Code và chạy:

   ```bash
   npm install
   npm start
   ```

5. Mở trình duyệt tại http://localhost:3000
6. Nhập đạo hiệu rồi bấm **Vào game**.

## Cho người khác cùng chơi trong cùng Wi-Fi

- Tìm địa chỉ IPv4 của máy chạy server bằng lệnh `ipconfig` trong Command Prompt.
- Người chơi khác mở `http://DIA-CHI-IP:3000`, ví dụ `http://192.168.1.5:3000`.
- Cần cho phép Node.js qua Windows Firewall trên mạng riêng nếu Windows hỏi.

## Chơi qua Internet

Bạn cần triển khai server lên một dịch vụ hosting hỗ trợ Node.js/WebSocket hoặc cấu hình mạng phù hợp. Không chia sẻ địa chỉ IP riêng tư công khai nếu không cần thiết.

## Lưu ý

- Bản demo lưu dữ liệu trong bộ nhớ máy chủ; khi người chơi ngắt kết nối hoặc máy chủ khởi động lại, dữ liệu sẽ mất.
- Chưa có tài khoản/mật khẩu, lưu dữ liệu lâu dài, chat hay chống gian lận nâng cao.
- Đây là dự án học tập; trước khi mở công khai nên bổ sung xác thực, giới hạn tần suất và cơ sở dữ liệu.
