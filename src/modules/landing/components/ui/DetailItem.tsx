interface Props {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string | number
}

export default function DetailItem({ icon: Icon, title, description }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
        <Icon className="size-5" />
      </div>

      <div>
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="font-medium">{description}</p>
      </div>
    </div>
  )
}
