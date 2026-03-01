interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string
}

export default function TitleSection({ title, ...props }: Props) {
  return (
    <h2
      className={` ${props.className} mb-6 text-3xl sm:text-4xl md:text-5xl font-extrabold font-exo2`}
    >
      {title}
    </h2>
  )
}
