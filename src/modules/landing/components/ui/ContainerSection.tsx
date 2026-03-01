interface Props extends React.HTMLAttributes<HTMLElement> {
  id: string
  children: React.ReactNode
}

export default function ContainerSection({ id, children, ...props }: Props) {
  return (
    <section
      id={id}
      data-section={id}
      className={`${props.className} scroll-m-20 w-full max-w-7xl mx-auto px-4 lg:px-10 2xl:px-0`}
    >
      {children}
    </section>
  )
}
