import { Cpu } from 'lucide-react';

interface NavbarProps {
  onAddClick: () => void;
  onHomeClick: () => void;
}

export function Navbar({ onAddClick, onHomeClick }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-bottom border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={onHomeClick}
          >
            <div className="p-1.5 bg-neutral-900 rounded-lg group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AI Dev Shop</span>
          </div>
          
          <button 
            onClick={onAddClick}
            className="btn-primary flex items-center gap-2"
          >
            Add Item
          </button>
        </div>
      </div>
    </nav>
  );
}
