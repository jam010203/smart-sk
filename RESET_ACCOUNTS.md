# Reset generated accounts (keep admin only)

To remove **all generated user accounts** (bea@sklgu.gov.ph, jam@sklgu.gov.ph, etc.) and keep only the admin:

1. Open **Supabase** → **SQL Editor** → **New query**.
2. Paste and run:

```sql
insert into public.app_config (id, data)
values ('generatedAccounts', '{"accounts": [], "updatedAt": "2026-02-09T00:00:00.000Z"}'::jsonb)
on conflict (id) do update set data = '{"accounts": [], "updatedAt": "2026-02-09T00:00:00.000Z"}'::jsonb;
```

3. Click **Run**.

After this, the **Manage User** and **Generate Account** pages will show no users. The **admin** (inovision@sklgu.gov.ph) is unchanged and still logs in with the admin password. New accounts you create with **Generate Account** will sync across all browsers.
