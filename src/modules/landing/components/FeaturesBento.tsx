import {
  IconBellRinging,
  IconBolt,
  IconChartHistogram,
  IconCoins,
  IconListCheck,
  IconRocket,
  IconTargetArrow,
  IconUsers,
} from '@tabler/icons-react'

import ContainerSection from './ui/ContainerSection'
import LabelSection from './ui/LabelSection'
import TitleSection from './ui/TitleSection'

interface FeatureCardProps extends React.HTMLAttributes<HTMLElement> {
  icon: React.ComponentType<{ className?: string }>
  label: string
  title: string
  description: string
}

function FeatureCard({
  icon: Icon,
  label,
  title,
  description,
  className,
  children,
}: FeatureCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-[linear-gradient(165deg,rgba(255,255,255,0.05)_0%,rgba(15,16,24,0.95)_45%,rgba(10,10,14,0.98)_100%)] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[0_20px_40px_-24px_rgba(255,30,0,0.55)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold font-exo2 uppercase tracking-[0.14em] text-warm-red">
            {label}
          </span>
          <Icon className="size-5 text-warm-red/85 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>

        <h3 className="text-2xl font-exo2 font-bold leading-tight text-foreground">
          {title}
        </h3>

        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-6">{children}</div>
      </div>
    </article>
  )
}

export default function FeaturesBento() {
  return (
    <ContainerSection id="features" className="relative">
      <div className="text-center max-w-3xl mx-auto">
        <LabelSection>Funcionalidades</LabelSection>
        <TitleSection className="mt-2">
          Todo para dominar la parrilla
        </TitleSection>

        <p className="text-lg leading-relaxed text-muted-foreground">
          Ligas privadas, mercado vivo y puntos basados en resultados reales.
          Todo lo necesario para jugar con estrategia y competir cada GP.
        </p>
      </div>

      <div className="mt-14 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-5 md:grid-cols-12">
        <FeatureCard
          className="md:col-span-6 lg:col-span-5"
          icon={IconUsers}
          label="Ligas"
          title="Publicas y Privadas"
          description="Crea una liga cerrada con codigo de invitacion o entra a ligas abiertas para medirte contra toda la comunidad."
        >
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded-lg border border-border/60 bg-background/40 p-3">
              <p className="font-semibold">Scuderia Rivals</p>
              <p className="text-muted-foreground">14 participantes</p>
            </div>
            <div className="rounded-lg border border-primary/40 bg-primary/10 p-3 text-right">
              <p className="font-semibold text-primary">Privada</p>
              <p className="text-muted-foreground">Temporada 2026</p>
            </div>
          </div>
        </FeatureCard>

        <FeatureCard
          className="md:col-span-6 lg:col-span-7"
          icon={IconTargetArrow}
          label="Puntuacion"
          title="Sistema Real de F1"
          description="Puntos por posicion, pole y vuelta rapida con penalizaciones por DNF para mantener el juego fiel a la pista."
        >
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
              <span>1° Lugar</span>
              <strong className="text-foreground">+25 pts</strong>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-border/50 px-3 py-2">
              <span>Pole Position</span>
              <strong className="text-foreground">+10 pts</strong>
            </li>
            <li className="flex items-center justify-between rounded-lg border border-destructive/30 px-3 py-2">
              <span>DNF</span>
              <strong className="text-destructive">-5 pts</strong>
            </li>
          </ul>
        </FeatureCard>

        <FeatureCard
          className="md:col-span-6 lg:col-span-4"
          icon={IconCoins}
          label="Mercado"
          title="Precios Dinamicos"
          description="El valor de cada piloto se ajusta tras cada GP segun su rendimiento real y la tendencia del mercado."
        >
          <div className="rounded-lg border border-border/60 bg-background/35 p-4">
            <p className="text-4xl font-exo2 font-bold">$28.4M</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Precio actualizado despues de Monaco
            </p>
          </div>
        </FeatureCard>

        <FeatureCard
          className="md:col-span-6 lg:col-span-3"
          icon={IconListCheck}
          label="Equipo"
          title="2 Pilotos + 1 Constructor"
          description="Arma combinaciones distintas por liga para optimizar puntos dentro de un presupuesto fijo."
        >
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg border border-border/60 bg-background/35 p-2">
              Piloto 1
            </div>
            <div className="rounded-lg border border-border/60 bg-background/35 p-2">
              Piloto 2
            </div>
            <div className="rounded-lg border border-border/60 bg-background/35 p-2">
              Constructor
            </div>
          </div>
        </FeatureCard>

        <FeatureCard
          className="md:col-span-12 lg:col-span-5"
          icon={IconBolt}
          label="Boosters"
          title="Modificadores Especiales"
          description="Activa cartas tacticas de uso limitado para romper empates o consolidar una ventaja en fines de semana clave."
        >
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-semibold text-primary">
              Turbo Captain x2
            </span>
            <span className="rounded-full border border-border/70 bg-background/35 px-3 py-1 font-semibold text-foreground">
              Constructor Boost
            </span>
            <span className="rounded-full border border-border/70 bg-background/35 px-3 py-1 font-semibold text-foreground">
              Safety Shield
            </span>
          </div>
        </FeatureCard>

        <FeatureCard
          className="md:col-span-6 lg:col-span-4"
          icon={IconBellRinging}
          label="Alertas"
          title="Notificaciones Clave"
          description="Recibe avisos antes del cierre de mercado, cambios de precio y resultados publicados sin perder timing."
        >
          <div className="space-y-2 text-sm">
            <div className="rounded-lg border border-border/60 bg-background/35 px-3 py-2">
              Cierre en 48h - GP de Monaco
            </div>
            <div className="rounded-lg border border-border/60 bg-background/35 px-3 py-2">
              Norris subio a $24.5M
            </div>
          </div>
        </FeatureCard>

        <FeatureCard
          className="md:col-span-6 lg:col-span-3"
          icon={IconChartHistogram}
          label="Analitica"
          title="Historial y Analisis"
          description="Sigue evolucion de puntos, ROI de fichajes y tendencia de rendimiento carrera a carrera."
        >
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-border/60 bg-background/35 p-2">
              <p className="text-2xl font-exo2 font-bold">4°</p>
              <p className="text-[11px] text-muted-foreground">Posicion</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/35 p-2">
              <p className="text-2xl font-exo2 font-bold">847</p>
              <p className="text-[11px] text-muted-foreground">Puntos</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/35 p-2">
              <p className="text-2xl font-exo2 font-bold">12</p>
              <p className="text-[11px] text-muted-foreground">GPs</p>
            </div>
          </div>
        </FeatureCard>

        <FeatureCard
          className="md:col-span-12 lg:col-span-12"
          icon={IconRocket}
          label="Tiempo real"
          title="Clasificacion Siempre Actualizada"
          description="El ranking se refresca tras cada resultado oficial para que tu posicion refleje tu rendimiento al instante."
        >
          <div className="grid gap-2 md:grid-cols-3 text-sm">
            <div className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3">
              <p className="font-semibold">1. mkracing</p>
              <p className="text-muted-foreground">1,204 pts</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/35 px-4 py-3">
              <p className="font-semibold">2. juanrivas</p>
              <p className="text-muted-foreground">1,189 pts</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-background/35 px-4 py-3">
              <p className="font-semibold text-primary">3. tu_usuario</p>
              <p className="text-muted-foreground">847 pts</p>
            </div>
          </div>
        </FeatureCard>
      </div>
    </ContainerSection>
  )
}
