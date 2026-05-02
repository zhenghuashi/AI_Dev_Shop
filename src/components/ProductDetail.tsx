import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, Tag, Pencil } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onEdit: () => void;
}

export function ProductDetail({ product, onBack, onEdit }: ProductDetailProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Shop</span>
        </button>

        <button 
          onClick={onEdit}
          className="btn-secondary text-sm px-4 py-2"
        >
          <Pencil className="w-4 h-4" />
          Edit Product
        </button>
      </div>

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
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              {product.description}
            </p>
            {product.longDescription && (
              <p className="text-neutral-500 leading-relaxed mb-8 italic">
                {product.longDescription}
              </p>
            )}
          </div>

          {product.features && (
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-600">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.specs && (
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Technical Specs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key}>
                    <dt className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{key}</dt>
                    <dd className="text-sm font-medium text-neutral-900">{val}</dd>
                  </div>
                ))}
              </div>
            </div>
          )}

          {product.galleryImages && (
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">Product Gallery</h3>
              <div className="grid grid-cols-1 gap-6">
                {product.galleryImages.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
                    <img 
                      src={img} 
                      alt={`${product.name} detail ${i + 1}`} 
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

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
