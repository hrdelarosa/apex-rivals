interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string | React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export default function TitleSection({
  children,
  size = 'md',
  ...props
}: Props) {
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl md:text-4xl',
    md: 'text-3xl sm:text-4xl md:text-5xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl',
  }

  return (
    <h2
      className={`${props.className} ${sizeClasses[size]} mb-6 font-extrabold font-exo2`}
    >
      {children}
    </h2>
  )
}
