export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/blog" || url.pathname.startsWith("/blog/")) {
      // serve SPA shell, keep URL as /blog/{id} (Workers Assets _redirects can't 200-rewrite)
      return env.ASSETS.fetch(new URL("/blog-app.html", url.origin));
    }
    return env.ASSETS.fetch(request);
  },
};