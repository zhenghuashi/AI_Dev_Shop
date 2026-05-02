import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, Tag } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export function ProductDetail({ product, onBack }: ProductDetailProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Shop</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl overflow-hidden aspect-square bg-neutral-100"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.1 }}
           className="flex flex-col justify-center"
        >
          <div className="flex gap-2 mb-6">
            {product.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-bold uppercase tracking-wider">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {product.name}
          </h1>
          
          <div className="font-mono text-3xl font-bold mb-8">
            ${product.price}
          </div>

          <div className="prose prose-neutral mb-8">
            <p className="text-lg text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="h-px bg-neutral-200 w-full mb-8" />

          <div className="space-y-4">
            <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest">
              Available in Session Stock
            </p>
            <p className="text-neutral-500 italic">
              This is a demo product detail page. Transaction capabilities are disabled.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
