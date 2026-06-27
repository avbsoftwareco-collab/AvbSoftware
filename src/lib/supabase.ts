

// // import { createClient } from '@supabase/supabase-js';

// // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// // const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// // if (!supabaseUrl || !supabaseAnonKey) {
// //   throw new Error('Missing Supabase environment variables');
// // }

// // export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // // ============================================
// // // INTERFACES
// // // ============================================

// // export interface Product {
// //   name: string;
// //   price: string;
// //   description?: string;
// //   image_url?: string;
// //   category?: string;
// // }

// // export interface Review {
// //   name: string;
// //   text: string;
// //   rating: number;
// //   role?: string;
// //   image?: string;
// // }

// // export interface TeamMember {
// //   name: string;
// //   role: string;
// //   image_url?: string;
// //   image?: string;
// //   bio?: string;
// // }

// // export interface FAQ {
// //   question: string;
// //   answer: string;
// // }

// // export interface Service {
// //   name: string;
// //   description: string;
// //   icon?: string;
// //   price?: string;
// // }

// // export interface Achievement {
// //   title: string;
// //   year?: string;
// //   icon?: string;
// // }

// // export interface WorkingHours {
// //   monday?: string;
// //   tuesday?: string;
// //   wednesday?: string;
// //   thursday?: string;
// //   friday?: string;
// //   saturday?: string;
// //   sunday?: string;
// // }

// // // ============================================
// // // RESTAURANT SPECIFIC INTERFACES
// // // ============================================

// // export interface OpeningHour {
// //   days: string;
// //   hours: string;
// // }

// // export interface MenuItem {
// //   name: string;
// //   description?: string;
// //   price: string;
// //   image?: string;
// //   tags?: string[];
// //   featured?: boolean;
// // }

// // export interface MenuCategory {
// //   id: string;
// //   name: string;
// //   subtitle?: string;
// //   items: MenuItem[];
// // }

// // export interface GalleryImage {
// //   src: string;
// //   alt?: string;
// //   category?: string;
// // }

// // export interface Specialty {
// //   title: string;
// //   description?: string;
// //   image: string;
// // }

// // export interface Award {
// //   title: string;
// //   year?: string;
// //   org?: string;
// //   organization?: string;
// // }

// // // ============================================
// // // MAIN CLIENT INTERFACE
// // // ============================================

// // export interface Client {
// //   id?: string;
// //   business_name: string;
// //   template: string;
// //    subdomain?: string;          // ← 🔥 ADD if missing
// //   domain?: string;   
// //   plan_type?: 'starter' | 'professional';
// //   plan_price?: number;
// //   start_date?: string;
// //   next_payment_date?: string;
// //   payment_status?: 'paid' | 'pending' | 'overdue';
// //   custom_domain?: string;
// //   notes?: string;
// //   tagline?: string;
// //   about?: string;
// //   phone?: string;
// //   whatsapp?: string;
// //   email?: string;
// //   address?: string;
// //   city?: string;
// //   maps_link?: string;
// //   working_hours?: string;
// //   working_hours_detail?: WorkingHours;
// //   facebook?: string;
// //   instagram?: string;
// //   established_year?: string;
// //   years_experience?: string;
// //   happy_customers?: string;
// //   specialty?: string;
// //   products?: Product[];
// //   reviews?: Review[];
// //   team_members?: TeamMember[];
// //   gallery_images?: string[];
// //   achievements?: Achievement[];
// //   faq?: FAQ[];
// //   services?: Service[];
// //   primary_color?: string;
// //   secondary_color?: string;
// //   logo_url?: string;
// //   hero_image_url?: string;
// //   hero_video_url?: string;
// //   status?: 'draft' | 'live';
// //   live_url?: string;
// //   created_at?: string;
// //   updated_at?: string;

// //   // ============================================
// //   // RESTAURANT TEMPLATE - FIELDS
// //   // ============================================

// //   // Hero Images - Har page ki alag
// //   hero_image?: string;
// //   about_hero_image?: string;
// //   menu_hero_image?: string;
// //   gallery_hero_image?: string;
// //   contact_hero_image?: string;

// //   // About Page Images
// //   about_image?: string;
// //   chef_image?: string;
// //   story_image_1?: string;
// //   story_image_2?: string;

// //   // Home Page Mosaic Images
// //   featured_image_1?: string;
// //   featured_image_2?: string;
// //   featured_image_3?: string;

// //   // Specialty Images
// //   specialty_image_1?: string;
// //   specialty_image_2?: string;
// //   specialty_image_3?: string;
// //   specialty_1_title?: string;
// //   specialty_2_title?: string;
// //   specialty_3_title?: string;
// //   specialty_1_desc?: string;
// //   specialty_2_desc?: string;
// //   specialty_3_desc?: string;

// //   // Stats - Dynamic numbers
// //   stat_1_number?: string;
// //   stat_1_label?: string;
// //   stat_2_number?: string;
// //   stat_2_label?: string;
// //   stat_3_number?: string;
// //   stat_3_label?: string;
// //   stat_4_number?: string;
// //   stat_4_label?: string;

// //   // Restaurant Data
// //   opening_hours?: OpeningHour[];
// //   menu_categories?: MenuCategory[];
// //   gallery_images_detailed?: GalleryImage[];
// //   gallery_categories?: string[];
// //   specialties?: Specialty[];
// //   awards?: Award[];

// //   // About Text
// //   about_short?: string;
// //   about_text?: string;
// //   about_text_2?: string;
// //   about_heading?: string;
// //   story_heading?: string;
// //   story_paragraphs?: string[];

// //   // Chef / Owner
// //   chef_name?: string;
// //   owner_name?: string;
// //   chef_role?: string;
// //   chef_quote?: string;

// //   // Settings
// //   allergen_note?: string;
// //   map_embed_url?: string;
// //   currency_symbol?: string;
// //   year_established?: string;
// //   marquee_text?: string;



// //    cake_theme?: string;
  
// //   hero_video_type?: 'upload' | 'url';
  
// //   // Custom theme colors (optional override)
// //   custom_theme_bg?: string;
// //   custom_theme_secondary?: string;
// //   custom_theme_card?: string;
// //   custom_theme_primary?: string;
// //   custom_theme_accent?: string;
// //   custom_theme_text?: string;
// //   custom_theme_text_light?: string;
// // }

// // export interface Payment {
// //   id?: string;
// //   client_id: string;
// //   amount: number;
// //   payment_date?: string;
// //   payment_method?: 'cash' | 'upi' | 'bank' | 'card';
// //   transaction_id?: string;
// //   month: string;
// //   year: number;
// //   status?: 'paid' | 'pending';
// //   notes?: string;
// //   created_at?: string;
// //   clients?: {
// //     business_name: string;
// //     subdomain: string;
// //   };
// // }

// // // ============================================
// // // CLIENT FUNCTIONS
// // // ============================================

// // export async function getAllClients(): Promise<Client[]> {
// //   const { data, error } = await supabase
// //     .from('clients')
// //     .select('*')
// //     .order('created_at', { ascending: false });
  
// //   if (error) {
// //     console.error('Error fetching clients:', error);
// //     return [];
// //   }
  
// //   return data || [];
// // }

// // export async function getClientBySubdomain(subdomain: string): Promise<Client | null> {
// //   console.log("Fetching client for subdomain:", subdomain);
  
// //   const { data, error } = await supabase
// //     .from('clients')
// //     .select('*')
// //     .eq('subdomain', subdomain)
// //     .single();
  
// //   if (error) {
// //     console.error('Error fetching client:', error);
// //     return null;
// //   }
  
// //   console.log("Client data received:", data);
// //   return data;
// // }

// // export async function getClientById(id: string): Promise<Client | null> {
// //   const { data, error } = await supabase
// //     .from('clients')
// //     .select('*')
// //     .eq('id', id)
// //     .single();
  
// //   if (error) {
// //     console.error('Error fetching client:', error);
// //     return null;
// //   }
  
// //   return data;
// // }

// // export async function createNewClient(client: Client): Promise<Client | null> {
// //   const newClient = {
// //     ...client,
// //     plan_type: client.plan_type || 'starter',
// //     plan_price: client.plan_price || (client.plan_type === 'professional' ? 2499 : 799),
// //     start_date: new Date().toISOString(),
// //     next_payment_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
// //     payment_status: 'paid' as const,
// //   };

// //   const { data, error } = await supabase
// //     .from('clients')
// //     .insert([newClient])
// //     .select()
// //     .single();
  
// //   if (error) {
// //     console.error('Error creating client:', error);
// //     return null;
// //   }

// //   if (data) {
// //     await createPayment({
// //       client_id: data.id,
// //       amount: newClient.plan_price,
// //       payment_method: 'cash',
// //       month: new Date().toLocaleString('default', { month: 'short' }),
// //       year: new Date().getFullYear(),
// //       status: 'paid',
// //     });
// //   }
  
// //   return data;
// // }

// // export async function updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
// //   const { data, error } = await supabase
// //     .from('clients')
// //     .update(updates)
// //     .eq('id', id)
// //     .select()
// //     .single();
  
// //   if (error) {
// //     console.error('Error updating client:', error);
// //     return null;
// //   }
  
// //   return data;
// // }

// // export async function deleteClient(id: string): Promise<boolean> {
// //   const { error } = await supabase
// //     .from('clients')
// //     .delete()
// //     .eq('id', id);
  
// //   return !error;
// // }

// // // ============================================
// // // PAYMENT FUNCTIONS
// // // ============================================

// // export async function getAllPayments(): Promise<Payment[]> {
// //   const { data, error } = await supabase
// //     .from('payments')
// //     .select('*, clients(business_name, subdomain)')
// //     .order('payment_date', { ascending: false });
  
// //   if (error) {
// //     console.error('Error fetching payments:', error);
// //     return [];
// //   }
  
// //   return data || [];
// // }

// // export async function getClientPayments(clientId: string): Promise<Payment[]> {
// //   const { data, error } = await supabase
// //     .from('payments')
// //     .select('*')
// //     .eq('client_id', clientId)
// //     .order('payment_date', { ascending: false });
  
// //   if (error) {
// //     console.error('Error fetching payments:', error);
// //     return [];
// //   }
  
// //   return data || [];
// // }

// // export async function createPayment(payment: Payment): Promise<Payment | null> {
// //   const { data, error } = await supabase
// //     .from('payments')
// //     .insert([payment])
// //     .select()
// //     .single();
  
// //   if (error) {
// //     console.error('Error creating payment:', error);
// //     return null;
// //   }
  
// //   return data;
// // }

// // export async function updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | null> {
// //   const { data, error } = await supabase
// //     .from('payments')
// //     .update(updates)
// //     .eq('id', id)
// //     .select()
// //     .single();
  
// //   if (error) {
// //     console.error('Error updating payment:', error);
// //     return null;
// //   }
  
// //   return data;
// // }

// // export async function deletePayment(id: string): Promise<boolean> {
// //   const { error } = await supabase
// //     .from('payments')
// //     .delete()
// //     .eq('id', id);
  
// //   return !error;
// // }

// // // ============================================
// // // ANALYTICS FUNCTIONS
// // // ============================================

// // export async function getDashboardStats() {
// //   const { data: clients } = await supabase.from('clients').select('*');
  
// //   const currentMonth = new Date().toLocaleString('default', { month: 'short' });
// //   const currentYear = new Date().getFullYear();
  
// //   const { data: monthPayments } = await supabase
// //     .from('payments')
// //     .select('amount')
// //     .eq('year', currentYear)
// //     .eq('month', currentMonth)
// //     .eq('status', 'paid');
  
// //   const monthRevenue = monthPayments?.reduce((sum, p) => sum + p.amount, 0) || 0;
  
// //   const { data: pendingClients } = await supabase
// //     .from('clients')
// //     .select('plan_price')
// //     .eq('payment_status', 'pending');
  
// //   const pendingAmount = pendingClients?.reduce((sum, c) => sum + (c.plan_price || 799), 0) || 0;
  
// //   const startOfMonth = new Date(currentYear, new Date().getMonth(), 1).toISOString();
// //   const { data: newClients } = await supabase
// //     .from('clients')
// //     .select('id')
// //     .gte('created_at', startOfMonth);
  
// //   return {
// //     totalClients: clients?.length || 0,
// //     activeClients: clients?.filter(c => c.status === 'live').length || 0,
// //     monthRevenue,
// //     pendingAmount,
// //     newClientsThisMonth: newClients?.length || 0,
// //     starterClients: clients?.filter(c => c.plan_type === 'starter').length || 0,
// //     professionalClients: clients?.filter(c => c.plan_type === 'professional').length || 0,
// //   };
// // }

// // export async function getMonthlyRevenueData(year: number) {
// //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
// //   const data = await Promise.all(
// //     months.map(async (month) => {
// //       const { data: payments } = await supabase
// //         .from('payments')
// //         .select('amount')
// //         .eq('year', year)
// //         .eq('month', month)
// //         .eq('status', 'paid');
      
// //       const revenue = payments?.reduce((sum, p) => sum + p.amount, 0) || 0;
// //       return { month, revenue };
// //     })
// //   );
  
// //   return data;
// // }

// // // ============================================
// // // IMAGE UPLOAD FUNCTIONS
// // // ============================================

// // export async function uploadImage(
// //   file: File,
// //   subdomain: string,
// //   type: string
// // ): Promise<string | null> {
// //   try {
// //     const fileExt = file.name.split('.').pop();
// //     const fileName = `${subdomain}/${type}-${Date.now()}.${fileExt}`;

// //     const { error } = await supabase.storage
// //       .from('client-images')
// //       .upload(fileName, file, {
// //         cacheControl: '3600',
// //         upsert: true,
// //       });

// //     if (error) {
// //       console.error('Upload error:', error);
// //       return null;
// //     }

// //     const { data: { publicUrl } } = supabase.storage
// //       .from('client-images')
// //       .getPublicUrl(fileName);

// //     return publicUrl;
// //   } catch (error) {
// //     console.error('Upload failed:', error);
// //     return null;
// //   }
// // }

// // export async function deleteImage(url: string): Promise<boolean> {
// //   try {
// //     const path = url.split('/client-images/')[1];
// //     if (!path) return false;

// //     const { error } = await supabase.storage
// //       .from('client-images')
// //       .remove([path]);

// //     return !error;
// //   } catch {
// //     return false;
// //   }
// // }







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
// // 🔥 BLOG POST INTERFACE - NEW
// // ============================================

// export interface BlogPost {
//   id: string;
//   client_id: string;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt?: string;
//   cover_image?: string;
//   author_name?: string;
//   author_image?: string;
//   category?: string;
//   tags?: string[];
//   status: 'draft' | 'published';
//   published_at?: string | null;
//   created_at?: string;
//   updated_at?: string;
// }

// // ============================================
// // MAIN CLIENT INTERFACE
// // ============================================

// export interface Client {
//   id?: string;
//   business_name: string;
//   template: string;
//   subdomain?: string;
//   custom_domain?: string;       // ← Tumhara existing field
//   plan_type?: 'starter' | 'professional';
//   plan_price?: number;
//   start_date?: string;
//   next_payment_date?: string;
//   payment_status?: 'paid' | 'pending' | 'overdue';
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

//   hero_image?: string;
//   about_hero_image?: string;
//   menu_hero_image?: string;
//   gallery_hero_image?: string;
//   contact_hero_image?: string;
//   about_image?: string;
//   chef_image?: string;
//   story_image_1?: string;
//   story_image_2?: string;
//   featured_image_1?: string;
//   featured_image_2?: string;
//   featured_image_3?: string;
//   specialty_image_1?: string;
//   specialty_image_2?: string;
//   specialty_image_3?: string;
//   specialty_1_title?: string;
//   specialty_2_title?: string;
//   specialty_3_title?: string;
//   specialty_1_desc?: string;
//   specialty_2_desc?: string;
//   specialty_3_desc?: string;
//   stat_1_number?: string;
//   stat_1_label?: string;
//   stat_2_number?: string;
//   stat_2_label?: string;
//   stat_3_number?: string;
//   stat_3_label?: string;
//   stat_4_number?: string;
//   stat_4_label?: string;
//   opening_hours?: OpeningHour[];
//   menu_categories?: MenuCategory[];
//   gallery_images_detailed?: GalleryImage[];
//   gallery_categories?: string[];
//   specialties?: Specialty[];
//   awards?: Award[];
//   about_short?: string;
//   about_text?: string;
//   about_text_2?: string;
//   about_heading?: string;
//   story_heading?: string;
//   story_paragraphs?: string[];
//   chef_name?: string;
//   owner_name?: string;
//   chef_role?: string;
//   chef_quote?: string;
//   allergen_note?: string;
//   map_embed_url?: string;
//   currency_symbol?: string;
//   year_established?: string;
//   marquee_text?: string;
//   cake_theme?: string;
//   restaurant_theme?: string;
//   hero_video_type?: 'upload' | 'url';
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
//   console.log('Fetching client for subdomain:', subdomain);

//   const { data, error } = await supabase
//     .from('clients')
//     .select('*')
//     .eq('subdomain', subdomain)
//     .single();

//   if (error) {
//     console.error('Error fetching client:', error);
//     return null;
//   }

//   console.log('Client data received:', data);
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
//     plan_price:
//       client.plan_price || (client.plan_type === 'professional' ? 2499 : 799),
//     start_date: new Date().toISOString(),
//     next_payment_date: new Date(
//       Date.now() + 30 * 24 * 60 * 60 * 1000
//     ).toISOString(),
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

// export async function updateClient(
//   id: string,
//   updates: Partial<Client>
// ): Promise<Client | null> {
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
//   const { error } = await supabase.from('clients').delete().eq('id', id);

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

// export async function createPayment(
//   payment: Payment
// ): Promise<Payment | null> {
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

// export async function updatePayment(
//   id: string,
//   updates: Partial<Payment>
// ): Promise<Payment | null> {
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
//   const { error } = await supabase.from('payments').delete().eq('id', id);

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

//   const monthRevenue =
//     monthPayments?.reduce((sum, p) => sum + p.amount, 0) || 0;

//   const { data: pendingClients } = await supabase
//     .from('clients')
//     .select('plan_price')
//     .eq('payment_status', 'pending');

//   const pendingAmount =
//     pendingClients?.reduce((sum, c) => sum + (c.plan_price || 799), 0) || 0;

//   const startOfMonth = new Date(
//     currentYear,
//     new Date().getMonth(),
//     1
//   ).toISOString();

//   const { data: newClients } = await supabase
//     .from('clients')
//     .select('id')
//     .gte('created_at', startOfMonth);

//   return {
//     totalClients: clients?.length || 0,
//     activeClients: clients?.filter((c) => c.status === 'live').length || 0,
//     monthRevenue,
//     pendingAmount,
//     newClientsThisMonth: newClients?.length || 0,
//     starterClients:
//       clients?.filter((c) => c.plan_type === 'starter').length || 0,
//     professionalClients:
//       clients?.filter((c) => c.plan_type === 'professional').length || 0,
//   };
// }

// export async function getMonthlyRevenueData(year: number) {
//   const months = [
//     'Jan','Feb','Mar','Apr','May','Jun',
//     'Jul','Aug','Sep','Oct','Nov','Dec',
//   ];

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

//     const {
//       data: { publicUrl },
//     } = supabase.storage.from('client-images').getPublicUrl(fileName);

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

// // ============================================
// // 🔥 BLOG FUNCTIONS - NEW
// // ============================================

// // Published posts only (client-facing)
// export async function getClientBlogPosts(
//   clientId: string
// ): Promise<BlogPost[]> {
//   const { data, error } = await supabase
//     .from('blog_posts')
//     .select('*')
//     .eq('client_id', clientId)
//     .eq('status', 'published')
//     .order('published_at', { ascending: false });

//   if (error) {
//     console.error('Error fetching blog posts:', error);
//     return [];
//   }
//   return data || [];
// }

// // All posts including drafts (admin-facing)
// export async function getAllClientBlogPosts(
//   clientId: string
// ): Promise<BlogPost[]> {
//   const { data, error } = await supabase
//     .from('blog_posts')
//     .select('*')
//     .eq('client_id', clientId)
//     .order('created_at', { ascending: false });

//   if (error) {
//     console.error('Error fetching all blog posts:', error);
//     return [];
//   }
//   return data || [];
// }

// // Single post by slug
// export async function getBlogPostBySlug(
//   clientId: string,
//   slug: string
// ): Promise<BlogPost | null> {
//   const { data, error } = await supabase
//     .from('blog_posts')
//     .select('*')
//     .eq('client_id', clientId)
//     .eq('slug', slug)
//     .single();

//   if (error) {
//     console.error('Error fetching blog post:', error);
//     return null;
//   }
//   return data;
// }

// // Create new post
// export async function createBlogPost(
//   post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>
// ): Promise<BlogPost> {
//   const { data, error } = await supabase
//     .from('blog_posts')
//     .insert([
//       {
//         ...post,
//         created_at: new Date().toISOString(),
//         updated_at: new Date().toISOString(),
//       },
//     ])
//     .select()
//     .single();

//   if (error) {
//     console.error('Error creating blog post:', error);
//     throw error;
//   }
//   return data;
// }

// // Update existing post
// export async function updateBlogPost(
//   id: string,
//   updates: Partial<BlogPost>
// ): Promise<BlogPost> {
//   const { data, error } = await supabase
//     .from('blog_posts')
//     .update({
//       ...updates,
//       updated_at: new Date().toISOString(),
//     })
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) {
//     console.error('Error updating blog post:', error);
//     throw error;
//   }
//   return data;
// }

// // Delete post
// export async function deleteBlogPost(id: string): Promise<void> {
//   const { error } = await supabase
//     .from('blog_posts')
//     .delete()
//     .eq('id', id);

//   if (error) {
//     console.error('Error deleting blog post:', error);
//     throw error;
//   }
// }





import { createClient } from "@supabase/supabase-js";

// ═══════════════════════════════════════════════════════
// SUPABASE CLIENT INITIALIZATION
// ═══════════════════════════════════════════════════════
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase credentials missing! Check .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ═══════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════

export interface Product {
  name: string;
  price: string;
  description?: string;
  image_url?: string;
}

export interface Review {
  name: string;
  text: string;
  rating: number;
  role?: string;
}

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

export interface Room {
  id?: number | string;
  name: string;
  category: string;
  subtitle?: string;
  price: string;
  image?: string;
  gallery?: string[];
  size?: string;
  beds?: string;
  guests?: string;
  view?: string;
  description?: string;
  amenities?: string[];
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  content?: string;
}

export interface Client {
  // ─── Core ───
  id?: string;
  template: string;
  business_name: string;
  subdomain: string;
  tagline?: string;
  about?: string;
  about_short?: string;

  // ─── Contact ───
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  city?: string;
  maps_link?: string;
  working_hours?: string;

  // ─── Social ───
  facebook?: string;
  instagram?: string;

  // ─── Images ───
  logo_url?: string;
  hero_image_url?: string;
  hero_image?: string;
  about_image?: string;
  about_hero_image?: string;
  menu_hero_image?: string;
  gallery_hero_image?: string;
  contact_hero_image?: string;
  rooms_hero_image?: string;
  amenities_hero_image?: string;
  reviews_hero_image?: string;
  blog_hero_image?: string;
  featured_image_1?: string;
  featured_image_2?: string;
  featured_image_3?: string;
  landscape_image?: string;
  stats_bg_image?: string;
  cta_bg_image?: string;

  // ─── Hero Customization ───
  hero_slides?: string[];
  hero_video_url?: string;
  hero_video_type?: string;
  hero_subtitle?: string;
  hero_tag?: string;
  marquee_text?: string;
  marquee_items?: string[];

  // ─── Founder / Chef ───
  founder_image?: string;
  founder_name?: string;
  founder_role?: string;
  founder_quote?: string;
  chef_image?: string;
  chef_name?: string;
  chef_role?: string;
  chef_quote?: string;

  // ─── Year ───
  year_established?: string;
  established_year?: string;

  // ─── Mission / Vision ───
  mission?: string;
  vision?: string;

  // ─── Stats ───
  stat_1_number?: string;
  stat_1_label?: string;
  stat_2_number?: string;
  stat_2_label?: string;
  stat_3_number?: string;
  stat_3_label?: string;
  stat_4_number?: string;
  stat_4_label?: string;

  // ─── Experiences (Resort) ───
  exp_image_1?: string;
  exp_title_1?: string;
  exp_desc_1?: string;
  exp_image_2?: string;
  exp_title_2?: string;
  exp_desc_2?: string;
  exp_image_3?: string;
  exp_title_3?: string;
  exp_desc_3?: string;
  exp_image_4?: string;
  exp_title_4?: string;
  exp_desc_4?: string;

  // ─── Specialty (Restaurant) ───
  specialty_1_title?: string;
  specialty_1_desc?: string;
  specialty_image_1?: string;
  specialty_2_title?: string;
  specialty_2_desc?: string;
  specialty_image_2?: string;
  specialty_3_title?: string;
  specialty_3_desc?: string;
  specialty_image_3?: string;

  // ─── Themes ───
  resort_theme?: string;
  cake_theme?: string;
  restaurant_theme?: string;
  primary_color?: string;
  secondary_color?: string;

  // ─── Lists ───
  products?: Product[];
  reviews?: Review[];
  opening_hours?: OpeningHour[];
  menu_categories?: MenuCategory[];
  gallery_images?: string[];
  gallery_images_detailed?: GalleryImage[];
  rooms?: Room[];
  amenities?: any[];
  timeline?: any[];
  awards?: any[];
  blog_posts?: BlogPost[];

  // ─── Plan ───
  plan_type?: "starter" | "professional";
  plan_price?: number;
  custom_domain?: string;
  payment_status?: "paid" | "pending" | "overdue";
  status?: "draft" | "live";

  // ─── SEO ───
  google_analytics_id?: string;
  google_verification?: string;

  // ─── Timestamps ───
  created_at?: string;
  updated_at?: string;
}

// ═══════════════════════════════════════════════════════
// 🔍 GET — Fetch Clients
// ═══════════════════════════════════════════════════════

/**
 * Get a single client by ID
 */
export async function getClientById(id: string): Promise<Client | null> {
  try {
    console.log("🔍 Fetching client by ID:", id);

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Error fetching client:", error);
      return null;
    }

    console.log("✅ Client fetched:", data?.business_name);
    return data as Client;
  } catch (err) {
    console.error("❌ getClientById exception:", err);
    return null;
  }
}

/**
 * Get a client by subdomain (for public website)
 */
export async function getClientBySubdomain(
  subdomain: string
): Promise<Client | null> {
  try {
    console.log("🔍 Fetching client for subdomain:", subdomain);

    // ✅ Add cache-bust timestamp
    const timestamp = Date.now();
    
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("subdomain", subdomain)
      .single();

    if (error) {
      console.error("Error fetching client:", error);
      return null;
    }

    console.log("✅ Fresh data fetched at:", new Date().toISOString());
    console.log("📊 Theme:", (data as any)?.cake_theme || (data as any)?.resort_theme);
    console.log("📊 Updated at:", data?.updated_at);
    
    return data as Client;
  } catch (err) {
    console.error("❌ getClientBySubdomain exception:", err);
    return null;
  }
}

/**
 * Get all clients (for admin dashboard)
 */
export async function getAllClients(): Promise<Client[]> {
  try {
    console.log("🔍 Fetching all clients...");

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching clients:", error);
      return [];
    }

    console.log(`✅ Fetched ${data?.length || 0} clients`);
    return (data as Client[]) || [];
  } catch (err) {
    console.error("❌ getAllClients exception:", err);
    return [];
  }
}

/**
 * Get clients by status (live/draft)
 */
export async function getClientsByStatus(
  status: "live" | "draft"
): Promise<Client[]> {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching clients by status:", error);
      return [];
    }

    return (data as Client[]) || [];
  } catch (err) {
    console.error("❌ getClientsByStatus exception:", err);
    return [];
  }
}

// ═══════════════════════════════════════════════════════
// ✏️ CREATE — New Client
// ═══════════════════════════════════════════════════════

/**
 * Create a new client
 */
export async function createNewClient(
  clientData: Client
): Promise<Client | null> {
  try {
    console.log("📤 Creating new client:", clientData.business_name);

    // Check if subdomain already exists
    const { data: existing } = await supabase
      .from("clients")
      .select("subdomain")
      .eq("subdomain", clientData.subdomain)
      .single();

    if (existing) {
      console.error("❌ Subdomain already exists:", clientData.subdomain);
      alert(`❌ Subdomain "${clientData.subdomain}" already exists! Choose another.`);
      return null;
    }

    const { data, error } = await supabase
      .from("clients")
      .insert([clientData])
      .select()
      .single();

    if (error) {
      console.error("❌ Create error:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      alert(`❌ Failed to create: ${error.message}`);
      return null;
    }

    console.log("✅ Client created:", data);
    return data as Client;
  } catch (err: any) {
    console.error("❌ createNewClient exception:", err);
    alert(`❌ Exception: ${err.message}`);
    return null;
  }
}

// ═══════════════════════════════════════════════════════
// 🔄 UPDATE — Update Client
// ═══════════════════════════════════════════════════════

/**
 * Update an existing client
 */
export async function updateClient(
  id: string,
  data: Partial<Client>
): Promise<Client | null> {
  try {
    console.log("📤 Updating client ID:", id);
    console.log("📤 Data being sent:", {
      template: data.template,
      resort_theme: data.resort_theme,
      cake_theme: data.cake_theme,
      restaurant_theme: data.restaurant_theme,
      rooms_count: data.rooms?.length || 0,
      gallery_count: data.gallery_images_detailed?.length || 0,
      hero_slides_count: data.hero_slides?.length || 0,
    });

    // Remove undefined values (Supabase doesn't like them)
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    // Add updated_at timestamp
    (cleanData as any).updated_at = new Date().toISOString();

    const { data: result, error } = await supabase
      .from("clients")
      .update(cleanData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("❌ Update error:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      alert(`❌ Update failed: ${error.message}\n\nHint: ${error.hint || "Check Supabase columns"}`);
      return null;
    }

    console.log("✅ Update successful:", result?.business_name);
    return result as Client;
  } catch (err: any) {
    console.error("❌ updateClient exception:", err);
    alert(`❌ Exception: ${err.message}`);
    return null;
  }
}

// ═══════════════════════════════════════════════════════
// 🗑️ DELETE — Delete Client
// ═══════════════════════════════════════════════════════

/**
 * Delete a client by ID
 */
export async function deleteClient(id: string): Promise<boolean> {
  try {
    console.log("🗑️ Deleting client:", id);

    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) {
      console.error("❌ Delete error:", error);
      alert(`❌ Delete failed: ${error.message}`);
      return false;
    }

    console.log("✅ Client deleted");
    return true;
  } catch (err: any) {
    console.error("❌ deleteClient exception:", err);
    return false;
  }
}

// ═══════════════════════════════════════════════════════
// 📁 IMAGE UPLOAD — Storage Functions
// ═══════════════════════════════════════════════════════

/**
 * Upload image to Supabase Storage
 */
export async function uploadImage(
  file: File,
  subdomain: string,
  type: string = "general"
): Promise<string | null> {
  try {
    console.log(`📤 Uploading ${type} image for ${subdomain}`);

    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${type}-${Date.now()}.${fileExt}`;
    const filePath = `${subdomain}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("client-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("❌ Upload error:", error);
      alert(`❌ Image upload failed: ${error.message}`);
      return null;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("client-images").getPublicUrl(filePath);

    console.log("✅ Image uploaded:", publicUrl);
    return publicUrl;
  } catch (err: any) {
    console.error("❌ uploadImage exception:", err);
    alert(`❌ Upload exception: ${err.message}`);
    return null;
  }
}

/**
 * Delete image from Supabase Storage
 */
export async function deleteImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract path from URL
    const urlParts = imageUrl.split("/client-images/");
    if (urlParts.length < 2) {
      console.error("❌ Invalid image URL");
      return false;
    }

    const filePath = urlParts[1];
    console.log("🗑️ Deleting image:", filePath);

    const { error } = await supabase.storage
      .from("client-images")
      .remove([filePath]);

    if (error) {
      console.error("❌ Delete image error:", error);
      return false;
    }

    console.log("✅ Image deleted");
    return true;
  } catch (err) {
    console.error("❌ deleteImage exception:", err);
    return false;
  }
}

// ═══════════════════════════════════════════════════════
// ⭐ REVIEWS — Dynamic Reviews System
// ═══════════════════════════════════════════════════════

/**
 * Get approved reviews for a client
 */
export async function getApprovedReviews(clientId: string) {
  try {
    const { data, error } = await supabase
      .from("resort_reviews")
      .select("*")
      .eq("client_id", clientId)
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching reviews:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("❌ getApprovedReviews exception:", err);
    return [];
  }
}

/**
 * Submit a new review (needs admin approval)
 */
export async function submitReview(reviewData: {
  client_id: string;
  guest_name: string;
  guest_email?: string;
  guest_location?: string;
  rating: number;
  title?: string;
  comment: string;
  stay_type?: string;
}) {
  try {
    const { data, error } = await supabase
      .from("resort_reviews")
      .insert([{ ...reviewData, approved: false }])
      .select()
      .single();

    if (error) {
      console.error("❌ Submit review error:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("❌ submitReview exception:", err);
    throw err;
  }
}

/**
 * Admin: Approve a review
 */
export async function approveReview(reviewId: string) {
  try {
    const { data, error } = await supabase
      .from("resort_reviews")
      .update({ approved: true })
      .eq("id", reviewId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("❌ approveReview exception:", err);
    return null;
  }
}

/**
 * Admin: Get all pending reviews
 */
export async function getPendingReviews() {
  try {
    const { data, error } = await supabase
      .from("resort_reviews")
      .select("*")
      .eq("approved", false)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching pending reviews:", error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error("❌ getPendingReviews exception:", err);
    return [];
  }
}

/**
 * Admin: Delete a review
 */
export async function deleteReview(reviewId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("resort_reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      console.error("❌ Delete review error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("❌ deleteReview exception:", err);
    return false;
  }
}

// ═══════════════════════════════════════════════════════
// 📊 DASHBOARD STATS
// ═══════════════════════════════════════════════════════

/**
 * Get dashboard statistics
 */
export async function getDashboardStats() {
  try {
    const { data: clients } = await supabase.from("clients").select("*");

    const total = clients?.length || 0;
    const live = clients?.filter((c) => c.status === "live").length || 0;
    const draft = clients?.filter((c) => c.status === "draft").length || 0;
    const professional =
      clients?.filter((c) => c.plan_type === "professional").length || 0;
    const starter =
      clients?.filter((c) => c.plan_type === "starter").length || 0;

    // Total monthly revenue (sum of all plan prices)
    const totalRevenue =
      clients?.reduce((sum, c) => sum + (c.plan_price || 0), 0) || 0;

    // This month's revenue (only paid clients)
    const monthRevenue =
      clients
        ?.filter((c) => c.payment_status === "paid")
        .reduce((sum, c) => sum + (c.plan_price || 0), 0) || 0;

    // Yearly projection
    const yearRevenue = totalRevenue * 12;

    // Payment stats
    const paid =
      clients?.filter((c) => c.payment_status === "paid").length || 0;
    const pending =
      clients?.filter((c) => c.payment_status === "pending").length || 0;
    const overdue =
      clients?.filter((c) => c.payment_status === "overdue").length || 0;

    // Template breakdown
    const templates: Record<string, number> = {};
    clients?.forEach((c) => {
      const template = c.template || "Unknown";
      templates[template] = (templates[template] || 0) + 1;
    });

    // Recent clients (last 5)
    const recentClients =
      clients
        ?.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        )
        .slice(0, 5) || [];

    console.log("📊 Dashboard stats:", {
      total,
      live,
      draft,
      monthRevenue,
      totalRevenue,
    });

    return {
      total,
      live,
      draft,
      professional,
      starter,
      totalRevenue,
      monthRevenue,
      yearRevenue,
      paid,
      pending,
      overdue,
      templates,
      recentClients,
    };
  } catch (err) {
    console.error("❌ getDashboardStats exception:", err);
    return {
      total: 0,
      live: 0,
      draft: 0,
      professional: 0,
      starter: 0,
      totalRevenue: 0,
      monthRevenue: 0,
      yearRevenue: 0,
      paid: 0,
      pending: 0,
      overdue: 0,
      templates: {},
      recentClients: [],
    };
  }
}
// ═══════════════════════════════════════════════════════
// 🔐 ADMIN AUTH (Simple)
// ═══════════════════════════════════════════════════════

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function setAdminLogin() {
  if (typeof window !== "undefined") {
    localStorage.setItem("avb_admin_logged_in", "true");
  }
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("avb_admin_logged_in");
  }
}

export function isAdminLoggedIn(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("avb_admin_logged_in") === "true";
  }
  return false;
}


// ═══════════════════════════════════════════════════════
// 📝 BLOG POSTS — Client Blog Functions
// ═══════════════════════════════════════════════════════

/**
 * Get all blog posts for a client (from client.blog_posts JSONB)
 */
export async function getClientBlogPosts(clientId: string): Promise<BlogPost[]> {
  try {
    console.log("🔍 Fetching blog posts for client:", clientId);

    const { data, error } = await supabase
      .from("clients")
      .select("blog_posts")
      .eq("id", clientId)
      .single();

    if (error) {
      console.error("❌ Error fetching blog posts:", error);
      return [];
    }

    const posts = (data?.blog_posts as BlogPost[]) || [];
    console.log(`✅ Fetched ${posts.length} blog posts`);
    return posts;
  } catch (err) {
    console.error("❌ getClientBlogPosts exception:", err);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPostBySlug(
  clientId: string,
  slug: string
): Promise<BlogPost | null> {
  try {
    console.log("🔍 Fetching blog post:", slug);

    const { data, error } = await supabase
      .from("clients")
      .select("blog_posts")
      .eq("id", clientId)
      .single();

    if (error) {
      console.error("❌ Error fetching blog post:", error);
      return null;
    }

    const posts = (data?.blog_posts as BlogPost[]) || [];
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
      console.warn("⚠️ Blog post not found:", slug);
      return null;
    }

    console.log("✅ Blog post found:", post.title);
    return post;
  } catch (err) {
    console.error("❌ getBlogPostBySlug exception:", err);
    return null;
  }
}

/**
 * Get blog posts by subdomain (for public access)
 */
export async function getBlogPostsBySubdomain(
  subdomain: string
): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("clients")
      .select("blog_posts")
      .eq("subdomain", subdomain)
      .single();

    if (error) {
      console.error("❌ Error fetching posts by subdomain:", error);
      return [];
    }

    return (data?.blog_posts as BlogPost[]) || [];
  } catch (err) {
    console.error("❌ getBlogPostsBySubdomain exception:", err);
    return [];
  }
}

/**
 * Get a blog post by subdomain + slug (for public URL)
 */
export async function getBlogPostBySubdomainAndSlug(
  subdomain: string,
  slug: string
): Promise<BlogPost | null> {
  try {
    const posts = await getBlogPostsBySubdomain(subdomain);
    return posts.find((p) => p.slug === slug) || null;
  } catch (err) {
    console.error("❌ getBlogPostBySubdomainAndSlug exception:", err);
    return null;
  }
}

/**
 * Admin: Add a new blog post to client
 */
export async function addBlogPost(
  clientId: string,
  newPost: BlogPost
): Promise<boolean> {
  try {
    // Get current posts
    const { data, error: fetchError } = await supabase
      .from("clients")
      .select("blog_posts")
      .eq("id", clientId)
      .single();

    if (fetchError) throw fetchError;

    const currentPosts = (data?.blog_posts as BlogPost[]) || [];

    // Check if slug already exists
    if (currentPosts.find((p) => p.slug === newPost.slug)) {
      alert(`❌ Slug "${newPost.slug}" already exists! Choose another.`);
      return false;
    }

    // Add new post
    const updatedPosts = [newPost, ...currentPosts];

    // Update client
    const { error: updateError } = await supabase
      .from("clients")
      .update({ blog_posts: updatedPosts })
      .eq("id", clientId);

    if (updateError) throw updateError;

    console.log("✅ Blog post added");
    return true;
  } catch (err: any) {
    console.error("❌ addBlogPost exception:", err);
    alert(`❌ Failed to add post: ${err.message}`);
    return false;
  }
}

/**
 * Admin: Update an existing blog post
 */
export async function updateBlogPost(
  clientId: string,
  slug: string,
  updatedPost: BlogPost
): Promise<boolean> {
  try {
    const { data, error: fetchError } = await supabase
      .from("clients")
      .select("blog_posts")
      .eq("id", clientId)
      .single();

    if (fetchError) throw fetchError;

    const currentPosts = (data?.blog_posts as BlogPost[]) || [];
    const updatedPosts = currentPosts.map((p) =>
      p.slug === slug ? updatedPost : p
    );

    const { error: updateError } = await supabase
      .from("clients")
      .update({ blog_posts: updatedPosts })
      .eq("id", clientId);

    if (updateError) throw updateError;

    console.log("✅ Blog post updated");
    return true;
  } catch (err: any) {
    console.error("❌ updateBlogPost exception:", err);
    return false;
  }
}

/**
 * Admin: Delete a blog post
 */
export async function deleteBlogPost(
  clientId: string,
  slug: string
): Promise<boolean> {
  try {
    const { data, error: fetchError } = await supabase
      .from("clients")
      .select("blog_posts")
      .eq("id", clientId)
      .single();

    if (fetchError) throw fetchError;

    const currentPosts = (data?.blog_posts as BlogPost[]) || [];
    const updatedPosts = currentPosts.filter((p) => p.slug !== slug);

    const { error: updateError } = await supabase
      .from("clients")
      .update({ blog_posts: updatedPosts })
      .eq("id", clientId);

    if (updateError) throw updateError;

    console.log("✅ Blog post deleted");
    return true;
  } catch (err) {
    console.error("❌ deleteBlogPost exception:", err);
    return false;
  }
}