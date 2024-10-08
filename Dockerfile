# Next.js를 실행하기 위한 Node.js 이미지 사용
FROM node:18-alpine

# 앱 디렉터리 생성
WORKDIR /app

# 종속성 설치
COPY package*.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# Next.js 애플리케이션 빌드
RUN npm run build

# Next.js 애플리케이션 실행
EXPOSE 3000
CMD ["npm", "run", "start"]
