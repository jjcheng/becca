/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: false
      },
      {
        source: "/menu.html",
        destination: "/cafe-menu",
        permanent: false
      },
      {
        source: "/cakes-bakes",
        destination: "/cafe-menu",
        permanent: false
      },
      {
        source: "/cakes-bakes.html",
        destination: "/cafe-menu",
        permanent: false
      },
      {
        source: "/order.html",
        destination: "/order",
        permanent: false
      },
      {
        source: "/visit.html",
        destination: "/visit-us",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
