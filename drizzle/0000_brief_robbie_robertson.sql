CREATE TYPE "public"."assetType" AS ENUM('driver', 'constructor');--> statement-breakpoint
CREATE TYPE "public"."boosterStatus" AS ENUM('available', 'used', 'expired');--> statement-breakpoint
CREATE TYPE "public"."pointsScoring" AS ENUM('position', 'bonus', 'penalty');--> statement-breakpoint
CREATE TYPE "public"."raceStatus" AS ENUM('scheduled', 'postponed', 'cancelled', 'completed');--> statement-breakpoint
CREATE TYPE "public"."roleLeague" AS ENUM('owner', 'manager', 'player');--> statement-breakpoint
CREATE TYPE "public"."transactionSubject" AS ENUM('driver', 'constructor', 'fee');--> statement-breakpoint
CREATE TYPE "public"."typeLeague" AS ENUM('global', 'regional', 'private');--> statement-breakpoint
CREATE TYPE "public"."typeTransaction" AS ENUM('buy', 'sell', 'penalty', 'adjustment');--> statement-breakpoint
CREATE TYPE "public"."weekendFormat" AS ENUM('normal', 'sprint');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"accountId" varchar(255) NOT NULL,
	"providerId" varchar(155) NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"accessTokenExpiresAt" timestamp with time zone,
	"refreshTokenExpiresAt" timestamp with time zone,
	"scope" varchar(555),
	"idToken" text,
	"password" varchar(255),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "boosterCatalog" (
	"id" text PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(500) NOT NULL,
	"multiplier" numeric(4, 2) NOT NULL,
	"appliesTo" "assetType",
	"imageUrl" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "boosterCatalog_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "constructors" (
	"id" text PRIMARY KEY NOT NULL,
	"logoUrl" text,
	"primaryColor" varchar(7),
	"contrastColor" varchar(7),
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drivers" (
	"id" text PRIMARY KEY NOT NULL,
	"portraitUrl" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fantasyPoints" (
	"id" text PRIMARY KEY NOT NULL,
	"assetType" "assetType" NOT NULL,
	"assetId" text NOT NULL,
	"raceId" text NOT NULL,
	"points" integer DEFAULT 0 NOT NULL,
	"calculateAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fantasyPointsBreakdown" (
	"id" text PRIMARY KEY NOT NULL,
	"fantasyPointsId" text NOT NULL,
	"ruleId" text NOT NULL,
	"pointsApplied" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leagueMemberships" (
	"id" text PRIMARY KEY NOT NULL,
	"leagueId" text NOT NULL,
	"userId" text NOT NULL,
	"role" "roleLeague" DEFAULT 'player' NOT NULL,
	"joinedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leagues" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(500),
	"createdBy" text NOT NULL,
	"type" "typeLeague" NOT NULL,
	"region" varchar(100),
	"inviteCode" varchar(10),
	"maxParticipants" integer DEFAULT 20 NOT NULL,
	"seasonYear" integer NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "leagues_inviteCode_unique" UNIQUE("inviteCode"),
	CONSTRAINT "chk_leagues_invite_code_private" CHECK (("leagues"."type" = 'private' AND "leagues"."inviteCode" IS NOT NULL) OR ("leagues"."type" <> 'private'))
);
--> statement-breakpoint
CREATE TABLE "lineUps" (
	"id" text PRIMARY KEY NOT NULL,
	"teamId" text NOT NULL,
	"raceId" text NOT NULL,
	"driver1Id" text NOT NULL,
	"driver2Id" text NOT NULL,
	"constructorId" text NOT NULL,
	"pointsEarned" integer DEFAULT 0 NOT NULL,
	"isLocked" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_lineups_driver_ids_not_equal" CHECK ("lineUps"."driver1Id" <> "lineUps"."driver2Id")
);
--> statement-breakpoint
CREATE TABLE "priceHistory" (
	"id" text PRIMARY KEY NOT NULL,
	"assetType" "assetType" NOT NULL,
	"assetId" text NOT NULL,
	"raceId" text NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "races" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"seasonYear" integer NOT NULL,
	"round" integer NOT NULL,
	"date" timestamp with time zone,
	"weekendFormat" "weekendFormat" DEFAULT 'normal' NOT NULL,
	"status" "raceStatus" DEFAULT 'scheduled' NOT NULL,
	"marketCloseAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scoringRules" (
	"id" text PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"points" integer NOT NULL,
	"category" "pointsScoring" NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "scoringRules_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "seasons" (
	"year" integer PRIMARY KEY NOT NULL,
	"championshipName" varchar(100) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"ipAddress" varchar(45),
	"userAgent" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"leagueId" text NOT NULL,
	"name" varchar(255) NOT NULL,
	"budget" numeric(12, 2) DEFAULT '100000000.00' NOT NULL,
	"totalPoints" integer DEFAULT 0 NOT NULL,
	"changesRemaining" integer DEFAULT 30 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"teamId" text NOT NULL,
	"type" "typeTransaction" NOT NULL,
	"subjectType" "transactionSubject" NOT NULL,
	"subjectId" text,
	"amount" numeric(12, 2) NOT NULL,
	"raceId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_transactions_subject_consistency" CHECK (
      ("transactions"."subjectType" = 'fee' AND "transactions"."subjectId" IS NULL)
      OR
      ("transactions"."subjectType" IN ('driver', 'constructor') AND "transactions"."subjectId" IS NOT NULL)
    )
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"image" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "userBoosters" (
	"id" text PRIMARY KEY NOT NULL,
	"teamId" text NOT NULL,
	"boosterId" text NOT NULL,
	"status" "boosterStatus" DEFAULT 'available' NOT NULL,
	"usedOnRaceId" text,
	"appliedToAssetId" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "chk_user_boosters_used_race_consistency" CHECK (("userBoosters"."status" = 'used' AND "userBoosters"."usedOnRaceId" IS NOT NULL) 
      OR 
      ("userBoosters"."status" <> 'used'))
);
--> statement-breakpoint
CREATE TABLE "userProfile" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"username" varchar(40) NOT NULL,
	"bio" varchar(250),
	"country" varchar(75),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "userProfile_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" varchar(255) NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp with time zone NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fantasyPoints" ADD CONSTRAINT "fantasyPoints_raceId_races_id_fk" FOREIGN KEY ("raceId") REFERENCES "public"."races"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fantasyPointsBreakdown" ADD CONSTRAINT "fantasyPointsBreakdown_fantasyPointsId_fantasyPoints_id_fk" FOREIGN KEY ("fantasyPointsId") REFERENCES "public"."fantasyPoints"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fantasyPointsBreakdown" ADD CONSTRAINT "fantasyPointsBreakdown_ruleId_scoringRules_id_fk" FOREIGN KEY ("ruleId") REFERENCES "public"."scoringRules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leagueMemberships" ADD CONSTRAINT "leagueMemberships_leagueId_leagues_id_fk" FOREIGN KEY ("leagueId") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leagueMemberships" ADD CONSTRAINT "leagueMemberships_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leagues" ADD CONSTRAINT "leagues_createdBy_user_id_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leagues" ADD CONSTRAINT "leagues_seasonYear_seasons_year_fk" FOREIGN KEY ("seasonYear") REFERENCES "public"."seasons"("year") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lineUps" ADD CONSTRAINT "lineUps_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lineUps" ADD CONSTRAINT "lineUps_raceId_races_id_fk" FOREIGN KEY ("raceId") REFERENCES "public"."races"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lineUps" ADD CONSTRAINT "lineUps_driver1Id_drivers_id_fk" FOREIGN KEY ("driver1Id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lineUps" ADD CONSTRAINT "lineUps_driver2Id_drivers_id_fk" FOREIGN KEY ("driver2Id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lineUps" ADD CONSTRAINT "lineUps_constructorId_constructors_id_fk" FOREIGN KEY ("constructorId") REFERENCES "public"."constructors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "priceHistory" ADD CONSTRAINT "priceHistory_raceId_races_id_fk" FOREIGN KEY ("raceId") REFERENCES "public"."races"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "races" ADD CONSTRAINT "races_seasonYear_seasons_year_fk" FOREIGN KEY ("seasonYear") REFERENCES "public"."seasons"("year") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_leagueId_leagues_id_fk" FOREIGN KEY ("leagueId") REFERENCES "public"."leagues"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_raceId_races_id_fk" FOREIGN KEY ("raceId") REFERENCES "public"."races"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userBoosters" ADD CONSTRAINT "userBoosters_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userBoosters" ADD CONSTRAINT "userBoosters_boosterId_boosterCatalog_id_fk" FOREIGN KEY ("boosterId") REFERENCES "public"."boosterCatalog"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userBoosters" ADD CONSTRAINT "userBoosters_usedOnRaceId_races_id_fk" FOREIGN KEY ("usedOnRaceId") REFERENCES "public"."races"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userProfile" ADD CONSTRAINT "userProfile_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_fantasy_points_asset_race" ON "fantasyPoints" USING btree ("assetType","assetId","raceId");--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_league_memberships_league_user" ON "leagueMemberships" USING btree ("leagueId","userId");--> statement-breakpoint
CREATE INDEX "idx_league_memberships_user_id" ON "leagueMemberships" USING btree ("userId");--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_leagues_created_by_name" ON "leagues" USING btree ("createdBy","name");--> statement-breakpoint
CREATE INDEX "idx_leagues_type" ON "leagues" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_leagues_season_year" ON "leagues" USING btree ("seasonYear");--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_lineups_team_race" ON "lineUps" USING btree ("teamId","raceId");--> statement-breakpoint
CREATE INDEX "idx_lineups_race_id" ON "lineUps" USING btree ("raceId");--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_price_history_asset_race" ON "priceHistory" USING btree ("assetType","assetId","raceId");--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_races_season_round" ON "races" USING btree ("seasonYear","round");--> statement-breakpoint
CREATE INDEX "idx_scoring_rules_code" ON "scoringRules" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_teams_user_league" ON "teams" USING btree ("userId","leagueId");--> statement-breakpoint
CREATE INDEX "idx_transactions_team_race" ON "transactions" USING btree ("teamId","raceId");--> statement-breakpoint
CREATE INDEX "idx_user_boosters_team" ON "userBoosters" USING btree ("teamId");--> statement-breakpoint
CREATE UNIQUE INDEX "uidx_user_profile_username" ON "userProfile" USING btree ("username");