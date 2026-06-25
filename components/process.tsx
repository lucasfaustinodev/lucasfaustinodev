'use client'

import { MessageCircle, LayoutTemplate, Code2, Rocket } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const steps = [
  {
    icon: MessageCircle,
    number: '01',
    label: 'Entendimento',
    title: 'Conversa inicial',
    description: 'Você me explica seu negócio, serviço ou ideia.',
  },
  {
    icon: LayoutTemplate,
    number: '02',
    label: 'Estrutura',
    title: 'Estrutura da página',
    description:
      'Definimos as seções principais: apresentação, serviços, fotos, valores, contato e CTA.',
  },
  {
    icon: Code2,
    number: '03',
    label: 'Construção',
    title: 'Desenvolvimento',
    description:
      'Eu construo uma página organizada para celular, com seções claras e caminho direto para contato.',
  },
  {
    icon: Rocket,
    number: '04',
    label: 'Entrega',
    title: 'Revisão e publicação',
    description:
      'Você revisa, fazemos ajustes combinados e publicamos online.',
  },
]

export function Process() {
  const { ref: headRef, inView: headIn } = useInView(0.2)

  return (
    <section id="processo" className="py-24 md:py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[rgba(200,169,107,0.04)] blur-[110px]" />
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
            Processo
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-4 text-balance">
            Do briefing à página publicada.
          </h2>
          <div className="gold-divider w-16 mx-auto mt-5" />
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.25)] to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-7">
            {steps.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        <ApproachBox />
      </div>
    </section>
  )
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number]
  index: number
}) {
  const { ref, inView } = useInView(0.15)
  const Icon = step.icon

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${index * 0.13}s, transform 0.6s ease ${index * 0.13}s`,
      }}
    >
      <div className="relative mb-6 group">
        <div className="w-20 h-20 rounded-2xl bg-card border border-[rgba(245,242,235,0.07)] flex items-center justify-center transition-all duration-300 group-hover:border-[rgba(200,169,107,0.3)] group-hover:bg-[rgba(200,169,107,0.06)] group-hover:shadow-gold-glow-sm">
          <Icon
            size={26}
            className="text-gold opacity-85 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[rgba(200,169,107,0.14)] border border-[rgba(200,169,107,0.3)] text-[10px] font-bold text-gold flex items-center justify-center">
          {step.number}
        </span>
      </div>

      <span className="text-[10px] font-medium text-gold-foil uppercase tracking-widest mb-1">
        {step.label}
      </span>
      <h3 className="font-display font-semibold text-text text-sm mb-2">
        {step.title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}

function ApproachBox() {
  const { ref, inView } = useInView(0.15)

  return (
    <div
      ref={ref}
      className="mt-20 p-7 md:p-9 rounded-2xl bg-card border border-[rgba(245,242,235,0.06)] relative overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
      }}
    >
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[rgba(200,169,107,0.05)] -translate-y-1/2 translate-x-1/2 pointer-events-none blur-xl" />

      <div className="relative z-10 grid gap-5 md:grid-cols-[0.95fr_1.1fr] md:items-end md:gap-10">
        <div>
          <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-3 block">
            Abordagem
          </span>
          <h3 className="font-display text-xl md:text-2xl font-bold text-text text-balance">
            Uso IA para acelerar, sem tirar o cuidado humano.
          </h3>
        </div>
        <p className="text-text-muted text-sm leading-relaxed max-w-2xl md:ml-auto">
          A IA ajuda a pesquisar, organizar ideias e ganhar velocidade. A decisão
          final continua sendo feita com cuidado, pensando no que deixa sua oferta
          mais clara para o cliente.
        </p>
      </div>
    </div>
  )
}
