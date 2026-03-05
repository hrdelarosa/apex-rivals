import { sql } from 'drizzle-orm'
import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  uniqueIndex,
  index,
  pgEnum,
  decimal,
  check,
} from 'drizzle-orm/pg-core'

export const assetTypeEnum = pgEnum('assetType', ['driver', 'constructor'])
export const assetClassEnum = pgEnum('assetClass', ['S', 'A', 'B', 'C'])
export const typeSessionEnum = pgEnum('typeSession', [
  'race',
  'qualy',
  'sprint',
  'qualy_sprint',
])
export const pointsScoringEnum = pgEnum('pointsScoring', [
  'position',
  'bonus',
  'penalty',
])
export const awardTypeEnum = pgEnum('awardType', [
  'driverOfTheDay',
  'fastestLap',
  'polePosition',
])
export const typeLeagueEnum = pgEnum('typeLeague', [
  'global',
  'regional',
  'private',
])
export const roleLeagueEnum = pgEnum('roleLeague', [
  'owner',
  'manager',
  'player',
])
export const typeTransactionEnum = pgEnum('typeTransaction', [
  'buy',
  'sell',
  'penalty',
  'ajustment',
])
export const transactionSubjectEnum = pgEnum('transactionSubject', [
  'driver',
  'constructor',
  'fee',
])
export const boosterStatusEnum = pgEnum('boosterStatus', [
  'available',
  'used',
  'expired',
])

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

export const userProfile = pgTable(
  'userProfile',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: 'cascade' }),
    username: varchar('username', { length: 40 }).notNull(),
    bio: varchar('bio', { length: 250 }),
    country: varchar('country', { length: 75 }),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [uniqueIndex('uidx_user_profile_username').on(table.username)],
)

export const seasons = pgTable('seasons', {
  year: integer('year').primaryKey(),
  isActive: boolean('isActive').notNull().default(false),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const circuits = pgTable('circuits', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  country: varchar('country', { length: 75 }).notNull(),
  city: varchar('city', { length: 100 }).notNull(),
  circuitLengthM: integer('circuitLengthM').notNull(),
  numberOfTurns: integer('numberOfTurns').notNull(),
  lapRecord: varchar('lapRecord', { length: 50 }).notNull(),
  lapRecordYear: integer('lapRecordYear').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updateAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const constructors = pgTable(
  'constructors',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    sortName: varchar('sortName', { length: 50 }).notNull(),
    logoUrl: text('logoUrl'),
    primaryColor: varchar('primaryColor', { length: 7 }),
    constrastColor: varchar('contrastColor', { length: 7 }),
    isActive: boolean('isActive').notNull().default(true),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updateAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('idx_constructors_name').on(table.name)],
)

export const drivers = pgTable(
  'drivers',
  {
    id: text('id').primaryKey(),
    firstName: varchar('firstName', { length: 100 }).notNull(),
    lastName: varchar('lastName', { length: 100 }).notNull(),
    fullName: varchar('fullName', { length: 255 }).notNull().unique(),
    acronym: varchar('acronym', { length: 3 }).notNull().unique(),
    nationality: varchar('nationality', { length: 75 }).notNull(),
    number: integer('number').notNull(),
    portraiUrl: text('portraitUrl'),
    isActive: boolean('isActive').notNull().default(true),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updateAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('idx_drivers_number').on(table.number),
    index('idx_drivers_acronym').on(table.acronym),
  ],
)

export const assetClassHistory = pgTable(
  'assetClassHistory',
  {
    id: text('id').primaryKey(),
    assetType: assetTypeEnum('assetType').notNull(),
    assetId: text('assetId').notNull(),
    seasonYear: integer('seasonYear')
      .notNull()
      .references(() => seasons.year, { onDelete: 'cascade' }),
    class: assetClassEnum('class').notNull(),
    minPrice: decimal('minPrice', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_asset_class_history_asset_season').on(
      table.assetType,
      table.assetId,
      table.seasonYear,
    ),
    index('idx_asset_class_history_asset_id').on(table.assetId),
  ],
)

export const priceHistory = pgTable(
  'priceHistory',
  {
    id: text('id').primaryKey(),
    assetType: assetTypeEnum('assetType').notNull(),
    assetId: text('assetId').notNull(),
    raceId: text('raceId')
      .notNull()
      .references(() => seasons.year, { onDelete: 'cascade' }),
    price: decimal('price', { precision: 12, scale: 2 }).notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_price_history_asset_race').on(
      table.assetType,
      table.assetId,
      table.raceId,
    ),
    index('idx_price_history_asset_id').on(table.assetType, table.assetId),
  ],
)

export const driverConstructorSeason = pgTable(
  'driverConstructorSeason',
  {
    id: text('id').primaryKey(),
    driverId: text('driverId')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    constructorId: text('constructorId')
      .notNull()
      .references(() => constructors.id, { onDelete: 'cascade' }),
    seasonYear: integer('seasonYear')
      .notNull()
      .references(() => seasons.year, { onDelete: 'cascade' }),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_driver_constructor_season').on(
      table.driverId,
      table.seasonYear,
    ),
    uniqueIndex('uidx_driver_constructor_season_constructor').on(
      table.constructorId,
      table.seasonYear,
    ),
  ],
)

export const races = pgTable(
  'races',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    circuitId: text('circuitId')
      .notNull()
      .references(() => circuits.id, { onDelete: 'cascade' }),
    seasonYear: integer('seasonYear')
      .notNull()
      .references(() => seasons.year, { onDelete: 'cascade' }),
    round: integer('round').notNull(),
    laps: integer('laps').notNull(),
    date: timestamp('date', { withTimezone: true }).notNull(),
    isCompleted: boolean('isCompleted').notNull().default(false),
    marketCloseAt: timestamp('marketCloseAt', { withTimezone: true }),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('idx_races_season_year').on(table.seasonYear),
    index('idx_races_date').on(table.date),
    uniqueIndex('uidx_races_season_round').on(table.seasonYear, table.round),
  ],
)

export const reaceSessions = pgTable(
  'raceSessions',
  {
    id: text('id').primaryKey(),
    raceId: text('raceId')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    type: typeSessionEnum('type').notNull(),
    startsAt: timestamp('startsAt', { withTimezone: true }).notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('idx_race_sessions_race_id').on(table.raceId),
    uniqueIndex('uid_race_sessions_race_type').on(table.raceId, table.type),
  ],
)

export const results = pgTable(
  'results',
  {
    id: text('id').primaryKey(),
    driverId: text('driverId')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    raceId: text('raceId')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    raceSessionId: text('raceSessionId')
      .notNull()
      .references(() => reaceSessions.id, { onDelete: 'cascade' }),
    position: integer('position').notNull(),
    grid: integer('grid').notNull(),
    lapsCompleted: integer('lapsCompleted').notNull(),
    time: varchar('time', { length: 50 }),
    fastestLapTime: varchar('fastestLapTime', { length: 20 }),
    fastestLap: boolean('fastestLap').notNull().default(false),
    dnf: boolean('dnf').notNull().default(false),
    points: integer('points').notNull().default(0),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_results_driver_session').on(
      table.driverId,
      table.raceSessionId,
    ),
    index('idx_results_race_session').on(table.raceId, table.raceSessionId),
    index('idx_results_race_driver').on(table.raceId, table.driverId),
  ],
)

export const scoringRules = pgTable(
  'scoringRules',
  {
    id: text('id').primaryKey(),
    code: varchar('code', { length: 50 }).notNull().unique(),
    description: varchar('description', { length: 255 }).notNull(),
    points: integer('points').notNull(),
    category: pointsScoringEnum('category').notNull(),
    appliesTo: assetTypeEnum('appliesTo').notNull(),
    isActive: boolean('isActive').notNull().default(true),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('idx_scoring_rules_code').on(table.code),
    index('idx_scoring_rules_category').on(table.category),
  ],
)

export const scoringEvents = pgTable(
  'scoringEvents',
  {
    id: text('id').primaryKey(),
    driverId: text('driverId')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    raceId: text('raceId')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    raceSessionId: text('raceSessionId')
      .notNull()
      .references(() => reaceSessions.id, { onDelete: 'cascade' }),
    ruleId: text('ruleId')
      .notNull()
      .references(() => scoringRules.id, { onDelete: 'cascade' }),
    value: integer('value').notNull().default(1),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_scoring_events_driver_session_rule').on(
      table.driverId,
      table.raceSessionId,
      table.ruleId,
    ),
    index('idx_scoring_events_driver_race').on(table.driverId, table.raceId),
  ],
)

export const raceAwards = pgTable(
  'raceAwards',
  {
    id: text('id').primaryKey(),
    raceId: text('raceId')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    driverId: text('driverId')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    adwardType: awardTypeEnum('awardType').notNull(),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('idx_race_awards_driver').on(table.driverId),
    uniqueIndex('uidx_race_awards_race_award').on(
      table.raceId,
      table.adwardType,
    ),
  ],
)

export const leagues = pgTable(
  'leagues',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    description: varchar('description', { length: 500 }),
    createdBy: text('createdBy')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    type: typeLeagueEnum('type').notNull(),
    region: typeLeagueEnum('region').notNull(),
    inviteCode: varchar('inviteCode', { length: 10 }).notNull().unique(),
    maxParticipants: integer('maxParticipants').notNull().default(20),
    seasonYear: integer('seasonYear')
      .notNull()
      .references(() => seasons.year, { onDelete: 'cascade' }),
    isActive: boolean('isActive').notNull().default(true),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_leagues_created_by_name').on(table.createdBy, table.name),
    index('idx_leagues_type').on(table.type),
    index('idx_leagues_season_year').on(table.seasonYear),
    check(
      'chk_leagues_invite_code_private',
      sql`(${table.type} = 'private' AND (${table.inviteCode}) = IS NOT NULL) OR (${table.type} <> 'private')`,
    ),
  ],
)

export const leagueMemberships = pgTable(
  'leagueMemberships',
  {
    id: text('id').primaryKey(),
    leagueId: text('leagueId')
      .notNull()
      .references(() => leagues.id, { onDelete: 'cascade' }),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    role: roleLeagueEnum('role').notNull().default('player'),
    joinedAt: timestamp('joinedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_league_memberships_league_user').on(
      table.leagueId,
      table.userId,
    ),
    index('idx_league_memberships_user_id').on(table.userId),
  ],
)

export const teams = pgTable(
  'teams',
  {
    id: text('id').primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    leagueId: text('leagueId')
      .notNull()
      .references(() => leagues.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    budget: decimal('budget', { precision: 12, scale: 2 })
      .notNull()
      .default('1000000.00'),
    points: integer('points').notNull().default(0),
    changesRemaining: integer('changesRemaining').notNull().default(25),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_teams_user_league').on(table.userId, table.leagueId),
  ],
)

export const lineups = pgTable(
  'lineUps',
  {
    id: text('id').primaryKey(),
    teamId: text('teamId')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    raceId: text('raceId')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    driver1Id: text('driver1Id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    driver2Id: text('driver2Id')
      .notNull()
      .references(() => drivers.id, { onDelete: 'cascade' }),
    constructorId: text('constructorId')
      .notNull()
      .references(() => constructors.id, { onDelete: 'cascade' }),
    pointsEarned: integer('pointsEarned').notNull().default(0),
    blocked: boolean('blocked').notNull().default(false),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_lineups_team_race').on(table.teamId, table.raceId),
    index('idx_lineups_race_id').on(table.raceId),
    check(
      'chk_lineups_driver_ids_not_equal',
      sql`${table.driver1Id} <> ${table.driver2Id}`,
    ),
  ],
)

export const transactions = pgTable(
  'transactions',
  {
    id: text('id').primaryKey(),
    teamId: text('teamId')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    type: typeTransactionEnum('type').notNull(),
    subjectType: transactionSubjectEnum('subjectType').notNull(),
    subjectId: text('subjectId').notNull(),
    amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
    raceId: text('raceId')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('idx_transactions_team_race').on(table.teamId, table.raceId),
    check(
      'chk_transactions_subject_consistency',
      sql`
      (${table.subjectType} = 'fee' AND ${table.subjectId} IS NULL)
      OR
      (${table.subjectType} IN ('driver', 'constructor') AND ${table.subjectId} IS NOT NULL)
    `,
    ),
  ],
)

export const boosterCatalog = pgTable('boosterCatalog', {
  id: text('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  description: varchar('description', { length: 500 }).notNull(),
  multiplier: decimal('multiplier', { precision: 4, scale: 2 }).notNull(),
  appliesTo: assetTypeEnum('appliesTo'),
  isActive: boolean('isActive').notNull().default(true),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const userBoosters = pgTable(
  'userBoosters',
  {
    id: text('id').primaryKey(),
    teamId: text('teamId')
      .notNull()
      .references(() => teams.id, { onDelete: 'cascade' }),
    boosterId: text('boosterId')
      .notNull()
      .references(() => boosterCatalog.id, { onDelete: 'cascade' }),
    status: boosterStatusEnum('status').notNull().default('available'),
    usedOnRaceId: text('usedOnRaceId').references(() => races.id, {
      onDelete: 'set null',
    }),
    appliedToAssetId: text('appliedToAssetId'),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index('idx_user_boosters_team').on(table.teamId),
    check(
      'chk_user_boosters_used_race_consistency',
      sql`(${table.status} = 'used' AND ${table.usedOnRaceId} IS NOT NULL) 
      OR 
      (${table.status} <> 'used')`,
    ),
  ],
)
