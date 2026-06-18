import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local file');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// TYPESCRIPT INTERFACES
// ============================================

export interface Product {
  name: string;
  price: string;
  description?: string;
}

export interface Review {
  name: string;
  text: string;
  rating: number;
  role?: string;
}

export interface Client {
  id?: string;
  business_name: string;
  template: string;
  subdomain: string;
  tagline?: string;
  about?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  maps_link?: string;
  working_hours?: string;
  facebook?: string;
  instagram?: string;
  products?: Product[];
  reviews?: Review[];
  primary_color?: string;
  secondary_color?: string;
  logo_url?: string;
  hero_image_url?: string;
  status?: 'draft' | 'live';
  live_url?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================
// HELPER FUNCTIONS - CRUD OPERATIONS
// ============================================

// Get all clients
export async function getAllClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }
  
  return data || [];
}

// Get client by subdomain
export async function getClientBySubdomain(subdomain: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('subdomain', subdomain)
    .single();
  
  if (error) {
    console.error('Error fetching client:', error);
    return null;
  }
  
  return data;
}

// Get client by ID
export async function getClientById(id: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching client:', error);
    return null;
  }
  
  return data;
}

// Create new client
export async function createNewClient(client: Client): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .insert([client])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating client:', error);
    return null;
  }
  
  return data;
}

// Update client
export async function updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating client:', error);
    return null;
  }
  
  return data;
}

// Delete client
export async function deleteClient(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting client:', error);
    return false;
  }
  
  return true;
}

// ============================================
// IMAGE UPLOAD FUNCTIONS
// ============================================

// Upload image to storage
export async function uploadImage(
  file: File, 
  subdomain: string, 
  type: 'logo' | 'hero' | 'product' | 'gallery'
): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${subdomain}/${type}-${Date.now()}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('client-images')
    .upload(fileName, file);
  
  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('client-images')
    .getPublicUrl(fileName);
  
  return publicUrl;
}

// Delete image from storage
export async function deleteImage(path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from('client-images')
    .remove([path]);
  
  if (error) {
    console.error('Error deleting image:', error);
    return false;
  }
  
  return true;
}