import type { ReactNode } from "react";

/**
 * Locale-specific layout.
 * This is where we can add i18n providers or locale-specific logic in the future.
 * For now, it's a minimal wrapper that accepts the locale parameter.
 */
interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // For now we don't do much with locale, but keep this layer for future i18n.
  const { locale: _locale } = await params;
  return <>{children}</>;
}

