import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/site'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-[rgba(200,169,107,0.06)] blur-[130px] animate-float-slow" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(200,169,107,0.25)] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(245,242,235,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,235,0.6) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage:
              'radial-gradient(ellipse 76% 66% at 50% 40%, #000 28%, transparent 78%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        <div
          className="inline-flex max-w-full items-center px-3.5 py-1.5 rounded-full border mb-7 md:mb-8"
          style={{
            animation:
              'fade-up 0.6s ease-out both, badge-border-shine 5.2s ease-in-out infinite',
            background:
              'linear-gradient(rgba(15,17,21,0.94), rgba(15,17,21,0.94)) padding-box, linear-gradient(115deg, rgba(120,92,42,0.26), rgba(200,169,107,0.48), rgba(232,211,154,0.82), rgba(200,169,107,0.5), rgba(120,92,42,0.28)) border-box',
            backgroundSize: '100% 100%, 240% 100%',
            borderColor: 'transparent',
            boxShadow:
              'inset 0 1px 0 rgba(232,211,154,0.1), 0 0 16px rgba(200,169,107,0.08)',
          }}
        >
          <span
            className="text-[0.68rem] md:text-xs font-semibold tracking-[0.13em] uppercase"
            style={{
              animation: 'text-shine 5.2s linear infinite',
              background:
                'linear-gradient(100deg, #b89049 0%, #c8a96b 28%, #e2c47e 48%, #f1dc9f 52%, #d1ae66 72%, #b89049 100%)',
              backgroundClip: 'text',
              backgroundSize: '220% auto',
              color: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Projetos web para pequenos negócios
          </span>
        </div>

        <h1
          className="hero-title font-display font-extrabold text-text mb-7 md:mb-8 text-balance mx-auto"
          style={{ animation: 'fade-up 0.6s ease-out 0.1s both' }}
        >
          <span className="block">Presença digital à altura do&nbsp;</span>
          <span className="block text-shine">seu negócio.</span>
        </h1>

        <p
          className="hero-copy text-text-muted mx-auto text-pretty"
          style={{ animation: 'fade-up 0.6s ease-out 0.2s both' }}
        >
          Desenvolvo páginas, cardápios online e interfaces web para pequenos negócios
          e profissionais autônomos apresentarem o que fazem, organizar
          informações importantes e facilitar o contato com novos clientes.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center">
          <div
            className="flex w-full max-w-[360px] flex-col items-stretch justify-center gap-4"
            style={{ animation: 'fade-up 0.6s ease-out 0.3s both' }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold pulse-gold-ring px-8 py-3.5 font-semibold rounded-xl w-full text-center"
            >
              <span className="relative z-10">Pedir orçamento</span>
            </a>
            <a
              href="#portfolio"
              className="group flex items-center gap-2 px-8 py-3.5 border border-[rgba(245,242,235,0.14)] text-text-muted rounded-xl font-medium transition-all duration-300 hover:border-[rgba(200,169,107,0.45)] hover:text-text hover:bg-[rgba(200,169,107,0.05)] active:scale-95 w-full justify-center"
            >
              Ver projetos
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted/50"
        style={{ animation: 'fade-in 1s ease-out 1s both' }}
      >
        <ArrowDown
          size={14}
          className="animate-[scroll-bounce_1.8s_ease-in-out_infinite]"
        />
      </div>
    </section>
  )
}
