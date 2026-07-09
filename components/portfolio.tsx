'use client'

import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useInView } from '@/hooks/use-in-view'

interface Project {
  preview: ReactNode
  category: string
  title: string
  description: string
  tags: string[]
  href: string
  external?: boolean
}

function ProjectScreenshotPreview({
  src,
  webpSrc,
  alt,
  width,
  height,
  ambient = true,
}: {
  src: string
  webpSrc: string
  alt: string
  width: number
  height: number
  ambient?: boolean
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0b0d12] select-none">
      {ambient ? (
        <>
          <picture>
            <source srcSet={webpSrc} type="image/webp" />
            <img
              aria-hidden="true"
              src={src}
              alt=""
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-xl"
            />
          </picture>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.08)_0%,rgba(15,17,21,0.1)_42%,rgba(15,17,21,0.72)_100%)]" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[#f7efe9]" />
      )}
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-lg object-contain shadow-[0_18px_42px_rgba(0,0,0,0.28)]"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115]/24 via-transparent to-transparent" />
    </div>
  )
}

/* ── Salão de Beleza preview ── */
function SalaoPreview() {
  return (
    <div className="w-full h-full bg-[#fdf6f0] flex flex-col overflow-hidden select-none">
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-[#f0e8e0]">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#d4a0a0] flex items-center justify-center">
            <span className="text-white text-[7px] font-bold">SD</span>
          </div>
          <span className="text-[8px] font-semibold text-[#3a2a2a]">Studio Demo</span>
        </div>
        <div className="px-2 py-0.5 bg-[#d4a0a0] rounded text-[7px] text-white font-medium">Agendar</div>
      </div>
      <div className="relative flex-1 flex">
        <div className="flex-1 flex flex-col justify-center px-4 py-3 bg-[#fdf6f0] z-10">
          <span className="text-[7px] text-[#c08080] uppercase tracking-wider mb-1">Salão e esmalteria</span>
          <h3 className="text-[11px] font-bold text-[#2a1a1a] leading-tight mb-2">
            Beleza feita<br />com cuidado,<br />técnica e<br />delicadeza.
          </h3>
          <div className="flex gap-1.5">
            <div className="px-2 py-0.5 bg-[#d4a0a0] rounded text-[6px] text-white font-medium">Agendar</div>
            <div className="px-2 py-0.5 border border-[#d4a0a0] rounded text-[6px] text-[#d4a0a0] font-medium">Trabalhos</div>
          </div>
        </div>
        <div className="w-28 relative overflow-hidden">
          <img
            src="https://lucasfaustinodev.vercel.app/demo-salao/assets/images/unha-azul-marinho.png"
            alt="Unhas"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdf6f0] via-transparent to-transparent" />
        </div>
      </div>
      <div className="px-3 py-2 bg-white border-t border-[#f0e8e0]">
        <span className="text-[6px] uppercase text-[#c08080] tracking-wider block mb-1.5">Portfólio</span>
        <div className="flex gap-1.5 overflow-hidden">
          {[
            'https://lucasfaustinodev.vercel.app/demo-salao/assets/images/unha-azul-marinho-portfolio.png',
            'https://lucasfaustinodev.vercel.app/demo-salao/assets/images/unha-branca-dourada.png',
            'https://lucasfaustinodev.vercel.app/demo-salao/assets/images/unha-nude-delicada.png',
            'https://lucasfaustinodev.vercel.app/demo-salao/assets/images/unha-cinza-glitter.png',
          ].map((src, i) => (
            <div key={i} className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0 bg-[#f0e8e0]">
              <img src={src || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Restaurante preview ── */
function RestaurantePreview() {
  return (
    <div className="w-full h-full bg-[#1a0a05] flex flex-col overflow-hidden select-none">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1a0a05] border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-[#c0392b] flex items-center justify-center">
            <span className="text-white text-[7px] font-bold">MQ</span>
          </div>
          <span className="text-[8px] font-semibold text-white">Mordida Quente</span>
        </div>
        <div className="px-2 py-0.5 bg-[#c0392b] rounded text-[7px] text-white font-medium">Pedir</div>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
          alt="Hambúrguer"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a05] via-[rgba(26,10,5,0.5)] to-transparent" />
        <div className="relative z-10 h-full flex flex-col justify-end px-4 pb-3">
          <span className="text-[6px] text-[#e87c5a] uppercase tracking-wider mb-1">Pedido rápido, sabor gigante</span>
          <h3 className="text-[11px] font-bold text-white leading-tight mb-2">
            Seu favorito<br />chega quente,<br />suculento.
          </h3>
          <div className="flex gap-1.5">
            <div className="px-2 py-0.5 bg-[#c0392b] rounded text-[6px] text-white font-medium">Faça seu pedido</div>
            <div className="px-2 py-0.5 border border-[rgba(255,255,255,0.25)] rounded text-[6px] text-[rgba(255,255,255,0.7)] font-medium">Cardápio</div>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 bg-[#110704] border-t border-[rgba(255,255,255,0.06)]">
        <span className="text-[6px] uppercase text-[#e87c5a] tracking-wider block mb-1.5">Destaques</span>
        <div className="flex gap-1.5 overflow-hidden">
          {[
            { src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80', label: 'Burger' },
            { src: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=200&q=80', label: 'Costela' },
            { src: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=200&q=80', label: 'Fritas' },
            { src: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=200&q=80', label: 'Brownie' },
          ].map((item, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-0.5">
              <div className="w-10 h-10 rounded-md overflow-hidden bg-[#2a1005]">
                <img src={item.src || '/placeholder.svg'} alt={item.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-[5.5px] text-[rgba(255,255,255,0.4)]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Finia preview ── */
function FiniaPreview() {
  return (
    <div className="w-full h-full bg-[#0d1117] flex flex-col overflow-hidden select-none">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1117] border-b border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center">
            <span className="text-[#0d1117] text-[7px] font-bold">F</span>
          </div>
          <span className="text-[8px] font-semibold text-white">Finia</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
          <span className="text-[6px] text-[#4ade80]">online</span>
        </div>
      </div>
      <div className="flex-1 px-3 py-3 flex flex-col gap-2 overflow-hidden">
        <div className="flex items-start gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex-shrink-0 flex items-center justify-center">
            <span className="text-[#0d1117] text-[5px] font-bold">F</span>
          </div>
          <div className="bg-[#1a2332] rounded-lg px-2 py-1.5 max-w-[75%]">
            <p className="text-[7px] text-[rgba(255,255,255,0.85)] leading-relaxed">Olá! Sou a Finia. Conte sua renda e despesas para eu organizar sua vida financeira.</p>
          </div>
        </div>
        <div className="flex items-start gap-1.5 justify-end">
          <div className="bg-[#1a3a2a] border border-[rgba(74,222,128,0.15)] rounded-lg px-2 py-1.5 max-w-[70%]">
            <p className="text-[7px] text-[rgba(255,255,255,0.7)] leading-relaxed">Ganho R$3.500 e gasto R$1.800 fixo.</p>
          </div>
        </div>
        <div className="flex items-start gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex-shrink-0 flex items-center justify-center">
            <span className="text-[#0d1117] text-[5px] font-bold">F</span>
          </div>
          <div className="bg-[#1a2332] rounded-lg px-2 py-1.5 max-w-[75%]">
            <p className="text-[7px] text-[rgba(255,255,255,0.85)] leading-relaxed">Ótimo! Você tem R$1.700 disponível. Recomendo reservar R$350 (20%) e usar R$1.350 livremente.</p>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 bg-[#0a0f16] border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex gap-3 justify-around">
          {[
            { label: 'Renda', value: 'R$3.5k', color: '#4ade80' },
            { label: 'Gastos', value: 'R$1.8k', color: '#f87171' },
            { label: 'Livre', value: 'R$1.7k', color: '#60a5fa' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-[8px] font-semibold" style={{ color: stat.color }}>{stat.value}</span>
              <span className="text-[6px] text-[rgba(255,255,255,0.35)]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Portfólio (este site) preview ── */
function PortfolioPreview() {
  return (
    <div className="w-full h-full bg-[#0f1115] flex flex-col overflow-hidden select-none">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[rgba(15,17,21,0.9)] border-b border-[rgba(245,242,235,0.07)]">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-lg bg-[rgba(200,169,107,0.15)] border border-[rgba(200,169,107,0.3)] flex items-center justify-center">
            <span className="text-[#c8a96b] text-[7px] font-bold">LF</span>
          </div>
          <span className="text-[8px] font-semibold text-[#f5f2eb]">Lucas Faustino</span>
        </div>
        <div className="px-2 py-0.5 bg-[#c8a96b] rounded text-[7px] text-[#0f1115] font-medium">WhatsApp</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-3 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,107,0.06)_0%,transparent_70%)]" />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[rgba(200,169,107,0.3)] bg-[rgba(200,169,107,0.08)] mb-2">
            <span className="w-1 h-1 rounded-full bg-[#c8a96b]" />
            <span className="text-[5.5px] text-[#c8a96b] uppercase tracking-wider">Indie Builder</span>
          </div>
          <h3 className="text-[13px] font-bold text-[#f5f2eb] mb-1 leading-tight">
            Lucas <span className="text-[#c8a96b]">Faustino</span>
          </h3>
          <p className="text-[6.5px] text-[#b7b5af] mb-2 leading-relaxed max-w-[140px] mx-auto">
            Landing pages, cardápios e interfaces para pequenos negócios.
          </p>
          <div className="flex gap-1.5 justify-center">
            <div className="px-2 py-0.5 bg-[#c8a96b] rounded text-[6px] text-[#0f1115] font-medium">Orçamento</div>
            <div className="px-2 py-0.5 border border-[rgba(245,242,235,0.12)] rounded text-[6px] text-[#b7b5af]">Projetos</div>
          </div>
        </div>
      </div>
      <div className="px-3 py-2 bg-[#111318] border-t border-[rgba(245,242,235,0.06)]">
        <div className="flex gap-2 overflow-hidden">
          {['Portfólio', 'Serviços', 'Processo', 'Valores'].map((item) => (
            <span key={item} className="text-[6px] text-[#b7b5af] opacity-60">{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const projects: Project[] = [
  {
    preview: (
      <ProjectScreenshotPreview
        src="/portfolio/demo-salao-card-wide.png"
        webpSrc="/portfolio/demo-salao-card-wide.webp"
        alt="Hero desktop da landing de salão de beleza"
        width={1560}
        height={601}
        ambient={false}
      />
    ),
    category: 'Landing page',
    title: 'Landing Page para Salão de Beleza',
    description:
      'Página com serviços, trabalhos recentes, valores e caminho simples para a cliente agendar um horário.',
    tags: ['Serviços', 'Valores', 'Agendamento'],
    href: 'https://lucasfaustinodev.vercel.app/demo-salao/index.html',
    external: true,
  },
  {
    preview: (
      <ProjectScreenshotPreview
        src="/portfolio/demo-restaurante-card-wide.png"
        webpSrc="/portfolio/demo-restaurante-card-wide.webp"
        alt="Hero desktop do cardápio online Mordida Quente"
        width={1626}
        height={727}
      />
    ),
    category: 'Cardápio online',
    title: 'Restaurante e Hamburgueria',
    description:
      'Cardápio online com categorias, destaques da casa, seleção de itens e finalização do pedido.',
    tags: ['Cardápio', 'Pedidos', 'Entrega'],
    href: 'https://lucasfaustinodev.vercel.app/demo-restaurante/index.html',
    external: true,
  },
  {
    preview: (
      <ProjectScreenshotPreview
        src="/portfolio/finia-card-wide.png"
        webpSrc="/portfolio/finia-card-wide.webp"
        alt="Tela de entrada do Finia App"
        width={1724}
        height={937}
      />
    ),
    category: 'Projeto autoral',
    title: 'Finia',
    description:
      'Aplicação com IA para organizar renda, despesas e acompanhar a vida financeira com mais clareza.',
    tags: ['IA', 'Finanças', 'Produto digital'],
    href: 'https://finiapp-neon.vercel.app',
    external: true,
  },
  {
    preview: (
      <ProjectScreenshotPreview
        src="/portfolio/lucas-portfolio-real.png"
        webpSrc="/portfolio/lucas-portfolio-real.webp"
        alt="Hero desktop da página profissional Lucas Faustino Dev"
        width={1365}
        height={620}
      />
    ),
    category: 'Projeto autoral',
    title: 'Este Portfólio',
    description:
      'Página profissional com projetos, serviços, processo de trabalho e contato direto para novos orçamentos.',
    tags: ['Marca pessoal', 'Portfólio', 'Contato'],
    href: '#inicio',
    external: false,
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView(0.1)
  const featured = index < 2

  return (
    <article
      ref={ref}
      className="group relative bg-card rounded-2xl overflow-hidden border border-[rgba(245,242,235,0.06)] hover:border-[rgba(200,169,107,0.35)] transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1.5"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s, box-shadow 0.4s ease, border-color 0.4s ease`,
      }}
    >
      <div className={`relative overflow-hidden bg-card-secondary ${featured ? 'h-60 md:h-72' : 'h-56 md:h-64'}`}>
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.04]">
          {project.preview}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,17,21,0.92)] via-[rgba(15,17,21,0.25)] to-transparent opacity-100 pointer-events-auto transition-opacity duration-400 flex items-end justify-end p-4 md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto md:focus-within:opacity-100 md:focus-within:pointer-events-auto">
          <a
            href={project.href}
            target={project.external ? '_blank' : undefined}
            rel={project.external ? 'noopener noreferrer' : undefined}
            className="btn-gold flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1115] md:translate-y-2 md:group-hover:translate-y-0 md:focus-visible:translate-y-0"
            style={{ transition: 'transform 0.35s ease 0.05s' }}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Ver projeto <ArrowUpRight size={14} />
            </span>
          </a>
        </div>

        <div className="absolute top-3 left-3 z-10">
          <span className="px-2.5 py-1 text-[11px] font-medium text-gold bg-[rgba(15,17,21,0.82)] backdrop-blur-sm border border-[rgba(200,169,107,0.3)] rounded-full">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6 md:p-7">
        <h3 className="font-display font-semibold text-text text-lg mb-2.5 leading-snug group-hover:text-gold transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium text-text-muted border border-[rgba(245,242,235,0.08)] rounded-full bg-[rgba(245,242,235,0.03)] tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function Portfolio() {
  const { ref: headRef, inView: headIn } = useInView(0.2)

  return (
    <section id="portfolio" className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headRef}
          className="mb-16 max-w-3xl"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <span className="text-xs font-medium text-gold-foil uppercase tracking-widest mb-3 block">
            Portfólio
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text mb-4 text-balance">
            Exemplos de páginas para apresentar
            <br className="hidden md:block" /> seu negócio.
          </h2>
          <div className="gold-divider w-16 mt-5" />
          <p className="text-text-muted mt-5 max-w-xl leading-relaxed text-pretty">
            Projetos reais para mostrar como cada página organiza informações,
            apresenta serviços e facilita o contato com clientes. Toque ou
            clique para ver cada projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
