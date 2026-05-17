import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs'

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-4xl font-bold font-exo2">Mis Ligas</h1> */}
        <Tabs defaultValue="discover-leagues">
          <TabsList variant="line">
            <TabsTrigger
              value="discover-leagues"
              className="text-3xl font-bold font-exo2"
            >
              Descubrir Ligas
            </TabsTrigger>

            <TabsTrigger
              value="my-leagues"
              className="text-3xl font-bold font-exo2"
            >
              Mis Ligas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="discover-leagues">
            <p>
              Aquí puedes descubrir nuevas ligas para unirte. Explora las ligas
              disponibles y encuentra la que mejor se adapte a tus intereses y
              habilidades. ¡Únete a una liga y comienza a competir hoy mismo!
            </p>
          </TabsContent>
          <TabsContent value="my-leagues">
            <p>
              Aquí puedes ver las ligas a las que perteneces y gestionar tu
              participación.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
