'use client'

import { Check } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'
import { WHATSAPP_URL } from '@/lib/site'

const features = [
  'Página responsiva',
  'Botão para WhatsApp',
  'Seções de serviços',
  'Fotos ou portfólio',
  'Informações de contato',
  'Publicação online',
]

export function Pricing() {
  const { ref, inView } = useInView(0.15)

  return (
    <section id="valores" className="py-24 md:py-28 px-6 bg-bg-dark">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className="max-w-4xl mx-auto"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="text-center mb-14">
            <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-3 block">
              Tabela de Valores
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-4 text-balance">
              Um projeto simples para colocar
              <br className="hidden sm:block" /> seu negócio online.
            </h2>
            <div className="gold-divider w-16 mx-auto mt-5" />
          </div>

          <div className="gold-border-glow relative rounded-2xl bg-card shadow-card-hover">
            <div className="relative z-10 p-6 md:p-9">
              <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-start md:gap-10">
                <div className="md:pr-8 md:border-r md:border-[rgba(245,242,235,0.08)]">
                  <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-4 block">
                    Investimento inicial
                  </span>
                  <div className="mb-4">
                    <span className="text-text-muted text-sm block mb-1">
                      A partir de
                    </span>
                    <span className="font-display text-5xl sm:text-6xl font-bold text-shine leading-none">
                      R$ 200
                    </span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">
                    O valor final depende das seções, imagens e funcionalidades
                    necessárias. Na conversa, eu entendo seu caso e passo um
                    orçamento claro antes de começar.
                  </p>
                </div>

                <div>
                  <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-5 block">
                    Inclui
                  </span>
                  <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                    {features.map((feature, i) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3"
                        style={{
                          opacity: inView ? 1 : 0.55,
                          transform: inView ? 'translateX(0)' : 'translateX(-8px)',
                          transition: `opacity 0.35s ease ${0.08 + i * 0.04}s, transform 0.35s ease ${0.08 + i * 0.04}s`,
                        }}
                      >
                        <span className="w-5 h-5 rounded-full bg-[rgba(200,169,107,0.12)] border border-[rgba(200,169,107,0.35)] flex items-center justify-center flex-shrink-0">
                          <Check size={11} className="text-gold" strokeWidth={3} />
                        </span>
                        <span className="text-text-muted text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-8 md:mt-9 w-full flex items-center justify-center gap-2 py-3.5 font-semibold rounded-xl"
              >
                <span className="relative z-10">Pedir orçamento</span>
              </a>
            </div>
          </div>

          <p className="text-center text-xs text-text-muted/70 mt-5">
            Sem fidelidade · Você chama no WhatsApp e recebe uma proposta antes de decidir.
          </p>
        </div>
      </div>
    </section>
  )
}
