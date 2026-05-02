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
  },
  {
    id: '4',
    name: 'ESP32-S3 AI Smart Watch Development Kit',
    description: 'A wearable AI development platform featuring a 0.96" OLED display and the powerful ESP32-S3 chip. Includes the Xiaozhi Voice Assistant for intelligent natural language dialogue and voice control projects.',
    price: 24.99,
    tags: ['ESP32-S3', 'AI Watch', 'Voice Assistant', 'OLED'],
    imageUrl: 'https://ae01.alicdn.com/kf/S09677330086c4349970c63c5305c63c55.jpg',
    longDescription: 'The Xiaozhi AI intelligent voice watch integrates advanced speech recognition and natural language processing technologies. It is equipped with an intelligent dialogue system, bringing a new interactive experience. By integrating multiple AI models, precise responses can be provided even in complex contexts. Character personalities and voice tones can be freely set, and a memory model is also available.',
    features: [
      'Intelligent AI voice dialogue with multiple model support (Qwen, DeepSeek, etc.)',
      'Real-time clock and OLED screen display',
      'Rechargeable lithium battery powered',
      'DIY kit for hands-on assembly (PCB is pre-soldered)',
      'Customizable roles, voices, and languages via web backend',
      'Supports up to 1000 word historical dialogue memory'
    ],
    specs: {
      'Motherboard': 'ESP32-S3-N16R8',
      'Display': '0.96-inch OLED screen',
      'Networking': 'WiFi 2.4GHz',
      'Battery': 'Rechargeable Lithium (Approx 250mA@3.7V)',
      'Case Size': '43mm * 52mm * 20mm',
      'Strap': 'Silicone, 20mm width'
    },
    galleryImages: [
      'https://ae01.alicdn.com/kf/S09677330086c4349970c63c5305c63c55.jpg',
      'https://ae01.alicdn.com/kf/S7e02e1c75c8b4b76a0899f8d1c080076a.jpg',
      'https://ae01.alicdn.com/kf/S9d9d300086c4349970c63c5305c63c55M.jpg'
    ]
  }
];
