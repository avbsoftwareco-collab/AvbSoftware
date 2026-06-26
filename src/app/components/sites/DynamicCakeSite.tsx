import { Client } from "@/lib/supabase";
import CakeTemplate from "./cake";

export default function DynamicCakeSite({ client }: { client: Client }) {
  return <CakeTemplate client={client} />;
}