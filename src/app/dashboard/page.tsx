'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface LandingPage {
  id: string;
  title: string;
  slug: string;
}

export default function Dashboard() {
  const supabase = createClientComponentClient();
  const [pages, setPages] = useState<LandingPage[]>([]);

  useEffect(() => {
    async function fetchPages() {
      const { data, error } = await supabase.from('landing_pages').select('*');
      if (!error && data) setPages(data);
    }
    fetchPages();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Landing Pages</h1>
      <a href="/dashboard/products/new" className="inline-block mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Create New</a>
      <ul>
        {pages.map((page) => (
          <li key={page.id} className="mb-2">
            <a href={`/${page.slug}`} className="text-blue-600 hover:underline">{page.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}