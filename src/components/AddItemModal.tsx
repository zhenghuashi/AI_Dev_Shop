import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Loader2, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';

interface AddItemModalProps {
  onClose: () => void;
  onAdd: (product: Product) => void;
  onUpdate: (product: Product) => void;
  initialProduct?: Product;
}

export function AddItemModal({ onClose, onAdd, onUpdate, initialProduct }: AddItemModalProps) {
  const isEditing = !!initialProduct;
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    tags: '',
    imageUrl: '',
    galleryImages: [] as string[]
  });

  useEffect(() => {
    if (initialProduct) {
      setFormData({
        name: initialProduct.name,
        description: initialProduct.description,
        price: initialProduct.price.toString(),
        tags: initialProduct.tags.join(', '),
        imageUrl: initialProduct.imageUrl,
        galleryImages: initialProduct.galleryImages || []
      });
    }
  }, [initialProduct]);

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

      setFormData(prev => ({
        ...prev,
        name: data.name,
        description: data.description,
        price: data.price.toString(),
        tags: data.tags.join(', '),
        imageUrl: prev.imageUrl || `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/800/600`
      }));
    } catch (error) {
      console.error('AI Gen failed:', error);
      alert('Failed to generate product details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGalleryImage = () => {
    setFormData(prev => ({
      ...prev,
      galleryImages: [...prev.galleryImages, '']
    }));
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }));
  };

  const handleGalleryImageChange = (index: number, value: string) => {
    const newGallery = [...formData.galleryImages];
    newGallery[index] = value;
    setFormData(prev => ({ ...prev, galleryImages: newGallery }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      ...(initialProduct || {}),
      id: initialProduct?.id || Math.random().toString(36).substring(7),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      imageUrl: formData.imageUrl || `https://picsum.photos/seed/${formData.name.replace(/\s+/g, '')}/800/600`,
      galleryImages: formData.galleryImages.filter(url => url.trim() !== '')
    };

    if (isEditing) {
      onUpdate(productData);
    } else {
      onAdd(productData);
    }
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
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex justify-between items-center p-6 border-b border-neutral-100 flex-shrink-0">
          <h2 className="text-xl font-bold">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* AI Helper Section - Only show for new items or if prompt is empty */}
          {!isEditing && (
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
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Product Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Price (USD)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Tags (Comma sep)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-neutral-100 pt-6">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-4 h-4 text-neutral-400" />
                <h3 className="font-bold text-sm uppercase tracking-widest text-neutral-400">Photos Management</h3>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1.5">Main Image URL</label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold">Gallery Images</label>
                {formData.galleryImages.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                      placeholder="Gallery image URL"
                    />
                    <button 
                      type="button"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="w-full py-2 border-2 border-dashed border-neutral-200 rounded-xl text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Gallery Image
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4 sticky bottom-0 bg-white pb-2">
               <button 
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary justify-center text-sm"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="flex-[2] btn-primary justify-center text-sm"
              >
                {isEditing ? 'Update Product' : 'Add to Catalog'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
