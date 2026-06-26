"use client";

import { Client } from "@/lib/supabase";
import ResortTemplate from "./resort";

export default function DynamicResortSite({ client }: { client: Client }) {
  return <ResortTemplate client={client} />;
}