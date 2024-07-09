import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "vi"],
  // localePrefix: 'never',
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(vi|en)/:path*"],
};
