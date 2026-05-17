import { IconPlus, IconUserPlus } from '@tabler/icons-react'
import { Button } from '../ui/button'

interface Props {
  action: string
}

export default function SiteHeaderActions({ action }: Props) {
  const showActions = action === 'Ligas'

  if (!showActions) return null

  return (
    <div className="ml-auto flex items-center gap-3">
      {action === 'Ligas' && (
        <>
          <Button variant="outline" size="sm">
            <IconUserPlus />
            Unirse
          </Button>

          <Button variant="default" size="sm">
            <IconPlus />
            Crear Liga
          </Button>
        </>
      )}
    </div>
  )
}
