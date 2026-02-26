const fs = require('fs');
const dns = require('node:dns');
dns.setDefaultResultOrder('ipv4first');
const { createClient } = require('@supabase/supabase-js');

const envStr = fs.readFileSync('.env.local', 'utf8');
const env = envStr.split('\n').reduce((acc, line) => {
    const parts = line.split('=');
    if (parts.length >= 2) {
        acc[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
    return acc;
}, {});

const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkDatabase() {
    console.log('Checking auth.users...');
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
        console.error('Error fetching auth users:', authError);
    } else {
        console.log(`Found ${authUsers.users.length} users in auth.users.`);
        authUsers.users.forEach(u => console.log(`- ${u.id} | ${u.email}`));
    }

    console.log('\nChecking public.users...');
    const { data: publicUsers, error: publicError } = await supabase
        .from('users')
        .select('id, email, name');

    if (publicError) {
        console.error('Error fetching public users:', publicError);
    } else {
        console.log(`Found ${publicUsers.length} users in public.users.`);
        publicUsers.forEach(u => console.log(`- ${u.id} | ${u.email}`));
    }
}

checkDatabase();
