"use client";

import { Client } from "@/lib/supabase";
import TimberTemplate from "./timber";

export default function DynamicTimberSite({ client }: { client: Client }) {
  return <TimberTemplate client={client} />;
}