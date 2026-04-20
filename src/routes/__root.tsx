import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { LanguageProvider } from "@/context/LanguageContext";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-bg px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-brand-textPrimary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-brand-textPrimary">Page not found</h2>
        <p className="mt-2 text-sm text-brand-textMuted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primaryDark"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "5GCheck.pk — Pakistan's 5G Phone Compatibility Checker" },
      { name: "description", content: "Instantly check Jazz, Zong & Ufone 5G compatibility for any phone in Pakistan." },
      { name: "author", content: "5GCheck.pk" },
      { property: "og:title", content: "5GCheck.pk — 5G Phone Compatibility for Pakistan" },
      { property: "og:description", content: "Check Jazz, Zong & Ufone 5G compatibility for any phone instantly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}
