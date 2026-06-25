'use client'

import type { ElementType } from 'react'
import { Layout, Monitor, Lightbulb } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const services = [
  {
    icon: Layout,
    label: 'Apresentação',
    title: 'Landing Pages',
    description:
      'Páginas para apresentar seus serviços, fotos, valores, dúvidas frequentes e uma forma clara de contato.',
  },
  {
    icon: Monitor,
    label: 'Organização',
    title: 'Interfaces Web',
    description:
      'Telas simples para organizar pedidos, cadastros, atendimentos ou informações internas do seu negócio.',
  },
  {
    icon: Lightbulb,
    label: 'Validação',
    title: 'Produtos Digitais',
    description:
      'Protótipos e ferramentas leves para testar uma ideia antes de investir em algo maior.',
  },
]

const audience = [
  'Salões',
  'Manicures',
  'Barbearias',
  'Restaurantes',
  'Hamburguerias',
  'Choperias',
  'Prestadores de serviço',
  'Profissionais autônomos',
  'Projetos digitais em fase inicial',
]

export function Services() {
  const { ref: headRef, inView: headIn } = useInView(0.2)
  const { ref: audRef, inView: audIn } = useInView(0.2)

  return (
    <>
      <section id="servicos" className="py-24 md:py-28 px-6 relative">
        <div className="absolute inset-x-0 top-0 pointer-events-none">
          <div className="gold-divider" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div
            ref={headRef}
            className="mb-16 max-w-3xl mx-auto text-center"
            style={{
              opacity: headIn ? 1 : 0,
              transform: headIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-3 block">
              O que eu faço
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-4 text-balance">
              Serviços para apresentar melhor
              <br className="hidden md:block" /> o que você vende.
            </h2>
            <div className="gold-divider w-16 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {services.map(({ icon, label, title, description }, i) => (
              <ServiceCard
                key={title}
                Icon={icon}
                label={label}
                title={title}
                description={description}
                delay={i * 0.12}
                featured={i === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-bg-dark">
        <div className="max-w-6xl mx-auto">
          <div
            ref={audRef}
            style={{
              opacity: audIn ? 1 : 0,
              transform: audIn ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-3 block text-center">
              Para quem eu crio
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-4 text-balance text-center">
              Para quem vende, atende ou recebe
              <br className="hidden md:block" /> pedidos pelo digital.
            </h2>
            <div className="gold-divider w-16 mx-auto mt-5 mb-9" />

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {audience.map((item, i) => (
                <span
                  key={item}
                  className="px-4 py-2 text-sm font-medium text-text-muted border border-[rgba(245,242,235,0.08)] rounded-full bg-card hover:border-[rgba(200,169,107,0.35)] hover:text-text hover:bg-[rgba(200,169,107,0.06)] transition-all duration-300 cursor-default"
                  style={{
                    opacity: audIn ? 1 : 0,
                    transform: audIn ? 'translateY(0)' : 'translateY(12px)',
                    transition: `opacity 0.5s ease ${0.05 + i * 0.06}s, transform 0.5s ease ${0.05 + i * 0.06}s, border-color 0.3s ease, color 0.3s ease, background-color 0.3s ease`,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ServiceCard({
  Icon,
  label,
  title,
  description,
  delay,
  featured,
}: {
  Icon: ElementType
  label: string
  title: string
  description: string
  delay: number
  featured: boolean
}) {
  const { ref, inView } = useInView(0.15)

  return (
    <div
      ref={ref}
      className={`group relative p-7 md:p-8 bg-card rounded-2xl border border-[rgba(245,242,235,0.06)] hover:border-[rgba(200,169,107,0.25)] hover:bg-card-secondary transition-all duration-400 hover:shadow-card cursor-default overflow-hidden ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease`,
      }}
    >
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[rgba(200,169,107,0.05)] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="w-12 h-12 rounded-xl bg-[rgba(200,169,107,0.1)] border border-[rgba(200,169,107,0.25)] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[rgba(200,169,107,0.18)] group-hover:shadow-gold-glow-sm group-hover:border-[rgba(200,169,107,0.5)]">
        <Icon size={21} className="text-gold" />
      </div>

      <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-2 block">
        {label}
      </span>
      <h3 className="font-display font-semibold text-text text-lg mb-3 group-hover:text-gold transition-colors duration-300">
        {title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed">{description}</p>
    </div>
  )
}
