export default function LabelSection({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <span className="text-sm text-warm-red font-semibold font-exo2 uppercase">
      {children}
    </span>
  )
}
