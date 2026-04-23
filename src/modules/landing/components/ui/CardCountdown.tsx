interface Props {
  value: number
  label: string
}

export default function CardCountdown({ value, label }: Props) {
  return (
    <div className="flex flex-col items-center justify-center bg-card-primary border border-border/60 font-exo2 rounded-lg p-4">
      <span className="text-2xl font-bold">{value}</span>
      <small className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
        {label}
      </small>
    </div>
  )
}
