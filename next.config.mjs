/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Modo estricto de React para detectar errores en desarrollo
    swcMinify: true, // Optimización con SWC para mejorar rendimiento
    output: 'standalone',
    
    async rewrites() {
      return [
        {
          source: "/api/ventas",
          destination: "http://192.168.1.78:9000/ventas", // Proxy a la API de ventas
        },
       
      ];
    },
  
    async headers() {
      return [
        {
          source: "/api/:path*", 
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // Permite llamadas desde cualquier origen (útil si hay problemas de CORS)
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  