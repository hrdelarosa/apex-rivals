import { sql } from 'drizzle-orm'
import {
  pgTable,
  pgEnum,
  text,
  varchar,
  integer,
  decimal,
  timestamp,
  boolean,
  uniqueIndex,
  index,
  check,
} from 'drizzle-orm/pg-core'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
  ipAddress: varchar('ipAddress', { length: 45 }),
  userAgent: text('userAgent'),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accountId: varchar('accountId', { length: 255 }).notNull(),
  providerId: varchar('providerId', { length: 155 }).notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', {
    withTimezone: true,
  }),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', {
    withTimezone: true,
  }),
  scope: varchar('scope', { length: 555 }),
  idToken: text('idToken'),
  password: varchar('password', { length: 255 }),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: varchar('identifier', { length: 255 }).notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresAt', { withTimezone: true }).notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const typeLeagueEnum = pgEnum('type_league', [
  'global',
  'regional',
  'private',
])
export const regionLeagueEnum = pgEnum('region_league', [
  'america',
  'europa',
  'asia',
  'africa',
  'oceania',
])
export const roleLeagueEnum = pgEnum('role_league', [
  'owner',
  'manager',
  'player',
])
export const typeSessionEnum = pgEnum('type_session', [
  'race',
  'qualy',
  'sprint',
  'qualy_sprint',
])
export const typeTransactionsEnum = pgEnum('type_transactions', [
  'buy',
  'sell',
  'penalty',
  'adjustment',
])
export const transactionSubjectEnum = pgEnum('transaction_subject', [
  'driver',
  'constructor',
  'fee',
])
export const pointsScoringEnum = pgEnum('points_scoring', [
  'position',
  'bonus',
  'penalty',
])
export const awardTypeEnum = pgEnum('award_type', ['driver_of_the_day'])

export const league = pgTable(
  'league',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    createdBy: text('created_by')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    type: typeLeagueEnum('type').notNull(),
    region: regionLeagueEnum('region').notNull(),
    invitCode: varchar('invit_code', { length: 10 }).unique(),
    maxParticipants: integer('max_participants').default(10).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    createdByNameIdx: uniqueIndex('uidx_league_created_by_name').on(
      table.createdBy,
      table.name
    ),
  })
)

export const leagueMemberships = pgTable(
  'league_memberships',
  {
    id: text('id').primaryKey(),
    leagueId: text('league_id')
      .notNull()
      .references(() => league.id, { onDelete: 'cascade' }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    role: roleLeagueEnum('role').notNull().default('player'),
    joinedAt: timestamp('joined_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    leagueUserUnique: uniqueIndex(
      'uidx_league_memberships_league_id_user_id'
    ).on(table.leagueId, table.userId),
  })
)

export const teams = pgTable(
  'teams',
  {
    id: text('id').primaryKey(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    leagueId: text('league_id')
      .notNull()
      .references(() => league.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    budget: decimal('budget', { precision: 12, scale: 2 })
      .default('100.00')
      .notNull(),
    points: integer('points').default(0).notNull(),
    changesRemaining: integer('changes_remaining').default(25).notNull(),
    penaltyPoints: integer('penalty_points').default(0).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    userLeagueNameUnique: uniqueIndex('uidx_teams_user_id_league_id_name').on(
      table.userId,
      table.leagueId,
      table.name
    ),
  })
)

export const drivers = pgTable(
  'drivers',
  {
    id: text('id').primaryKey(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    fullName: varchar('full_name', { length: 255 }).notNull(),
    acronym: varchar('acronym', { length: 3 }).notNull().unique(),
    nationality: varchar('nationality', { length: 50 }).notNull(),
    number: integer('number').notNull().unique(),
    portraitUrl: text('portrait_url'),
    numberIconUrl: text('number_icon_url'),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    driversNumberIdx: index('idx_drivers_number').on(table.number),
  })
)

export const driverConstructorSeason = pgTable(
  'driver_constructor_season',
  {
    id: text('id').primaryKey(),
    driverId: text('driver_id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    constructorId: text('constructor_id')
      .notNull()
      .references(() => constructors.id, { onDelete: 'cascade' }),
    seasonYear: integer('season_year')
      .notNull()
      .references(() => seasons.year, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    driverSeasonUnique: uniqueIndex(
      'uidx_driver_constructor_season_driver_id_season_year'
    ).on(table.driverId, table.seasonYear),
    constructorSeasonIdx: index(
      'idx_driver_constructor_season_constructor_id_season_year'
    ).on(table.constructorId, table.seasonYear),
  })
)

export const driverPriceHistory = pgTable(
  'driver_price_history',
  {
    id: text('id').primaryKey(),
    driverId: text('driver_id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    raceId: text('race_id')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  },
  (table) => ({
    driverRaceUnique: uniqueIndex(
      'uidx_driver_price_history_driver_id_race_id'
    ).on(table.driverId, table.raceId),
  })
)

export const constructors = pgTable(
  'constructors',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    logoUrl: text('logo_url'),
    carImageUrl: text('car_image_url'),
    primaryColor: varchar('primary_color', { length: 7 }),
    contrastColor: varchar('contrast_color', { length: 7 }),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    nameIdx: index('idx_constructors_name').on(table.name),
  })
)

export const constructorPriceHistory = pgTable(
  'constructor_price_history',
  {
    id: text('id').primaryKey(),
    constructorId: text('constructor_id')
      .notNull()
      .references(() => constructors.id, { onDelete: 'cascade' }),
    raceId: text('race_id')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
  },
  (table) => ({
    constructorRaceUnique: uniqueIndex(
      'uidx_constructor_price_history_constructor_id_race_id'
    ).on(table.constructorId, table.raceId),
  })
)

export const seasons = pgTable('seasons', {
  year: integer('year').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const circuits = pgTable('circuits', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  country: varchar('country', { length: 155 }).notNull(),
  city: varchar('city', { length: 155 }).notNull(),
  circuitLength: integer('circuit_length'),
  numberOfCurves: integer('number_of_curves'),
  lapRecord: varchar('lap_record', { length: 20 }),
  firstParticipationYear: integer('first_participation_year'),
  fastestLapDriverId: text('fastest_lap_driver_id'),
  fastestLapTeamId: text('fastest_lap_team_id'),
  fastestLapYear: integer('fastest_lap_year'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const races = pgTable(
  'races',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    circuitId: text('circuit_id')
      .notNull()
      .references(() => circuits.id, { onDelete: 'cascade' }),
    seasonYear: integer('season_year')
      .notNull()
      .references(() => seasons.year, { onDelete: 'cascade' }),
    laps: integer('laps').notNull(),
    round: integer('round').notNull(),
    isCompleted: boolean('is_completed').notNull().default(false),
    date: timestamp('date', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    seasonYearIdx: index('idx_races_season_year').on(table.seasonYear),
    seasonRoundUnique: uniqueIndex('uidx_races_season_year_round').on(
      table.seasonYear,
      table.round
    ),
  })
)

export const sessionRace = pgTable(
  'session_race',
  {
    id: text('id').primaryKey(),
    type: typeSessionEnum('type').notNull(),
    raceId: text('race_id')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    raceTypeIdx: index('idx_session_race_race_id_type').on(
      table.raceId,
      table.type
    ),
  })
)

export const lineup = pgTable(
  'lineup',
  {
    id: text('id').primaryKey(),
    teamId: text('team_id')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    raceId: text('race_id')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    driver1Id: text('driver1_id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    driver2Id: text('driver2_id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    constructorId: text('constructor_id')
      .notNull()
      .references(() => constructors.id, { onDelete: 'cascade' }),
    pointsEarned: integer('points_earned').default(0).notNull(),
    blocked: boolean('blocked').notNull().default(false),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    raceIdIdx: index('idx_lineup_race_id').on(table.raceId),
    teamRaceUnique: uniqueIndex('uidx_lineup_team_id_race_id').on(
      table.teamId,
      table.raceId
    ),
    driverCheck: check(
      'chk_lineup_driver_ids_not_equal',
      sql`${table.driver1Id} <> ${table.driver2Id}`
    ),
  })
)

export const results = pgTable(
  'results',
  {
    id: text('id').primaryKey(),
    driverId: text('driver_id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    raceId: text('race_id')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    sessionRaceId: text('session_race_id')
      .notNull()
      .references(() => sessionRace.id, { onDelete: 'cascade' }),
    position: integer('position').notNull(),
    grid: integer('grid').notNull(),
    lapsCompleted: integer('laps_completed').notNull(),
    time: varchar('time', { length: 50 }),
    fastestLapTime: varchar('fastest_lap_time', { length: 20 }),
    fastestLap: boolean('fastest_lap').notNull().default(false),
    dnf: boolean('dnf').notNull().default(false),
    points: integer('points').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    raceSessionPositionIdx: index(
      'idx_results_race_id_session_race_id_position'
    ).on(table.raceId, table.sessionRaceId, table.position),
    driverSessionUnique: uniqueIndex(
      'uidx_results_driver_id_session_race_id'
    ).on(table.driverId, table.sessionRaceId),
    raceDriverIdx: index('idx_results_race_id_driver_id').on(
      table.raceId,
      table.driverId
    ),
  })
)

export const transactions = pgTable(
  'transactions',
  {
    id: text('id').primaryKey(),
    teamId: text('team_id')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    type: typeTransactionsEnum('type').notNull(),
    subjectType: transactionSubjectEnum('subject_type').notNull(),
    subjectId: text('subject_id'),
    amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
    raceId: text('race_id')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    teamRaceIdx: index('idx_transactions_team_id_race_id').on(
      table.teamId,
      table.raceId
    ),
    subjectConstraint: check(
      'chk_transactions_subject_id_consistency',
      sql`
        (
          ( ${table.subjectType} = 'fee' AND ${table.subjectId} IS NULL )
          OR
          ( ${table.subjectType} IN ('driver', 'constructor') AND ${table.subjectId} IS NOT NULL )
        )
      `
    ),
  })
)

export const codePositions = pgTable('code_positions', {
  code: varchar('code', { length: 50 }).primaryKey(),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const scoringRules = pgTable(
  'scoring_rules',
  {
    id: text('id').primaryKey(),
    codePosition: varchar('code_position', { length: 50 })
      .notNull()
      .references(() => codePositions.code, { onDelete: 'cascade' }),
    points: integer('points').notNull(),
    category: pointsScoringEnum('category').notNull(),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    codePositionIdx: index('idx_scoring_rules_code_position').on(
      table.codePosition
    ),
  })
)

export const scoringEvents = pgTable(
  'scoring_events',
  {
    id: text('id').primaryKey(),
    driverId: text('driver_id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    raceId: text('race_id')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    sessionRaceId: text('session_race_id')
      .notNull()
      .references(() => sessionRace.id, { onDelete: 'cascade' }),
    ruleId: text('rule_id')
      .notNull()
      .references(() => scoringRules.id, { onDelete: 'cascade' }),
    value: integer('value').default(1).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    driverSessionRuleUnique: uniqueIndex(
      'uniq_scoring_events_driver_id_session_race_id_rule_id'
    ).on(table.driverId, table.sessionRaceId, table.ruleId),
  })
)

export const raceAwards = pgTable(
  'race_awards',
  {
    id: text('id').primaryKey(),
    raceId: text('race_id')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    driverId: text('driver_id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    awardType: awardTypeEnum('award_type').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    driverIdIdx: index('idx_race_awards_driver_id').on(table.driverId),
    raceAwardUnique: uniqueIndex('uniq_race_awards_race_id_award_type').on(
      table.raceId,
      table.awardType
    ),
  })
)
