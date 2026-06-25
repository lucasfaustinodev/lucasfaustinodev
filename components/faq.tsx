'use client'

import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

const faqs = [
  {
    q: 'Quanto tempo leva para ficar pronto?',
    a: 'Depende do tamanho da página. Em projetos simples, envio uma primeira versão em poucos dias para você revisar.',
  },
  {
    q: 'Eu preciso entender de tecnologia?',
    a: 'Não. Você só me conta sobre o seu negócio e o que quer mostrar. Eu cuido de toda a parte técnica: estrutura, design, código e publicação online.',
  },
  {
    q: 'A página funciona bem no celular?',
    a: 'Sim. Todas as páginas são 100% responsivas e pensadas primeiro para o celular, já que a maioria dos clientes chega pelo Instagram e WhatsApp.',
  },
  {
    q: 'O que está incluso no valor?',
    a: 'Uma página responsiva, com seções de serviços, espaço para fotos ou portfólio, informações de contato, botão de contato e publicação online. O escopo final é alinhado antes do orçamento.',
  },
  {
    q: 'Posso pedir alterações depois?',
    a: 'Sim. Combinamos uma rodada de ajustes durante o processo. Mudanças maiores depois da entrega podem ser feitas e são alinhadas separadamente.',
  },
]

function FaqItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[number]
  index: number
}) {
  const [open, setOpen] = useState(false)
  const contentId = useId()
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className="border border-[rgba(245,242,235,0.07)] rounded-xl bg-card overflow-hidden transition-colors duration-300 hover:border-[rgba(200,169,107,0.25)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s, border-color 0.3s ease`,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
        aria-controls={contentId}
      >
        <span className="font-medium text-text text-sm md:text-base">
          {faq.q}
        </span>
        <Plus
          size={18}
          className={`text-gold flex-shrink-0 transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        />
      </button>
      <div
        id={contentId}
        className="grid transition-all duration-300 ease-smooth"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm text-text-muted leading-relaxed">
            {faq.a}
          </p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  const { ref, inView } = useInView(0.2)

  return (
    <section id="duvidas" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div
          ref={ref}
          className="mb-12 text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-3 block">
            Dúvidas frequentes
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-4 text-balance">
            Dúvidas comuns antes de pedir orçamento.
          </h2>
          <div className="gold-divider w-16 mx-auto mt-5" />
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
