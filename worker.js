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
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const response = await fetch(request);

  // if the page was not found
  if (response.status === 404) {
    // we return our custom 404 page
    return await fetch("https://hackrvt.xyz/error/404/");
  }

  // otherwise we return the original response
  return response;
}