'use client'

import { IconMapPinOff } from '@tabler/icons-react'

import { Location } from '../types/nextGranPrix.types'
import { Card } from '@/src/components/ui/card'
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  type MapRef,
} from '@/src/components/ui/map'
import { useEffect, useRef, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'

type PartialLocation = Partial<Location>
interface Props extends PartialLocation {
  raceName: string | undefined
}

const styles = {
  default: undefined,
  openstreetmap: 'https://tiles.openfreemap.org/styles/bright',
  openstreetmap3d: 'https://tiles.openfreemap.org/styles/liberty',
}

type StyleKey = keyof typeof styles

export default function NextGrandPrixMap({
  long,
  lat,
  locality,
  country,
  raceName,
}: Props) {
  const mapRef = useRef<MapRef>(null)
  const [style, setStyle] = useState<StyleKey>('default')
  const selectedStyle = styles[style]
  const is3D = style === 'openstreetmap3d'
  const longitude = parseFloat(long ?? '')
  const latitude = parseFloat(lat ?? '')
  const isValidLocation = isFinite(latitude) && isFinite(longitude)

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 })
  }, [is3D])

  return (
    <>
      {!isValidLocation ? (
        <Card className="relative h-64 overflow-hidden border-border/60 bg-zinc-950/65 p-0">
          <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-warm-red/10 blur-2xl" />
          <div className="pointer-events-none absolute -left-14 -bottom-14 size-36 rounded-full bg-primary/10 blur-2xl" />

          <div className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full border border-border/70 bg-background/70">
              <IconMapPinOff size={22} className="text-warm-red" />
            </span>

            <div className="space-y-1">
              <p className="font-exo2 text-lg font-bold">
                Ubicación no disponible
              </p>
              <p className="text-sm text-muted-foreground">
                Este circuito aún no tiene coordenadas cargadas para mostrar el
                mapa.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="h-75 p-0 overflow-hidden">
          <Map
            ref={mapRef}
            center={[longitude, latitude]}
            zoom={14}
            styles={
              selectedStyle
                ? { light: selectedStyle, dark: selectedStyle }
                : undefined
            }
          >
            <div className="absolute top-2 left-2 z-10 bg-background/80 rounded-md shadow">
              <Select
                defaultValue={style}
                onValueChange={(value) => setStyle(value as StyleKey)}
              >
                <SelectTrigger className="">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent className="border-border/70 bg-zinc-950 text-foreground shadow-xl">
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="openstreetmap">OpenStreetMap</SelectItem>
                  <SelectItem value="openstreetmap3d">
                    OpenStreetMap 3D
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <MapControls position="top-right" showFullscreen />

            <MapMarker longitude={longitude} latitude={latitude}>
              <MarkerContent />
              <MarkerTooltip>{raceName}</MarkerTooltip>
              <MarkerPopup>
                <div>
                  <p className="text-foreground font-semibold">{raceName}</p>
                  <p className="text-muted-foreground">
                    {locality}, {country}
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {latitude.toFixed(4)}, {longitude.toFixed(4)}
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          </Map>
        </Card>
      )}
    </>
  )
}
