import Link from 'next/link'

interface Props {
  title: string
  listItems: { label: string; href: string }[]
}

export default function ListFooter({ title, listItems }: Props) {
  return (
    <div>
      <h4 className="font-exo2 font-bold mb-4">{title}</h4>

      <ul className="space-y-2.5 text-sm text-muted-foreground">
        {listItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="whitespace-nowrap transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
