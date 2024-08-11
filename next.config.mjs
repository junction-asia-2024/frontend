/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom', // 커스텀 로더 사용
    unoptimized: true, // 이미지 최적화 비활성화
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        port: '',
        pathname: '/6qzLODAqs2g1LZbVYqtuQw/**/*',
      },
      {
        protocol: 'https',
        hostname: 'k.kakaocdn.net',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: 'd1m84t8yekat2i.cloudfront.net',
        port: '',
        pathname: '/**/*',
      },
    ],
  },
};

export default nextConfig;
