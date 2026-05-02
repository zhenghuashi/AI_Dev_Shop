import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Product } from '../types';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (product: Product) => void;
}

export function AddItemModal({ onClose, onAdd }: AddItemModalProps) {
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: '',
    imageUrl: ''
  });

  const handleGenerateAI = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch('/api/generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setFormData({
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        tags: data.tags.join(', '),
        imageUrl: `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/800/600`
      });
    } catch (error) {
      console.error('AI Gen failed:', error);
      alert('Failed to generate product details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${formData.name.replace(/\s+/g, '')}/800/600`
    };
    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center p-6 border-b border-neutral-100">
          <h2 className="text-xl font-bold">Add New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {/* AI Helper Section */}
          <div className="mb-8 p-6 bg-neutral-900 text-white rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <p className="text-neutral-400 text-sm mb-4">
              Describe the item briefly and let AI fill the technical details for you.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Edge TPU USB accelerator, $60"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder:text-neutral-500"
              />
              <button
                disabled={loading || !prompt}
                onClick={handleGenerateAI}
                className="px-4 py-2 bg-white text-neutral-900 font-bold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[100px]"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate'}
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">Product Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 placeholder:text-neutral-300"
                placeholder="NVIDIA Jetson AGX Orin"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Description</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 placeholder:text-neutral-300 resize-none"
                placeholder="Explain the technical specs and use-cases..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Price (USD)</label>
                <input
                  required
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 placeholder:text-neutral-300"
                  placeholder="299"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 placeholder:text-neutral-300"
                  placeholder="AI, NPU, Edge"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5">Image URL (Optional)</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 placeholder:text-neutral-300"
                placeholder="https://..."
              />
            </div>

            <button type="submit" className="w-full btn-primary justify-center mt-4">
              Add to Catalog
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
