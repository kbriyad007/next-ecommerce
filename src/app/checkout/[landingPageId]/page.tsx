'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Checkout({ params }: { params: { landingPageId: string } }) {
  const supabase = createClientComponentClient();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('orders').insert({
      landing_page_id: params.landingPageId,
      customer_name: name,
      customer_phone: phone,
    });
    if (!error) setSubmitted(true);
  };

  if (submitted) return <div className="text-center p-4 text-green-600">Order submitted!</div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mb-3 p-2 border rounded" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Order</button>
    </form>
  );
}