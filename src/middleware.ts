import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "vi"],
  // localePrefix: "never",
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|tracking_pixel|accept-invitation|.*\\..*).*)"],
};
