import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
      params: {
        eventsPerSecond: 2
      }
    }
  })
}

const FALLBACK_KEY = 'sk_generated_accounts_local'

export async function getAccounts() {
  if (!supabase) {
    const stored = localStorage.getItem(FALLBACK_KEY)
    return stored ? JSON.parse(stored) : []
  }

  try {
    const { data, error } = await supabase
      .from('app_config')
      .select('data')
      .eq('id', 'generatedAccounts')
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase error:', error)
      return []
    }

    return data?.data?.accounts || []
  } catch (err) {
    console.error('Error fetching accounts:', err)
    return []
  }
}

export async function saveAccounts(accounts) {
  if (!supabase) {
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(accounts))
    return
  }

  try {
    const payload = {
      accounts,
      updatedAt: new Date().toISOString()
    }

    const { error } = await supabase
      .from('app_config')
      .upsert({
        id: 'generatedAccounts',
        data: payload
      })

    if (error) {
      console.error('Error saving accounts:', error)
    }
  } catch (err) {
    console.error('Error saving accounts:', err)
  }
}

export function subscribeToAccounts(callback) {
  if (!supabase) return () => {}

  const channel = supabase
    .channel('app_config_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'app_config',
        filter: 'id=eq.generatedAccounts'
      },
      (payload) => {
        if (payload.new?.data?.accounts) {
          callback(payload.new.data.accounts)
        }
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
