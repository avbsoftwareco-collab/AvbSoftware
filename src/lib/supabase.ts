

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // ============================================
// // INTERFACES
// // ============================================

// export interface Product {
//   name: string;
//   price: string;
//   description?: string;
//   image_url?: string;
//   category?: string;
// }

// export interface Review {
//   name: string;
//   text: string;
//   rating: number;
//   role?: string;
//   image?: string;
// }

// export interface TeamMember {
//   name: string;
//   role: string;
//   image_url?: string;
//   image?: string;
//   bio?: string;
// }

// export interface FAQ {
//   question: string;
//   answer: string;
// }

// export interface Service {
//   name: string;
//   description: string;
//   icon?: string;
//   price?: string;
// }

// export interface Achievement {
//   title: string;
//   year?: string;
//   icon?: string;
// }

// export interface WorkingHours {
//   monday?: string;
//   tuesday?: string;
//   wednesday?: string;
//   thursday?: string;
//   friday?: string;
//   saturday?: string;
//   sunday?: string;
// }

// // ============================================
// // RESTAURANT SPECIFIC INTERFACES
// // ============================================

// export interface OpeningHour {
//   days: string;
//   hours: string;
// }

// export interface MenuItem {
//   name: string;
//   description?: string;
//   price: string;
//   image?: string;
//   tags?: string[];
//   featured?: boolean;
// }

// export interface MenuCategory {
//   id: string;
//   name: string;
//   subtitle?: string;
//   items: MenuItem[];
// }

// export interface GalleryImage {
//   src: string;
//   alt?: string;
//   category?: string;
// }

// export interface Specialty {
//   title: string;
//   description?: string;
//   image: string;
// }

// export interface Award {
//   title: string;
//   year?: string;
//   org?: string;
//   organization?: string;
// }

// // ============================================
// // MAIN CLIENT INTERFACE
// // ============================================

// export interface Client {
//   id?: string;
//   business_name: string;
//   template: string;
//    subdomain?: string;          // ← 🔥 ADD if missing
//   domain?: string;   
//   plan_type?: 'starter' | 'professional';
//   plan_price?: number;
//   start_date?: string;
//   next_payment_date?: string;
//   payment_status?: 'paid' | 'pending' | 'overdue';
//   custom_domain?: string;
//   notes?: string;
//   tagline?: string;
//   about?: string;
//   phone?: string;
//   whatsapp?: string;
//   email?: string;
//   address?: string;
//   city?: string;
//   maps_link?: string;
//   working_hours?: string;
//   working_hours_detail?: WorkingHours;
//   facebook?: string;
//   instagram?: string;
//   established_year?: string;
//   years_experience?: string;
//   happy_customers?: string;
//   specialty?: string;
//   products?: Product[];
//   reviews?: Review[];
//   team_members?: TeamMember[];
//   gallery_images?: string[];
//   achievements?: Achievement[];
//   faq?: FAQ[];
//   services?: Service[];
//   primary_color?: string;
//   secondary_color?: string;
//   logo_url?: string;
//   hero_image_url?: string;
//   hero_video_url?: string;
//   status?: 'draft' | 'live';
//   live_url?: string;
//   created_at?: string;
//   updated_at?: string;

//   // ============================================
//   // RESTAURANT TEMPLATE - FIELDS
//   // ============================================

//   // Hero Images - Har page ki alag
//   hero_image?: string;
//   about_hero_image?: string;
//   menu_hero_image?: string;
//   gallery_hero_image?: string;
//   contact_hero_image?: string;

//   // About Page Images
//   about_image?: string;
//   chef_image?: string;
//   story_image_1?: string;
//   story_image_2?: string;

//   // Home Page Mosaic Images
//   featured_image_1?: string;
//   featured_image_2?: string;
//   featured_image_3?: string;

//   // Specialty Images
//   specialty_image_1?: string;
//   specialty_image_2?: string;
//   specialty_image_3?: string;
//   specialty_1_title?: string;
//   specialty_2_title?: string;
//   specialty_3_title?: string;
//   specialty_1_desc?: string;
//   specialty_2_desc?: string;
//   specialty_3_desc?: string;

//   // Stats - Dynamic numbers
//   stat_1_number?: string;
//   stat_1_label?: string;
//   stat_2_number?: string;
//   stat_2_label?: string;
//   stat_3_number?: string;
//   stat_3_label?: string;
//   stat_4_number?: string;
//   stat_4_label?: string;

//   // Restaurant Data
//   opening_hours?: OpeningHour[];
//   menu_categories?: MenuCategory[];
//   gallery_images_detailed?: GalleryImage[];
//   gallery_categories?: string[];
//   specialties?: Specialty[];
//   awards?: Award[];

//   // About Text
//   about_short?: string;
//   about_text?: string;
//   about_text_2?: string;
//   about_heading?: string;
//   story_heading?: string;
//   story_paragraphs?: string[];

//   // Chef / Owner
//   chef_name?: string;
//   owner_name?: string;
//   chef_role?: string;
//   chef_quote?: string;

//   // Settings
//   allergen_note?: string;
//   map_embed_url?: string;
//   currency_symbol?: string;
//   year_established?: string;
//   marquee_text?: string;



//    cake_theme?: string;
  
//   hero_video_type?: 'upload' | 'url';
  
//   // Custom theme colors (optional override)
//   custom_theme_bg?: string;
//   custom_theme_secondary?: string;
//   custom_theme_card?: string;
//   custom_theme_primary?: string;
//   custom_theme_accent?: string;
//   custom_theme_text?: string;
//   custom_theme_text_light?: string;
// }

// export interface Payment {
//   id?: string;
//   client_id: string;
//   amount: number;
//   payment_date?: string;
//   payment_method?: 'cash' | 'upi' | 'bank' | 'card';
//   transaction_id?: string;
//   month: string;
//   year: number;
//   status?: 'paid' | 'pending';
//   notes?: string;
//   created_at?: string;
//   clients?: {
//     business_name: string;
//     subdomain: string;
//   };
// }

// // ============================================
// // CLIENT FUNCTIONS
// // ============================================

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

// export async function getClientBySubdomain(subdomain: string): Promise<Client | null> {
//   console.log("Fetching client for subdomain:", subdomain);
  
//   const { data, error } = await supabase
//     .from('clients')
//     .select('*')
//     .eq('subdomain', subdomain)
//     .single();
  
//   if (error) {
//     console.error('Error fetching client:', error);
//     return null;
//   }
  
//   console.log("Client data received:", data);
//   return data;
// }

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

// export async function createNewClient(client: Client): Promise<Client | null> {
//   const newClient = {
//     ...client,
//     plan_type: client.plan_type || 'starter',
//     plan_price: client.plan_price || (client.plan_type === 'professional' ? 2499 : 799),
//     start_date: new Date().toISOString(),
//     next_payment_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
//     payment_status: 'paid' as const,
//   };

//   const { data, error } = await supabase
//     .from('clients')
//     .insert([newClient])
//     .select()
//     .single();
  
//   if (error) {
//     console.error('Error creating client:', error);
//     return null;
//   }

//   if (data) {
//     await createPayment({
//       client_id: data.id,
//       amount: newClient.plan_price,
//       payment_method: 'cash',
//       month: new Date().toLocaleString('default', { month: 'short' }),
//       year: new Date().getFullYear(),
//       status: 'paid',
//     });
//   }
  
//   return data;
// }

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

// export async function deleteClient(id: string): Promise<boolean> {
//   const { error } = await supabase
//     .from('clients')
//     .delete()
//     .eq('id', id);
  
//   return !error;
// }

// // ============================================
// // PAYMENT FUNCTIONS
// // ============================================

// export async function getAllPayments(): Promise<Payment[]> {
//   const { data, error } = await supabase
//     .from('payments')
//     .select('*, clients(business_name, subdomain)')
//     .order('payment_date', { ascending: false });
  
//   if (error) {
//     console.error('Error fetching payments:', error);
//     return [];
//   }
  
//   return data || [];
// }

// export async function getClientPayments(clientId: string): Promise<Payment[]> {
//   const { data, error } = await supabase
//     .from('payments')
//     .select('*')
//     .eq('client_id', clientId)
//     .order('payment_date', { ascending: false });
  
//   if (error) {
//     console.error('Error fetching payments:', error);
//     return [];
//   }
  
//   return data || [];
// }

// export async function createPayment(payment: Payment): Promise<Payment | null> {
//   const { data, error } = await supabase
//     .from('payments')
//     .insert([payment])
//     .select()
//     .single();
  
//   if (error) {
//     console.error('Error creating payment:', error);
//     return null;
//   }
  
//   return data;
// }

// export async function updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | null> {
//   const { data, error } = await supabase
//     .from('payments')
//     .update(updates)
//     .eq('id', id)
//     .select()
//     .single();
  
//   if (error) {
//     console.error('Error updating payment:', error);
//     return null;
//   }
  
//   return data;
// }

// export async function deletePayment(id: string): Promise<boolean> {
//   const { error } = await supabase
//     .from('payments')
//     .delete()
//     .eq('id', id);
  
//   return !error;
// }

// // ============================================
// // ANALYTICS FUNCTIONS
// // ============================================

// export async function getDashboardStats() {
//   const { data: clients } = await supabase.from('clients').select('*');
  
//   const currentMonth = new Date().toLocaleString('default', { month: 'short' });
//   const currentYear = new Date().getFullYear();
  
//   const { data: monthPayments } = await supabase
//     .from('payments')
//     .select('amount')
//     .eq('year', currentYear)
//     .eq('month', currentMonth)
//     .eq('status', 'paid');
  
//   const monthRevenue = monthPayments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  
//   const { data: pendingClients } = await supabase
//     .from('clients')
//     .select('plan_price')
//     .eq('payment_status', 'pending');
  
//   const pendingAmount = pendingClients?.reduce((sum, c) => sum + (c.plan_price || 799), 0) || 0;
  
//   const startOfMonth = new Date(currentYear, new Date().getMonth(), 1).toISOString();
//   const { data: newClients } = await supabase
//     .from('clients')
//     .select('id')
//     .gte('created_at', startOfMonth);
  
//   return {
//     totalClients: clients?.length || 0,
//     activeClients: clients?.filter(c => c.status === 'live').length || 0,
//     monthRevenue,
//     pendingAmount,
//     newClientsThisMonth: newClients?.length || 0,
//     starterClients: clients?.filter(c => c.plan_type === 'starter').length || 0,
//     professionalClients: clients?.filter(c => c.plan_type === 'professional').length || 0,
//   };
// }

// export async function getMonthlyRevenueData(year: number) {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
//   const data = await Promise.all(
//     months.map(async (month) => {
//       const { data: payments } = await supabase
//         .from('payments')
//         .select('amount')
//         .eq('year', year)
//         .eq('month', month)
//         .eq('status', 'paid');
      
//       const revenue = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
//       return { month, revenue };
//     })
//   );
  
//   return data;
// }

// // ============================================
// // IMAGE UPLOAD FUNCTIONS
// // ============================================

// export async function uploadImage(
//   file: File,
//   subdomain: string,
//   type: string
// ): Promise<string | null> {
//   try {
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${subdomain}/${type}-${Date.now()}.${fileExt}`;

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

//     const { data: { publicUrl } } = supabase.storage
//       .from('client-images')
//       .getPublicUrl(fileName);

//     return publicUrl;
//   } catch (error) {
//     console.error('Upload failed:', error);
//     return null;
//   }
// }

// export async function deleteImage(url: string): Promise<boolean> {
//   try {
//     const path = url.split('/client-images/')[1];
//     if (!path) return false;

//     const { error } = await supabase.storage
//       .from('client-images')
//       .remove([path]);

//     return !error;
//   } catch {
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
  image?: string;
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

// ============================================
// RESTAURANT SPECIFIC INTERFACES
// ============================================

export interface OpeningHour {
  days: string;
  hours: string;
}

export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  image?: string;
  tags?: string[];
  featured?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  subtitle?: string;
  items: MenuItem[];
}

export interface GalleryImage {
  src: string;
  alt?: string;
  category?: string;
}

export interface Specialty {
  title: string;
  description?: string;
  image: string;
}

export interface Award {
  title: string;
  year?: string;
  org?: string;
  organization?: string;
}

// ============================================
// 🔥 BLOG POST INTERFACE - NEW
// ============================================

export interface BlogPost {
  id: string;
  client_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  cover_image?: string;
  author_name?: string;
  author_image?: string;
  category?: string;
  tags?: string[];
  status: 'draft' | 'published';
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ============================================
// MAIN CLIENT INTERFACE
// ============================================

export interface Client {
  id?: string;
  business_name: string;
  template: string;
  subdomain?: string;
  custom_domain?: string;       // ← Tumhara existing field
  plan_type?: 'starter' | 'professional';
  plan_price?: number;
  start_date?: string;
  next_payment_date?: string;
  payment_status?: 'paid' | 'pending' | 'overdue';
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

  // ============================================
  // RESTAURANT TEMPLATE - FIELDS
  // ============================================

  hero_image?: string;
  about_hero_image?: string;
  menu_hero_image?: string;
  gallery_hero_image?: string;
  contact_hero_image?: string;
  about_image?: string;
  chef_image?: string;
  story_image_1?: string;
  story_image_2?: string;
  featured_image_1?: string;
  featured_image_2?: string;
  featured_image_3?: string;
  specialty_image_1?: string;
  specialty_image_2?: string;
  specialty_image_3?: string;
  specialty_1_title?: string;
  specialty_2_title?: string;
  specialty_3_title?: string;
  specialty_1_desc?: string;
  specialty_2_desc?: string;
  specialty_3_desc?: string;
  stat_1_number?: string;
  stat_1_label?: string;
  stat_2_number?: string;
  stat_2_label?: string;
  stat_3_number?: string;
  stat_3_label?: string;
  stat_4_number?: string;
  stat_4_label?: string;
  opening_hours?: OpeningHour[];
  menu_categories?: MenuCategory[];
  gallery_images_detailed?: GalleryImage[];
  gallery_categories?: string[];
  specialties?: Specialty[];
  awards?: Award[];
  about_short?: string;
  about_text?: string;
  about_text_2?: string;
  about_heading?: string;
  story_heading?: string;
  story_paragraphs?: string[];
  chef_name?: string;
  owner_name?: string;
  chef_role?: string;
  chef_quote?: string;
  allergen_note?: string;
  map_embed_url?: string;
  currency_symbol?: string;
  year_established?: string;
  marquee_text?: string;
  cake_theme?: string;
  restaurant_theme?: string;
  hero_video_type?: 'upload' | 'url';
  custom_theme_bg?: string;
  custom_theme_secondary?: string;
  custom_theme_card?: string;
  custom_theme_primary?: string;
  custom_theme_accent?: string;
  custom_theme_text?: string;
  custom_theme_text_light?: string;
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
  console.log('Fetching client for subdomain:', subdomain);

  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('subdomain', subdomain)
    .single();

  if (error) {
    console.error('Error fetching client:', error);
    return null;
  }

  console.log('Client data received:', data);
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
    plan_price:
      client.plan_price || (client.plan_type === 'professional' ? 2499 : 799),
    start_date: new Date().toISOString(),
    next_payment_date: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
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

export async function updateClient(
  id: string,
  updates: Partial<Client>
): Promise<Client | null> {
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
  const { error } = await supabase.from('clients').delete().eq('id', id);

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

export async function createPayment(
  payment: Payment
): Promise<Payment | null> {
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

export async function updatePayment(
  id: string,
  updates: Partial<Payment>
): Promise<Payment | null> {
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
  const { error } = await supabase.from('payments').delete().eq('id', id);

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

  const monthRevenue =
    monthPayments?.reduce((sum, p) => sum + p.amount, 0) || 0;

  const { data: pendingClients } = await supabase
    .from('clients')
    .select('plan_price')
    .eq('payment_status', 'pending');

  const pendingAmount =
    pendingClients?.reduce((sum, c) => sum + (c.plan_price || 799), 0) || 0;

  const startOfMonth = new Date(
    currentYear,
    new Date().getMonth(),
    1
  ).toISOString();

  const { data: newClients } = await supabase
    .from('clients')
    .select('id')
    .gte('created_at', startOfMonth);

  return {
    totalClients: clients?.length || 0,
    activeClients: clients?.filter((c) => c.status === 'live').length || 0,
    monthRevenue,
    pendingAmount,
    newClientsThisMonth: newClients?.length || 0,
    starterClients:
      clients?.filter((c) => c.plan_type === 'starter').length || 0,
    professionalClients:
      clients?.filter((c) => c.plan_type === 'professional').length || 0,
  };
}

export async function getMonthlyRevenueData(year: number) {
  const months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec',
  ];

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
  type: string
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

    const {
      data: { publicUrl },
    } = supabase.storage.from('client-images').getPublicUrl(fileName);

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

// ============================================
// 🔥 BLOG FUNCTIONS - NEW
// ============================================

// Published posts only (client-facing)
export async function getClientBlogPosts(
  clientId: string
): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('client_id', clientId)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
  return data || [];
}

// All posts including drafts (admin-facing)
export async function getAllClientBlogPosts(
  clientId: string
): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
  return data || [];
}

// Single post by slug
export async function getBlogPostBySlug(
  clientId: string,
  slug: string
): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('client_id', clientId)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
  return data;
}

// Create new post
export async function createBlogPost(
  post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([
      {
        ...post,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
  return data;
}

// Update existing post
export async function updateBlogPost(
  id: string,
  updates: Partial<BlogPost>
): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
  return data;
}

// Delete post
export async function deleteBlogPost(id: string): Promise<void> {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
}