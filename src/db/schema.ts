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
  'adjustment',
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
export const raceStatusEnum = pgEnum('raceStatus', [
  'scheduled',
  'postponed',
  'cancelled',
  'completed',
])
export const weekendFormatEnum = pgEnum('weekendFormat', ['normal', 'sprint'])
export const pointsScoringEnum = pgEnum('pointsScoring', [
  'position',
  'bonus',
  'penalty',
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
  championshipName: varchar('championshipName', { length: 100 }).notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const constructors = pgTable('constructors', {
  id: text('id').primaryKey(),
  logoUrl: text('logoUrl'),
  primaryColor: varchar('primaryColor', { length: 7 }),
  contrastColor: varchar('contrastColor', { length: 7 }),
  isActive: boolean('isActive').notNull().default(true),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const drivers = pgTable('drivers', {
  id: text('id').primaryKey(),
  portraitUrl: text('portraitUrl'),
  isActive: boolean('isActive').notNull().default(true),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updatedAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const races = pgTable(
  'races',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    seasonYear: integer('seasonYear')
      .notNull()
      .references(() => seasons.year, { onDelete: 'cascade' }),
    round: integer('round').notNull(),
    date: timestamp('date', { withTimezone: true }),
    weekendFormat: weekendFormatEnum('weekendFormat')
      .notNull()
      .default('normal'),
    status: raceStatusEnum('status').notNull().default('scheduled'),
    marketCloseAt: timestamp('marketCloseAt', { withTimezone: true }),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_races_season_round').on(table.seasonYear, table.round),
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
    isActive: boolean('isActive').notNull().default(true),
    createdAt: timestamp('createdAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index('idx_scoring_rules_code').on(table.code)],
)

export const fantasyPoints = pgTable(
  'fantasyPoints',
  {
    id: text('id').primaryKey(),
    assetType: assetTypeEnum('assetType').notNull(),
    assetId: text('assetId').notNull(),
    raceId: text('raceId')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
    points: integer('points').notNull().default(0),
    calculateAt: timestamp('calculateAt', { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex('uidx_fantasy_points_asset_race').on(
      table.assetType,
      table.assetId,
      table.raceId,
    ),
  ],
)

export const fantasyPointsBreakdown = pgTable('fantasyPointsBreakdown', {
  id: text('id').primaryKey(),
  fantasyPointsId: text('fantasyPointsId')
    .notNull()
    .references(() => fantasyPoints.id, { onDelete: 'cascade' }),
  ruleId: text('ruleId')
    .notNull()
    .references(() => scoringRules.id, { onDelete: 'cascade' }),
  pointsApplied: integer('pointsApplied').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const priceHistory = pgTable(
  'priceHistory',
  {
    id: text('id').primaryKey(),
    assetType: assetTypeEnum('assetType').notNull(),
    assetId: text('assetId').notNull(),
    raceId: text('raceId')
      .notNull()
      .references(() => races.id, { onDelete: 'cascade' }),
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
  ],
)

export const leagues = pgTable(
  'leagues',
  {
    id: text('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    description: varchar('description', { length: 500 }),
    createdBy: text('createdBy')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    type: typeLeagueEnum('type').notNull(),
    region: varchar('region', { length: 100 }),
    inviteCode: varchar('inviteCode', { length: 10 }).unique(),
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
      sql`(${table.type} = 'private' AND ${table.inviteCode} IS NOT NULL) OR (${table.type} <> 'private')`,
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
      .default('100000000.00'),
    totalPoints: integer('totalPoints').notNull().default(0),
    changesRemaining: integer('changesRemaining').notNull().default(30),
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
    isLocked: boolean('isLocked').notNull().default(false),
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

export const transactions = pgTable('transactions', {
  id: text('id').primaryKey(),
  teamId: text('teamId')
    .notNull()
    .references(() => teams.id, { onDelete: 'cascade' }),
  type: typeTransactionEnum('type').notNull(),
  subjectType: transactionSubjectEnum('subjectType').notNull(),
  subjectId: text('subjectId'),
  amount: decimal('amount', { precision: 12, scale: 2 }).notNull(),
  raceId: text('raceId')
    .notNull()
    .references(() => races.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt', { withTimezone: true })
    .notNull()
    .defaultNow(),
}, (table) => [
  index('idx_transactions_team_race').on(table.teamId, table.raceId),
  check(
    'chk_transactions_subject_consistency',
    sql`
      (${table.subjectType} = 'fee' AND ${table.subjectId} IS NULL)
      OR
      (${table.subjectType} IN ('driver', 'constructor') AND ${table.subjectId} IS NOT NULL)
    `,
  ),
])

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
