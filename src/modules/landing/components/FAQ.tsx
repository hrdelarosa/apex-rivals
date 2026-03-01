import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion'

export default function FAQ() {
  return (
    <div className="px-4">
      <Accordion
        type="single"
        collapsible
        defaultValue="free-to-play"
        className="max-w-xl md:max-w-3xl mx-auto w-full"
      >
        <AccordionItem value="free-to-play">
          <AccordionTrigger className="text-sm sm:text-base font-exo2 font-bold">
            ¿Ápex Rivals es gratuito?
          </AccordionTrigger>

          <AccordionContent className="text-sm text-muted-foreground">
            Sí, la plataforma es completamente free-to-play. Puedes crear tu
            cuenta, unirte a ligas y competir por la gloria sin costo alguno.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="change-my-team">
          <AccordionTrigger className="text-sm sm:text-base font-exo2 font-bold">
            ¿Puedo cambiar mi equipo entre carreras?
          </AccordionTrigger>

          <AccordionContent className="text-sm text-muted-foreground">
            ¡Claro! El mercado se abre después de cada GP y se cierra justo
            antes de la sesión de clasificación del siguiente. Tienes un límite
            de <strong>25 a 30 cambios por temporada</strong>, así que gestiona
            tus transferencias con sabiduría.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="substitute-driver">
          <AccordionTrigger className="text-sm sm:text-base font-exo2 font-bold">
            ¿Qué pasa si un piloto de mi equipo es sustituido en la vida real?
          </AccordionTrigger>

          <AccordionContent className="text-sm text-muted-foreground">
            Si un piloto oficial es reemplazado (por enfermedad o decisión
            técnica), los puntos que obtenga su sustituto en ese GP contarán
            para tu equipo como si fueran del piloto original. ¡No perderás tus
            puntos por causas ajenas!
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="leave-league-admin">
          <AccordionTrigger className="text-sm sm:text-base font-exo2 font-bold">
            ¿Qué sucede si el administrador de mi liga abandona la plataforma?
          </AccordionTrigger>

          <AccordionContent className="text-sm text-muted-foreground">
            El sistema permite la{' '}
            <strong>Transferencia de Administración</strong>. El creador actual
            puede ceder el control de la liga a cualquier otro miembro activo
            para que la competición continúe sin problemas.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="market-close">
          <AccordionTrigger className="text-sm sm:text-base font-exo2 font-bold">
            ¿Qué es el &quot;Cierre de Mercado&quot; exactamente?
          </AccordionTrigger>

          <AccordionContent className="text-sm text-muted-foreground">
            Es el momento en que se bloquean los cambios de equipo y la
            activación de boosters. Ocurre siempre{' '}
            <strong>
              justo antes del inicio de la sesión de clasificación (Qualy)
            </strong>{' '}
            de cada Gran Premio. Una vez que empieza la Qualy, tu equipo queda
            &quot;congelado&quot; hasta que termine la carrera dominical.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="start-season">
          <AccordionTrigger className="text-sm sm:text-base font-exo2 font-bold">
            ¿Cuándo comienza la temporada 2026?
          </AccordionTrigger>

          <AccordionContent className="text-sm text-muted-foreground">
            La temporada de Ápex Rivals inicia oficialmente con el primer Gran
            Premio del calendario de Fórmula 1 de 2026. Asegúrate de tener tu
            equipo listo antes de la primera sesión de clasificación.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
