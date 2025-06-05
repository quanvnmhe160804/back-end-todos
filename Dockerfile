# Dockerfile
FROM node:18

# Tạo thư mục app
WORKDIR /app

# Copy package trước để cache cài đặt
COPY package*.json ./
RUN npm install

# Copy toàn bộ source
COPY . .

# Port app chạy (ví dụ: 3000)
EXPOSE 3000

# Lệnh chạy app
CMD ["npm", "start"]
