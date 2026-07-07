import Link from 'next/link'
import { ROUTES_RULES } from '@/src/config/routes'
import { Button } from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'

export default function RulesPage() {
  return (
    <>
      <div className="sticky top-20 py-0.5 w-full bg-dark-bg/95 border-b backdrop-blur-sm flex flex-col justify-center">
        <nav
          aria-label="Navegación de reglas"
          className="max-w-7xl mx-auto flex items-center justify-center gap-1.5"
        >
          {ROUTES_RULES.map(({ href, label }) => (
            <Button
              key={href}
              asChild
              variant="link"
              size="xs"
              className=" text-white/80 hover:text-white"
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </nav>
      </div>

      <main className="w-full max-w-4xl mx-auto sm:py-8 lg:py-12 sm:space-y-4 lg:space-y-8">
        <h1 className="text-4xl font-exo2 font-black tracking-tight">
          Reglas de juego
        </h1>

        <div className="space-y-5">
          <Card id="leagues" className="scroll-mt-28">
            <CardHeader>
              <CardTitle className="text-xl font-exo2 font-semibold">
                Ligas
              </CardTitle>

              <CardDescription>
                Las ligas son la capa principal para entender cómo funciona esta
                parte del juego. Son el contenedor de la competición, el espacio
                donde se forman los equipos, se aplican las reglas y se comparan
                los resultados jornada tras jornada.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Las ligas públicas son visibles en el directorio y cualquier
                    usuario puede unirse mediante búsqueda libre o URL.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Las ligas privadas están ocultas del directorio y su acceso
                    es exclusivo mediante un código de invitación único y
                    regenerable.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    El creador asume el rol de administrador, con poder para
                    modificar ajustes, expulsar miembros o transferir la
                    administración.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Las clasificaciones, los equipos y el historial de
                    temporadas se gestionan de forma totalmente independiente
                    dentro de cada liga.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card id="budget-cap" className="scroll-mt-28">
            <CardHeader>
              <CardTitle className="text-xl font-exo2 font-semibold">
                Equipos y presupuesto
              </CardTitle>

              <CardDescription>
                La creación de tu alineación es el núcleo estratégico del juego.
                Cada usuario debe confeccionar su equipo seleccionando
                cuidadosamente a 2 pilotos y 1 constructor, teniendo el desafío
                de gestionar inteligentemente un presupuesto estricto de 100M
                aplicable para todas las ligas.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    La composición estricta de cada alineación debe ser
                    exactamente de 2 pilotos y 1 constructor.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Cuentas con un presupuesto cerrado de 100 millones aplicable
                    para armar tu equipo en cada liga.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Tu plantilla es independiente; los equipos se gestionan de
                    forma autónoma entre ligas, por lo que las operaciones en
                    una no afectan a las demás.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card id="user-limits" className="scroll-mt-28">
            <CardHeader>
              <CardTitle className="text-xl font-exo2 font-semibold">
                Límites del sistema por usuario
              </CardTitle>

              <CardDescription>
                Para asegurar un entorno competitivo y completamente
                equilibrado, se establecen restricciones claras de
                participación. Estas normas definen los topes de gestión y
                creación, garantizando una experiencia de juego justa y
                manejable para todos los mánagers involucrados.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Para garantizar la calidad de la experiencia y evitar el
                    spam, estarás limitado a participar en un máximo de 10 a 15
                    ligas simultáneamente.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    La gestión de tu alineación estará restringida a un rango de
                    25 a 30 cambios totales por equipo durante toda la
                    temporada.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Los límites exactos están pensados para premiar la
                    planificación táctica sobre el volumen de actividad y se
                    terminarán de definir durante la fase de balance del juego.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card id="boosters" className="scroll-mt-28">
            <CardHeader>
              <CardTitle className="text-xl font-exo2 font-semibold">
                Sistema de boosters
              </CardTitle>

              <CardDescription>
                Estos modificadores de un solo uso añaden una capa extra de
                profundidad táctica. Al activarlos durante un Gran Premio
                específico, podrás alterar o potenciar tus resultados
                temporalmente, permitiéndote sacar ventajas cruciales en los
                momentos clave del campeonato.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Recibirás un set inicial de modificadores al arrancar la
                    temporada; estos son de uso único, no se acumulan y no se
                    pueden vender.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Únicamente tienes permitido activar un modificador por Gran
                    Premio dentro de cada liga.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Su activación debe realizarse estrictamente antes del cierre
                    del mercado, de forma previa a la sesión de clasificación.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    En el futuro, se contempla un mercado para adquirir nuevos
                    boosters utilizando los puntos obtenidos a lo largo de la
                    temporada.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card id="market" className="scroll-mt-28">
            <CardHeader>
              <CardTitle className="text-xl font-exo2 font-semibold">
                Mercado
              </CardTitle>

              <CardDescription>
                Este es tu centro de operaciones entre cada carrera. En este
                espacio es donde tomas las decisiones directivas: compras,
                vendes y reajustas tu plantilla antes de que arranque cada Gran
                Premio, adaptando tu estrategia a las exigencias de la
                temporada.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Es tu centro de operaciones para comprar, vender y reajustar
                    tu plantilla antes de cada Gran Premio.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Todas las operaciones quedan estrictamente limitadas por el
                    cierre del mercado, el cual ocurre antes del inicio de la
                    clasificación.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    El mercado marca el ritmo de tus decisiones tácticas,
                    obligándote a evaluar el calendario y el estado de forma
                    real de tus componentes.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    La viabilidad de tus combinaciones dependerá directamente de
                    tu presupuesto y del precio dinámico de los pilotos y
                    constructores.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card id="dynamic-pricing" className="scroll-mt-28">
            <CardHeader>
              <CardTitle className="text-xl font-exo2 font-semibold">
                Sistema de precios dinámicos
              </CardTitle>

              <CardDescription>
                La economía del juego se rige puramente por el rendimiento real
                en la pista, sin depender de clases o categorías predefinidas.
                Después de cada Gran Premio, el valor de los pilotos y
                constructores se recalcula automáticamente según sus resultados
                más recientes.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    El algoritmo recalcula automáticamente el valor de pilotos y
                    constructores después de cada Gran Premio, basándose
                    exclusivamente en el rendimiento real sin utilizar clases o
                    categorías predefinidas.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    El recálculo toma en cuenta la posición final en carrera y
                    clasificación, los puntos obtenidos, la comparación con el
                    rendimiento esperado y la tendencia de los últimos 3 GPs.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Un competidor que encadene buenos resultados subirá de valor
                    rápidamente, obligando a los usuarios a reajustar sus
                    estrategias.
                  </span>
                </li>

                <li className="flex gap-3 text-sm leading-6 text-white/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    Existe la posibilidad de integrar un modelo de IA para
                    determinar las fluctuaciones de precios con mayor precisión
                    en base al desempeño en la pista.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
