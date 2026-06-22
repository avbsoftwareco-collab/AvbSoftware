"use client";

import { Client } from "@/lib/supabase";
import RestaurantTemplate from "./restaurant";

export default function DynamicRestaurantSite({ client }: { client: Client }) {
  return <RestaurantTemplate client={client} />;
}