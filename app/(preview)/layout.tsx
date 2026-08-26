/**
 * Bare shell for template previews.
 *
 * No Rexovi navigation, footer or cursor — a template demo has to stand on
 * its own. Each template brings its own tokens, scoped to its wrapper, so
 * nothing here leaks the Rexovi palette into it.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
