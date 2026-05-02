/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { AddItemModal } from './components/AddItemModal';
import { INITIAL_PRODUCTS } from './constants';
import { Product, ViewState } from './types';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [viewState, setViewState] = useState<ViewState>({ type: 'catalog' });
  const [modalMode, setModalMode] = useState<{ open: boolean; product?: Product }>({ open: false });

  const handleProductClick = (id: string) => {
    setViewState({ type: 'detail', productId: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const selectedProduct = viewState.type === 'detail' 
    ? products.find(p => p.id === viewState.productId) 
    : null;

  return (
    <div className="min-h-screen font-sans selection:bg-neutral-900 selection:text-white">
      <Navbar 
        onAddClick={() => setModalMode({ open: true })} 
        onHomeClick={() => setViewState({ type: 'catalog' })} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {viewState.type === 'catalog' ? (
            <motion.div
              key="catalog"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-12 border-b border-neutral-200 pb-8">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 mb-2">
                    Available Inventory
                  </h2>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Tools for the New Frontier.
                  </h1>
                </div>
                <p className="max-w-md text-neutral-500 font-medium leading-relaxed">
                  A curated collection of edge AI hardware, dev kits, and specialized sensors for tomorrow's engineering challenges.
                </p>
              </div>

              <ProductGrid 
                products={products} 
                onProductClick={handleProductClick} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {selectedProduct ? (
                <ProductDetail 
                  product={selectedProduct} 
                  onBack={() => setViewState({ type: 'catalog' })} 
                  onEdit={() => setModalMode({ open: true, product: selectedProduct })}
                />
              ) : (
                <div className="py-20 text-center">
                  <p className="text-neutral-500">Product not found.</p>
                  <button 
                    onClick={() => setViewState({ type: 'catalog' })}
                    className="mt-4 text-neutral-900 font-bold underline"
                  >
                    Return to Catalog
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {modalMode.open && (
          <AddItemModal 
            onClose={() => setModalMode({ open: false })} 
            onAdd={handleAddProduct}
            onUpdate={handleUpdateProduct}
            initialProduct={modalMode.product}
          />
        )}
      </AnimatePresence>

      <footer className="border-t border-neutral-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900">AI Dev Shop</span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-500 text-sm">Demo Version 1.0</span>
          </div>
          <p className="text-neutral-400 text-xs font-mono uppercase tracking-widest">
            Built with Gemini 3 for AI Engineers
          </p>
        </div>
      </footer>
    </div>
  );
}

