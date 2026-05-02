import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Raspberry Pi AI Kit',
    description: 'Official Raspberry Pi AI Kit with Hailo-8L NPU, delivering 13 TOPS for on-device ML inference. Includes M.2 HAT+ and heatsink for optimal performance.',
    price: 70,
    tags: ['NPU', 'Raspberry Pi', 'Hailo'],
    imageUrl: 'https://picsum.photos/seed/rpiai/800/600'
  },
  {
    id: '2',
    name: 'NVIDIA Jetson Nano Developer Kit',
    description: 'Compact AI computer with 128-core Maxwell GPU and 4GB RAM. Perfect for running multiple neural networks in parallel for machine learning projects.',
    price: 149,
    tags: ['GPU', 'NVIDIA', 'Jetson'],
    imageUrl: 'https://picsum.photos/seed/jetson/800/600'
  },
  {
    id: '3',
    name: 'Grove AI Vision Bundle',
    description: 'Plug-and-play sensor kit for computer vision projects — includes wide-angle camera, IR sensor, and high-quality USB-C cable set.',
    price: 45,
    tags: ['Vision', 'Sensors', 'Plug-and-Play'],
    imageUrl: 'https://picsum.photos/seed/grove/800/600'
  }
];
