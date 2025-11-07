'use client';
import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface LandingPage {
  title: string;
  description: string;
  price: number;
  image_url: string;
}

export default function LandingPage({ params }: { params: { username: string; slug: string } }) {
  const supabase = createClientComponentClient();
  const [page, setPage] = useState<LandingPage | null>(null);

  useEffect(() => {
    async function fetchPage() {
      const { data, error } = await supabase
        .from('landing_pages')
        .select('*')
        .eq('slug', params.slug)
        .limit(1)
        .single();
      if (!error) setPage(data);
    }
    fetchPage();
  }, [params.slug]);

  if (!page) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow">
      <img src={page.image_url} alt={page.title} className="mb-4 w-full h-64 object-cover rounded" />
      <h2 className="text-2xl font-bold mb-2">{page.title}</h2>
      <p className="mb-4">{page.description}</p>
      <p className="mb-4 font-semibold">Price: ${page.price}</p>
      <a href={`/checkout/${page.slug}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Buy Now</a>
    </div>
  );
}