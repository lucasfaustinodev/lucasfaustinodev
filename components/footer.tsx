export function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-[rgba(245,242,235,0.07)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-[rgba(200,169,107,0.1)] border border-[rgba(200,169,107,0.28)] flex items-center justify-center text-gold-foil font-bold text-xs">
            LF
          </span>
          <span className="text-sm font-medium text-text-muted">
            Lucas Faustino
          </span>
        </div>

        <p className="text-xs text-text-muted/50 tracking-wide text-center">
          &copy; {new Date().getFullYear()} Lucas Faustino Dev. Todos os
          direitos reservados.
        </p>
      </div>
    </footer>
  )
}
