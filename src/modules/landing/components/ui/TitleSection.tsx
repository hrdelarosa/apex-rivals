interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string
}

export default function TitleSection({ children, ...props }: Props) {
  return (
    <h2
      className={`${props.className} text-3xl sm:text-4xl md:text-5xl mb-6 font-extrabold font-exo2`}
    >
      {children}
    </h2>
  )
}
