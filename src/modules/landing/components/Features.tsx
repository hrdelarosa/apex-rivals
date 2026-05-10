import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'
import { Field, FieldLabel } from '@/src/components/ui/field'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/src/components/ui/item'
import { Progress } from '@/src/components/ui/progress'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'
import {
  IconPlus,
  IconTrendingUp,
  IconPasswordUser,
  IconBellRinging,
} from '@tabler/icons-react'
import Image from 'next/image'

export default function Features() {
  return (
    <div className="grid auto-rows-[minmax(150px,1fr)] grid-cols-1 md:grid-cols-12 gap-3">
      <Card className="col-span-8">
        <CardContent>
          <div className="grid grid-cols-[2fr_1fr] gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-border shadow-xl/20">
                <div className="flex items-center gap-2">
                  <Avatar size="lg">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold leading-tight text-foreground">
                      Max Verstappen
                    </p>
                    <small className="text-xs text-muted-foreground font-medium">
                      Red Bull Racing
                    </small>
                  </div>
                </div>

                <span className="text-base font-exo2 font-bold text-foreground">
                  $25M
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-border shadow-xl/20">
                <div className="flex items-center gap-2">
                  <Avatar size="lg">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold leading-tight text-foreground">
                      Max Verstappen
                    </p>
                    <small className="text-xs text-muted-foreground font-medium">
                      Red Bull Racing
                    </small>
                  </div>
                </div>

                <span className="text-base font-exo2 font-bold text-foreground">
                  $25M
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl border border-border shadow-xl/20">
              <div className="flex flex-col items-center gap-2">
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <p className="text-sm font-semibold leading-tight text-foreground">
                  Red Bull Racing
                </p>
              </div>

              <span className="text-base font-exo2 font-bold text-foreground">
                $25M
              </span>
            </div>
          </div>

          <Field className="w-full mt-3 gap-2">
            <FieldLabel className="text-sm">
              <span className="font-medium text-muted-foreground">
                Presupuesto utilizado
              </span>
              <span className="font-exo2 font-semibold ml-auto">
                $75M / $100M
              </span>
            </FieldLabel>
            <Progress value={75} max={100} className="h-1.5" />
          </Field>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3">
          <h3 className="text-xl font-exo2 font-semibold leading-none text-foreground">
            2 Pilotos + 1 Constructor
          </h3>

          <p className="text-sm text-muted-foreground">
            Arma tu equipo ideal dentro de un presupuesto de 100M (para cada
            liga, un equipo diferente) y domina la temporada. Gestiona tu equipo
            de forma estratégica y maximiza tu potencial.
          </p>
        </CardFooter>
      </Card>

      <Card className="col-span-4 gap-2">
        <CardHeader>
          <IconPasswordUser size={42} className="text-primary/80" />
        </CardHeader>

        <CardContent>
          <h3 className="text-xl font-exo2 font-semibold">Acceso seguro</h3>

          <p className="text-muted-foreground text-sm mt-2">
            Autenticación segura através de Google y Correo electrónico. Tu
            cuenta, tus datos de telemetria y tu estrategia de turnos,
            protegidos por los mejores estándares de seguridad.
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-5">
        <CardHeader>
          <CardTitle className="text-xl font-exo2 font-semibold">
            Modificadores Especiales
          </CardTitle>

          <CardDescription>
            Despliega potenciadores tácticos de uso limitado. Una ventaja
            estratégica diseñada para maximizar tus puntos en los fines de
            semana más críticos.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ItemGroup className="gap-2">
            <Item variant="outline" className="rounded-xl p-3">
              <ItemMedia variant="image">
                <Image
                  src="/apex-rivals-logo.webp"
                  alt="iamge"
                  width={32}
                  height={32}
                  className="object-cover grayscale"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Turbo Captain</ItemTitle>
              </ItemContent>

              <ItemContent>
                <Badge>x2 puntos</Badge>
              </ItemContent>
            </Item>

            <Item variant="outline" className="rounded-xl p-3">
              <ItemMedia variant="image">
                <Image
                  src="/apex-rivals-logo.webp"
                  alt="iamge"
                  width={32}
                  height={32}
                  className="object-cover grayscale"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Constructor Boost</ItemTitle>
              </ItemContent>

              <ItemContent>
                <Badge>x1.5 puntos</Badge>
              </ItemContent>
            </Item>

            <Item variant="outline" className="rounded-xl p-3">
              <ItemMedia variant="image">
                <Image
                  src="/apex-rivals-logo.webp"
                  alt="iamge"
                  width={32}
                  height={32}
                  className="object-cover grayscale"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Sprint Focus</ItemTitle>
              </ItemContent>

              <ItemContent>
                <Badge>x1.30 puntos</Badge>
              </ItemContent>
            </Item>
          </ItemGroup>
        </CardContent>
      </Card>

      <Card className="col-span-3 gap-2">
        <CardHeader>
          <IconBellRinging size={42} className="text-primary/80" />
        </CardHeader>

        <CardContent>
          <h3 className="text-xl font-exo2 font-semibold">
            Notificaciones Claves
          </h3>

          <p className="text-muted-foreground text-sm mt-2">
            Recibe avisos antes del cierre de mercado, cambios de precio,
            resultados de carreras y movimientos de las ligas. Mantente
            informado y toma decisiones estratégicas.
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-exo2 font-semibold">
            Compite en ligas
          </CardTitle>

          <CardDescription>
            Enfréntate a otros jugadores en ligas públicas o crea la tuya con
            amigos. Cada Gran Premio redefine la clasificación, así que una
            buena estrategia puede llevarte de la mitad de la tabla al primer
            lugar en un solo fin de semana.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>
              Ligas públicas y privadas para unirte o crear con amigos.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead className="text-right">Tipo</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Scuderia Rivals</TableCell>
                <TableCell className="font-medium">121</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">Pública</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  World Championship
                </TableCell>
                <TableCell className="font-medium">312</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">Pública</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Grid Rush</TableCell>
                <TableCell className="font-medium">16/20</TableCell>
                <TableCell className="text-right">
                  <Badge variant="default">Privada</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">American Series</TableCell>
                <TableCell className="font-medium">94</TableCell>
                <TableCell className="text-right">
                  <Badge variant="outline">Pública</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="col-span-6">
        <CardContent>
          <Item variant="outline" className="rounded-xl">
            <ItemMedia variant="image">
              <Avatar size="lg">
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Max Verstappen</ItemTitle>
              <ItemDescription>Red Bull Racing</ItemDescription>
            </ItemContent>

            <ItemContent>
              <p className="font-semibold">$28.4M</p>
              <ItemDescription className="text-xs inline-flex items-center gap-1">
                $25.1M
                <IconTrendingUp size={14} className="text-green-500" />
              </ItemDescription>
            </ItemContent>
          </Item>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3">
          <h3 className="text-xl font-exo2 font-semibold leading-none text-foreground">
            Precios Dinámicos
          </h3>

          <p className="text-sm text-muted-foreground">
            Precios dinámicos atados al rendimiento real. El valor de tu
            alineación fluctúa cada Gran Premio. Lee el mercado, ficha en el
            momento exacto y optimiza tu capital para asegurar la victoria.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
