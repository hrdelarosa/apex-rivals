import { db } from '@/src/db'
import { sql } from 'drizzle-orm'
import { generateId } from 'better-auth'
import { staticBoosters, staticScoringRules } from '@/src/db/data'
import {
  seasons,
  boosterCatalog,
  scoringRules,
  constructors,
  drivers,
  races,
} from '@/src/db/schema'
import { fetchSeasonDatasets } from '@/src/db/seed/api'

const CURRENT_SEASON = new Date().getFullYear()

async function seed() {
  console.log('Seeding database...')

  console.log('Fetching season data from API...')
  const { constructorsData, driversData, racesData } =
    await fetchSeasonDatasets(CURRENT_SEASON)

  await db.transaction(async (tx) => {
    console.log('Seeding season...')
    await tx
      .insert(seasons)
      .values({
        year: CURRENT_SEASON,
        championshipName: `${CURRENT_SEASON} Formula 1 World Championship`,
      })
      .onConflictDoUpdate({
        target: seasons.year,
        set: {
          championshipName: sql`excluded."championshipName"`,
        },
      })

    console.log('Seeding scoring rules...')
    await tx
      .insert(scoringRules)
      .values(
        staticScoringRules.map((rule) => ({
          id: generateId(),
          ...rule,
        })),
      )
      .onConflictDoUpdate({
        target: scoringRules.code,
        set: {
          description: sql`excluded."description"`,
          points: sql`excluded."points"`,
          category: sql`excluded."category"`,
          isActive: sql`excluded."isActive"`,
          updatedAt: sql`now()`,
        },
      })

    console.log('Seeding booster catalog...')
    await tx
      .insert(boosterCatalog)
      .values(
        staticBoosters.map((boos) => ({
          id: generateId(),
          ...boos,
        })),
      )
      .onConflictDoUpdate({
        target: boosterCatalog.code,
        set: {
          name: sql`excluded."name"`,
          description: sql`excluded."description"`,
          multiplier: sql`excluded."multiplier"`,
          appliesTo: sql`excluded."appliesTo"`,
          isActive: sql`excluded."isActive"`,
        },
      })

    console.log('Seeding constructors...')
    await tx
      .insert(constructors)
      .values(constructorsData)
      .onConflictDoUpdate({
        target: constructors.id,
        set: {
          logoUrl: sql`excluded."logoUrl"`,
          primaryColor: sql`excluded."primaryColor"`,
          contrastColor: sql`excluded."contrastColor"`,
          isActive: sql`true`,
          updatedAt: sql`now()`,
        },
      })

    console.log('Seeding drivers...')
    await tx
      .insert(drivers)
      .values(driversData)
      .onConflictDoUpdate({
        target: drivers.id,
        set: {
          portraitUrl: sql`excluded."portraitUrl"`,
          isActive: sql`true`,
          updatedAt: sql`now()`,
        },
      })

    console.log('Seeding races...')
    await tx
      .insert(races)
      .values(racesData)
      .onConflictDoUpdate({
        target: races.id,
        set: {
          name: sql`excluded."name"`,
          round: sql`excluded."round"`,
          date: sql`excluded."date"`,
          weekendFormat: sql`excluded."weekendFormat"`,
          status: sql`excluded."status"`,
          marketCloseAt: sql`excluded."marketCloseAt"`,
          updatedAt: sql`now()`,
        },
      })
  })

  console.log('Database seeding completed.')
}

seed()
  .catch((error) => {
    console.error('Error seeding database:', error)
    process.exit(1)
  })
  .then(() => process.exit(0))
