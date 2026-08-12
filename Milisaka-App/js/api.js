// Centralized API client using Supabase directly.
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

window.supabase = supabase;

function mapProduct(p) {
  if (!p) return null;
  return {
    ...p,
    id: p.id,
    _id: p.id,
    key_specs: Array.isArray(p.key_specs) ? p.key_specs : (typeof p.key_specs === 'string' ? JSON.parse(p.key_specs || '[]') : []),
  };
}

window.api = {
  async getProducts(params = {}) {
    let query = supabase.from('products').select('*');
    if (params.category) query = query.eq('category', params.category);
    if (params.featured === 'true') query = query.eq('featured', true);
    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return (data || []).map(mapProduct);
  },

  async getProduct(id) {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).maybeSingle();
    if (error) throw new Error(error.message);
    return mapProduct(data);
  },

  async createOrder(order) {
    const { data, error } = await supabase.from('orders').insert({
      customer_name: order.customer_name,
      customer_email: order.customer_email,
      shipping_address: order.shipping_address,
      items: order.items,
      total: order.total,
      status: 'Pending',
    }).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  async createQuote(quote) {
    const { data, error } = await supabase.from('quotes').insert({
      full_name: quote.full_name,
      email: quote.email,
      phone: quote.phone,
      organization: quote.organization,
      sector: quote.sector,
      product_interest: quote.product_interest,
      quantity: quote.quantity,
      message: quote.message,
      status: quote.status || 'Pending Review',
    }).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  async createMessage(msg) {
    const { data, error } = await supabase.from('contact_messages').insert({
      full_name: msg.full_name,
      email: msg.email,
      subject: msg.subject,
      message: msg.message,
    }).select().single();
    if (error) throw new Error(error.message);
    return data;
  },

  async createCheckoutSession(data) {
    const order = await this.createOrder({
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      shipping_address: data.shipping_address,
      items: data.items,
      total: data.total,
    });
    return { url: 'confirmation.html' };
  },

  async register(data) {
    const { data: res, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.full_name } },
    });
    if (error) throw new Error(error.message);
    return res;
  },

  async login(data) {
    const { data: res, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) throw new Error(error.message);
    return res;
  },

  async getMe() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
};
