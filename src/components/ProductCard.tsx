import React from 'react';
import { Product } from '../types';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onClick: (id: string) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card overflow-hidden group cursor-pointer"
      onClick={() => onClick(product.id)}
    >
      <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-neutral-600 transition-colors">
            {product.name}
          </h3>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
        </div>
        <p className="text-neutral-500 text-sm line-clamp-2 mb-4 h-10">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-mono font-bold text-lg">${product.price}</span>
          <div className="flex gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-neutral-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
