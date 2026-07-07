import Link from 'next/link'
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Flame,
  MinusCircle,
} from 'lucide-react'

import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'

const scoringRows = [
  {
    event: '1. lugar en carrera',
    pilot: '+25',
    constructor: '+25',
    note: 'Escala oficial F1',
  },
  {
    event: '2. lugar en carrera',
    pilot: '+18',
    constructor: '+18',
    note: 'Escala oficial F1',
  },
  {
    event: '3. lugar en carrera',
    pilot: '+15',
    constructor: '+15',
    note: 'Escala oficial F1',
  },
  {
    event: 'Posiciones 4-10',
    pilot: 'Variable',
    constructor: 'Variable',
    note: 'Misma lógica que la F1 real',
  },
  {
    event: 'Pole position',
    pilot: '+10',
    constructor: '+5',
    note: 'Bonificación extra de clasificación',
  },
  {
    event: 'Vuelta rapida',
    pilot: '+5',
    constructor: '+3',
    note: 'Solo si termina en top 10',
  },
  {
    event: 'DNF',
    pilot: '-5',
    constructor: '-3',
    note: 'Penalización por abandono o accidente',
  },
]

const scoringHighlights = [
  {
    title: 'Construye alrededor del GP',
    description:
      'Los puntos se calculan carrera a carrera, así que la consistencia pesa tanto como un gran resultado aislado.',
    icon: Award,
  },
  {
    title: 'La clasificación importa',
    description:
      'Pole y vuelta rápida añaden valor real a pilotos y constructores, especialmente en jornadas cerradas.',
    icon: CheckCircle2,
  },
  {
    title: 'El riesgo también puntúa',
    description:
      'Los DNFs restan, obligando a leer forma, fiabilidad y contexto antes de mover el equipo.',
    icon: MinusCircle,
  },
]

export default function ScoringPage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,30,0,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%)]" />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-10 md:px-6 md:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <div className="space-y-6">
            <Badge className="border-primary/20 bg-primary/15 px-3 py-1 text-xs uppercase tracking-widest text-primary">
              Sistema de puntos
            </Badge>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-balance font-exo2 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Cada punto cuenta. Cada GP puede mover toda la liga.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                Esta es la referencia pública del sistema de puntuación de Apex
                Rivals. La idea es premiar rendimiento real, lectura táctica y
                gestión del riesgo durante toda la temporada.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link href="/rules">
                  <ArrowLeft className="size-4" />
                  Volver a reglas
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Inicio</Link>
              </Button>
            </div>
          </div>

          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-exo2 text-2xl text-white">
                Lectura rápida
              </CardTitle>
              <CardDescription className="text-white/65">
                El sistema mezcla resultados de carrera, clasificación y eventos
                de riesgo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                'La escala base sigue la F1 real.',
                'Pole position y vuelta rápida añaden bonus.',
                'El DNF resta y castiga apuestas demasiado agresivas.',
                'Los valores exactos pueden ajustarse por balance.',
              ].map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <Flame className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-white/75">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {scoringHighlights.map(({ title, description, icon: Icon }) => (
            <Card
              key={title}
              className="border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="font-exo2 text-xl text-white">
                  {title}
                </CardTitle>
                <CardDescription className="text-white/65">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card
          id="scoring-table"
          className="scroll-mt-24 border-white/10 bg-card/90 backdrop-blur-sm"
        >
          <CardHeader>
            <CardTitle className="font-exo2 text-3xl text-white">
              Tabla de puntuación por GP
            </CardTitle>
            <CardDescription>
              Referencia pública del reparto de puntos para pilotos y
              constructores.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto pb-6">
            <table className="w-full min-w-190 border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-white/50">
                  <th className="border-b border-white/10 px-4 py-3 font-medium">
                    Evento
                  </th>
                  <th className="border-b border-white/10 px-4 py-3 font-medium">
                    Piloto
                  </th>
                  <th className="border-b border-white/10 px-4 py-3 font-medium">
                    Constructor
                  </th>
                  <th className="border-b border-white/10 px-4 py-3 font-medium">
                    Notas
                  </th>
                </tr>
              </thead>
              <tbody>
                {scoringRows.map((row) => (
                  <tr
                    key={row.event}
                    className="align-top text-sm text-white/80"
                  >
                    <td className="border-b border-white/10 px-4 py-4 font-medium text-white">
                      {row.event}
                    </td>
                    <td className="border-b border-white/10 px-4 py-4">
                      {row.pilot}
                    </td>
                    <td className="border-b border-white/10 px-4 py-4">
                      {row.constructor}
                    </td>
                    <td className="border-b border-white/10 px-4 py-4 text-white/60">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <Card className="border-primary/20 bg-primary/10">
            <CardHeader>
              <CardTitle className="font-exo2 text-2xl text-white">
                Bonificaciones y penalizaciones
              </CardTitle>
              <CardDescription className="text-white/70">
                La capa extra que hace que el GP no termine en la bandera a
                cuadros.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="font-semibold text-white">
                  Bonos de clasificación
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  Pole position suma puntos extra y la vuelta rápida aporta otro
                  bloque de valor si el piloto termina dentro del top 10.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="font-semibold text-white">DNF</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  El abandono resta puntos para obligar a ponderar fiabilidad,
                  riesgo de carrera y decisiones de mercado.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-exo2 text-2xl text-white">
                Cómo leer esta tabla
              </CardTitle>
              <CardDescription className="text-white/65">
                No es solo sumar; también importa cuándo y por qué se suman los
                puntos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <p className="text-sm leading-6 text-white/75">
                La puntuación está pensada para que el usuario tome decisiones
                de mercado con contexto: forma reciente, clasificación,
                fiabilidad y potencial de los próximos Grandes Premios.
              </p>
              <p className="text-sm leading-6 text-white/75">
                Los bonos y castigos pueden ajustarse en balance para que la
                temporada mantenga tensión competitiva sin romper la lógica de
                la F1.
              </p>
              <Button asChild className="mt-2 w-fit" variant="outline">
                <Link href="/rules#substitutions">Ver reglas de boosters</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
