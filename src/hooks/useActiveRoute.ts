import { usePathname } from 'next/navigation'

export function useActiveRoute() {
  const pathname = usePathname()
  const isActive = ({ href }: { href: string }) => {
    return pathname === href
  }

  return { isActive }
}
