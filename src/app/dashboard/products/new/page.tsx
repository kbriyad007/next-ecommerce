'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import slugify from 'slugify';

export default function NewLandingPage() {
  const supabase = createClientComponentClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price || !image) return;

    setLoading(true);

    // Upload image
    const fileName = `${Date.now()}-${image.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('landing-pages')
      .upload(fileName, image);

    if (uploadError) {
      setMessage(`Image upload error: ${uploadError.message}`);
      setLoading(false);
      return;
    }

    const imageUrl = supabase.storage.from('landing-pages').getPublicUrl(fileName).data.publicUrl;

    const slug = slugify(title, { lower: true, strict: true });

    const { error: insertError } = await supabase.from('landing_pages').insert({
      title,
      description,
      price,
      image_url: imageUrl,
      slug,
    });

    if (insertError) setMessage(`Error: ${insertError.message}`);
    else {
      setMessage('Landing page created successfully!');
      setTitle('');
      setDescription('');
      setPrice('');
      setImage(null);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Landing Page</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <textarea placeholder="Product Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full p-2 border rounded" required />
        <input type="file" accept="image/*" onChange={(e) => e.target.files && setImage(e.target.files[0])} className="w-full p-2 border rounded" required />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">{loading ? 'Creating...' : 'Create Landing Page'}</button>
      </form>
    </div>
  );
}