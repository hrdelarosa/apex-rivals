import { usePathname } from 'next/navigation'

export function useActiveRoute() {
  const pathname = usePathname()
  const isActive = ({ path }: { path: string }) => {
    return pathname === path
  }

  return { isActive }
}
