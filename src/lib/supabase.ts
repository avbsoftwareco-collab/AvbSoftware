// import { createClient } from '@supabase/supabase-js';

// // Environment variables
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables. Check .env.local file');
// }

// // Create Supabase client
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // ============================================
// // TYPESCRIPT INTERFACES
// // ============================================

// export interface Product {
//   name: string;
//   price: string;
//   description?: string;
//   image_url?: string;
// }

// export interface Review {
//   name: string;
//   text: string;
//   rating: number;
//   role?: string;
// }

// export interface Client {
//   id?: string;
//   business_name: string;
//   template: string;
//   subdomain: string;
//   tagline?: string;
//   about?: string;
//   phone?: string;
//   whatsapp?: string;
//   email?: string;
//   address?: string;
//   city?: string;
//   maps_link?: string;
//   working_hours?: string;
//   facebook?: string;
//   instagram?: string;
//   products?: Product[];
//   reviews?: Review[];
//   primary_color?: string;
//   secondary_color?: string;
//   logo_url?: string;
//   hero_image_url?: string;
//   status?: 'draft' | 'live';
//   live_url?: string;
//   created_at?: string;
//   updated_at?: string;
// }

// // ============================================
// // HELPER FUNCTIONS - CRUD OPERATIONS
// // ============================================

// // Get all clients
// export async function getAllClients(): Promise<Client[]> {
//   const { data, error } = await supabase
//     .from('clients')
//     .select('*')
//     .order('created_at', { ascending: false });
  
//   if (error) {
//     console.error('Error fetching clients:', error);
//     return [];
//   }
  
//   return data || [];
// }

// // Get client by subdomain
// export async function getClientBySubdomain(subdomain: string): Promise<Client | null> {
//   const { data, error } = await supabase
//     .from('clients')
//     .select('*')
//     .eq('subdomain', subdomain)
//     .single();
  
//   if (error) {
//     console.error('Error fetching client:', error);
//     return null;
//   }
  
//   return data;
// }

// // Get client by ID
// export async function getClientById(id: string): Promise<Client | null> {
//   const { data, error } = await supabase
//     .from('clients')
//     .select('*')
//     .eq('id', id)
//     .single();
  
//   if (error) {
//     console.error('Error fetching client:', error);
//     return null;
//   }
  
//   return data;
// }

// // Create new client
// export async function createNewClient(client: Client): Promise<Client | null> {
//   const { data, error } = await supabase
//     .from('clients')
//     .insert([client])
//     .select()
//     .single();
  
//   if (error) {
//     console.error('Error creating client:', error);
//     return null;
//   }
  
//   return data;
// }

// // Update client
// export async function updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
//   const { data, error } = await supabase
//     .from('clients')
//     .update(updates)
//     .eq('id', id)
//     .select()
//     .single();
  
//   if (error) {
//     console.error('Error updating client:', error);
//     return null;
//   }
  
//   return data;
// }

// // Delete client
// export async function deleteClient(id: string): Promise<boolean> {
//   const { error } = await supabase
//     .from('clients')
//     .delete()
//     .eq('id', id);
  
//   if (error) {
//     console.error('Error deleting client:', error);
//     return false;
//   }
  
//   return true;
// }

// // ============================================
// // IMAGE UPLOAD FUNCTIONS
// // ============================================

// // Upload image to Supabase Storage
// export async function uploadImage(
//   file: File,
//   subdomain: string,
//   type: 'logo' | 'hero' | 'product'
// ): Promise<string | null> {
//   try {
//     // Generate unique filename
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${subdomain}/${type}-${Date.now()}.${fileExt}`;

//     // Upload to Supabase Storage
//     const { error } = await supabase.storage
//       .from('client-images')
//       .upload(fileName, file, {
//         cacheControl: '3600',
//         upsert: true,
//       });

//     if (error) {
//       console.error('Upload error:', error);
//       return null;
//     }

//     // Get public URL
//     const { data: { publicUrl } } = supabase.storage
//       .from('client-images')
//       .getPublicUrl(fileName);

//     return publicUrl;
//   } catch (error) {
//     console.error('Upload failed:', error);
//     return null;
//   }
// }

// // Delete image from storage
// export async function deleteImage(url: string): Promise<boolean> {
//   try {
//     const path = url.split('/client-images/')[1];
//     if (!path) return false;

//     const { error } = await supabase.storage
//       .from('client-images')
//       .remove([path]);

//     return !error;
//   } catch (error) {
//     console.error('Delete failed:', error);
//     return false;
//   }
// }







import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// INTERFACES
// ============================================

export interface Product {
  name: string;
  price: string;
  description?: string;
  image_url?: string;
  category?: string;
}

export interface Review {
  name: string;
  text: string;
  rating: number;
  role?: string;
  image?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image_url?: string;
  bio?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  name: string;
  description: string;
  icon?: string;
  price?: string;
}

export interface Achievement {
  title: string;
  year?: string;
  icon?: string;
}

export interface WorkingHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface Client {
  id?: string;
  business_name: string;
  template: string;
  subdomain: string;
  plan_type?: 'starter' | 'professional';
  plan_price?: number;
  start_date?: string;
  next_payment_date?: string;
  payment_status?: 'paid' | 'pending' | 'overdue';
  custom_domain?: string;
  notes?: string;
  tagline?: string;
  about?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  maps_link?: string;
  working_hours?: string;
  working_hours_detail?: WorkingHours;
  facebook?: string;
  instagram?: string;
  established_year?: string;
  years_experience?: string;
  happy_customers?: string;
  specialty?: string;
  products?: Product[];
  reviews?: Review[];
  team_members?: TeamMember[];
  gallery_images?: string[];
  achievements?: Achievement[];
  faq?: FAQ[];
  services?: Service[];
  primary_color?: string;
  secondary_color?: string;
  logo_url?: string;
  hero_image_url?: string;
  hero_video_url?: string;
  status?: 'draft' | 'live';
  live_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Payment {
  id?: string;
  client_id: string;
  amount: number;
  payment_date?: string;
  payment_method?: 'cash' | 'upi' | 'bank' | 'card';
  transaction_id?: string;
  month: string;
  year: number;
  status?: 'paid' | 'pending';
  notes?: string;
  created_at?: string;
  clients?: {
    business_name: string;
    subdomain: string;
  };
}

// ============================================
// CLIENT FUNCTIONS
// ============================================

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

export async function createNewClient(client: Client): Promise<Client | null> {
  const newClient = {
    ...client,
    plan_type: client.plan_type || 'starter',
    plan_price: client.plan_price || (client.plan_type === 'professional' ? 2499 : 799),
    start_date: new Date().toISOString(),
    next_payment_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    payment_status: 'paid' as const,
  };

  const { data, error } = await supabase
    .from('clients')
    .insert([newClient])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating client:', error);
    return null;
  }

  if (data) {
    await createPayment({
      client_id: data.id,
      amount: newClient.plan_price,
      payment_method: 'cash',
      month: new Date().toLocaleString('default', { month: 'short' }),
      year: new Date().getFullYear(),
      status: 'paid',
    });
  }
  
  return data;
}

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

export async function deleteClient(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);
  
  return !error;
}

// ============================================
// PAYMENT FUNCTIONS
// ============================================

export async function getAllPayments(): Promise<Payment[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*, clients(business_name, subdomain)')
    .order('payment_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
  
  return data || [];
}

export async function getClientPayments(clientId: string): Promise<Payment[]> {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('client_id', clientId)
    .order('payment_date', { ascending: false });
  
  if (error) {
    console.error('Error fetching payments:', error);
    return [];
  }
  
  return data || [];
}

export async function createPayment(payment: Payment): Promise<Payment | null> {
  const { data, error } = await supabase
    .from('payments')
    .insert([payment])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating payment:', error);
    return null;
  }
  
  return data;
}

export async function updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | null> {
  const { data, error } = await supabase
    .from('payments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating payment:', error);
    return null;
  }
  
  return data;
}

export async function deletePayment(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('payments')
    .delete()
    .eq('id', id);
  
  return !error;
}

// ============================================
// ANALYTICS FUNCTIONS
// ============================================

export async function getDashboardStats() {
  const { data: clients } = await supabase.from('clients').select('*');
  
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  const currentYear = new Date().getFullYear();
  
  const { data: monthPayments } = await supabase
    .from('payments')
    .select('amount')
    .eq('year', currentYear)
    .eq('month', currentMonth)
    .eq('status', 'paid');
  
  const monthRevenue = monthPayments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  
  const { data: pendingClients } = await supabase
    .from('clients')
    .select('plan_price')
    .eq('payment_status', 'pending');
  
  const pendingAmount = pendingClients?.reduce((sum, c) => sum + (c.plan_price || 799), 0) || 0;
  
  const startOfMonth = new Date(currentYear, new Date().getMonth(), 1).toISOString();
  const { data: newClients } = await supabase
    .from('clients')
    .select('id')
    .gte('created_at', startOfMonth);
  
  return {
    totalClients: clients?.length || 0,
    activeClients: clients?.filter(c => c.status === 'live').length || 0,
    monthRevenue,
    pendingAmount,
    newClientsThisMonth: newClients?.length || 0,
    starterClients: clients?.filter(c => c.plan_type === 'starter').length || 0,
    professionalClients: clients?.filter(c => c.plan_type === 'professional').length || 0,
  };
}

export async function getMonthlyRevenueData(year: number) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = await Promise.all(
    months.map(async (month) => {
      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('year', year)
        .eq('month', month)
        .eq('status', 'paid');
      
      const revenue = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
      return { month, revenue };
    })
  );
  
  return data;
}

// ============================================
// IMAGE UPLOAD FUNCTIONS
// ============================================

export async function uploadImage(
  file: File,
  subdomain: string,
  type: 'logo' | 'hero' | 'product' | 'gallery' | 'team'
): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${subdomain}/${type}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from('client-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('Upload error:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('client-images')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    return null;
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  try {
    const path = url.split('/client-images/')[1];
    if (!path) return false;

    const { error } = await supabase.storage
      .from('client-images')
      .remove([path]);

    return !error;
  } catch {
    return false;
  }
}