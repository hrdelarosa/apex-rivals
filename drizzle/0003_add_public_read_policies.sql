ALTER TABLE "public"."boosterCatalog" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_booster_catalog" ON "public"."boosterCatalog" FOR SELECT USING (true);--> statement-breakpoint
ALTER TABLE "public"."constructors" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_constructors" ON "public"."constructors" FOR SELECT USING (true);--> statement-breakpoint
ALTER TABLE "public"."drivers" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_drivers" ON "public"."drivers" FOR SELECT USING (true);--> statement-breakpoint
ALTER TABLE "public"."leagues" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_non_private_leagues" ON "public"."leagues" FOR SELECT USING ("type" <> 'private');--> statement-breakpoint
ALTER TABLE "public"."priceHistory" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_price_history" ON "public"."priceHistory" FOR SELECT USING (true);--> statement-breakpoint
ALTER TABLE "public"."races" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_races" ON "public"."races" FOR SELECT USING (true);--> statement-breakpoint
ALTER TABLE "public"."scoringRules" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_scoring_rules" ON "public"."scoringRules" FOR SELECT USING (true);--> statement-breakpoint
ALTER TABLE "public"."seasons" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_seasons" ON "public"."seasons" FOR SELECT USING (true);--> statement-breakpoint
ALTER TABLE "public"."userProfile" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "public_read_user_profiles" ON "public"."userProfile" FOR SELECT USING (true);