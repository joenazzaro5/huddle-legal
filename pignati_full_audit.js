require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function main() {
  console.log('=== ANY PLAYER NAMED PIGNATI (any team) ===')
  const { data: players } = await supabase.from('players').select('*').ilike('name', '%pignati%')
  console.log(JSON.stringify(players, null, 2))

  console.log('\n=== AUTH ACCOUNTS MATCHING pignati ===')
  const { data: userList } = await supabase.auth.admin.listUsers()
  const matches = userList.users.filter(u => (u.email || '').toLowerCase().includes('pignati'))
  matches.forEach(u => console.log(`  ${u.email}  id=${u.id}  created=${u.created_at}`))

  console.log('\n=== public.users rows matching pignati ===')
  const { data: pu } = await supabase.from('users').select('*').ilike('email', '%pignati%')
  console.log(JSON.stringify(pu, null, 2))

  console.log('\n=== team_members for those accounts ===')
  for (const u of matches) {
    const { data: tm } = await supabase.from('team_members').select('*, team:teams(id,name,age_group)').eq('user_id', u.id)
    console.log(`  ${u.email}:`, JSON.stringify(tm, null, 2))
  }

  console.log('\n=== COLUMNS ON players (checking for emergency contact fields) ===')
  const { data: onePlayer } = await supabase.from('players').select('*').limit(1)
  if (onePlayer && onePlayer[0]) console.log(Object.keys(onePlayer[0]).join(', '))
}
main()
