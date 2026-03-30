module.exports = {
  apps: [
    {
      name: "ezy-blog",
      cwd: "/var/www/blog.ezydigital.in",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3100
      }
    }
  ]
};