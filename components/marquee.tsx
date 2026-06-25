const items = [
  'Landing pages',
  'Cardápios online',
  'Interfaces web',
  'Marca pessoal',
  'Páginas de serviço',
  'Integração com WhatsApp',
  'Design responsivo',
  'Foco em conversão',
]

export function Marquee() {
  return (
    <section
      id="especialidades"
      className="relative overflow-hidden border-y border-[rgba(200,169,107,0.2)] bg-[linear-gradient(180deg,rgba(15,17,21,0.2),rgba(9,11,15,0.96)_32%,rgba(9,11,15,0.96)_68%,rgba(15,17,21,0.2))] py-7 shadow-[inset_0_1px_0_rgba(245,233,200,0.12),inset_0_-1px_0_rgba(200,169,107,0.16),0_0_28px_rgba(200,169,107,0.055)]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(245,233,200,0.5)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.32)] to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-20 w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(200,169,107,0.075)] blur-3xl" />
      </div>

      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg via-bg/95 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg via-bg/95 to-transparent" />

      <div className="relative flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center">
            {items.map((item, index) => (
              <li
                key={`${dup}-${item}`}
                className="flex items-center whitespace-nowrap px-7 text-[12px] font-semibold uppercase tracking-[0.22em] text-text-muted/80"
              >
                <span className="mr-4 font-display text-[11px] tracking-normal text-gold-foil">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item}</span>
                <span className="ml-7 h-5 w-px bg-gradient-to-b from-transparent via-[rgba(200,169,107,0.42)] to-transparent" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
