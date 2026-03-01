import { STEPS } from '../constants/howItWorksSteps'

export default function HowItWorks() {
  return (
    <div className="mt-16 grid gap-6 md:grid-cols-3">
      {STEPS.map((step) => (
        <div
          key={step.number}
          className="group relative bg-card-primary rounded-lg border border-card-primary p-8 transition-all hover:bg-card-primary/90 hover:border-primary/20 hover:scale-[101%] hover:-translate-y-px"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <step.icon className="size-6" />
            </div>

            <span className="text-3xl font-bold font-exo2 text-border group-hover:text-muted-foreground/35 transition-colors">
              {step.number}
            </span>
          </div>

          <h3 className="text-xl font-bold font-exo2 tracking-wide text-foreground">
            {step.title}
          </h3>

          <p className="mt-3 leading-relaxed text-muted-foreground">
            {step.description}
          </p>

          <div className="absolute right-0 bottom-0 p-1">
            <step.icon className="size-28 opacity-5" />
          </div>
        </div>
      ))}
    </div>
  )
}
