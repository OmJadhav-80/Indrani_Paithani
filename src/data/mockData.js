export const MOCK_PRODUCTS = [
  {
    id: 'pth-001',
    sku: 'IP-YPAI-001',
    title: 'Maharani Royal Peacock Pure Yeola Paithani Saree',
    category: 'Yeola Paithani',
    fabric: 'Pure Silk',
    zariType: 'Pure Real Gold Zari (Tested)',
    price: 38500,
    originalPrice: 45000,
    discountPercent: 14,
    rating: 4.9,
    reviewsCount: 38,
    inStock: true,
    colors: [
      { name: 'Royal Maroon', hex: '#4A0E17' },
      { name: 'Peacock Emerald', hex: '#0F382C' },
      { name: 'Sunburst Gold', hex: '#D4AF37' }
    ],
    selectedColor: 'Royal Maroon',
    occasion: 'Bridal',
    borderStyle: 'Kathpadar Double Muniya Border',
    blousePiece: 'Included (Unstitched 80cm matching pure silk blouse with Zari border)',
    washCare: 'Strictly Dry Clean Only',
    handloomCertified: true,
    silkMarkCertified: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Masterpiece handcrafted Yeola Paithani saree in deep royal maroon pure silk. Features traditional double Muniya borders and an opulent golden Zari Pallu intricately woven with peacock and lotus motifs by state award-winning weavers.',
    specs: {
      'Saree Length': '6.3 Meters (With Blouse)',
      'Blouse Length': '0.80 Meters',
      'Fabric Purity': '100% Pure Mulberry Silk (Silk Mark Certified)',
      'Weave Technique': 'Handloom Interlock Weave',
      'Pallu Style': 'Rich Peacock & Asawali Zari Motif',
      'Origin': 'Yeola, Nashik (Maharashtra, India)'
    }
  },
  {
    id: 'pth-002',
    sku: 'IP-TSUK-002',
    title: 'Emerald Golden Brocade Tissue Silk Paithani',
    category: 'Tissue Silk',
    fabric: 'Tissue Silk',
    zariType: 'Fine Tested Metallic Zari',
    price: 26800,
    originalPrice: 31000,
    discountPercent: 13,
    rating: 4.8,
    reviewsCount: 24,
    inStock: true,
    colors: [
      { name: 'Emerald Green', hex: '#0F382C' },
      { name: 'Ruby Magenta', hex: '#900C3F' }
    ],
    selectedColor: 'Emerald Green',
    occasion: 'Festive',
    borderStyle: 'Single Muniya Gold Border',
    blousePiece: 'Included (80cm Contrast Brocade Silk)',
    washCare: 'Dry Clean Only',
    handloomCertified: true,
    silkMarkCertified: true,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Radiant Tissue Silk Paithani saree woven with iridescent dual-tone green threads and pure metallic gold zari sheen. Lightweight yet regal, suitable for grand weddings and sangeet functions.',
    specs: {
      'Saree Length': '6.3 Meters (With Blouse)',
      'Blouse Length': '0.80 Meters',
      'Fabric Purity': 'High-Grade Tissue Pure Silk',
      'Weave Technique': 'Handloom Tissue Tapestry',
      'Pallu Style': 'Traditional Kalanjali & Vaddar Pallu',
      'Origin': 'Yeola Cluster'
    }
  },
  {
    id: 'pth-003',
    sku: 'IP-MHRN-003',
    title: 'Maharani Handwoven Mulberry Silk Bridal Paithani',
    category: 'Maharani',
    fabric: 'Pure Silk',
    zariType: 'Pure Silver Zari with Gold Plating',
    price: 54000,
    originalPrice: 62000,
    discountPercent: 12,
    rating: 5.0,
    reviewsCount: 19,
    inStock: true,
    colors: [
      { name: 'Crimson Red', hex: '#800020' },
      { name: 'Royal Gold', hex: '#D4AF37' }
    ],
    selectedColor: 'Crimson Red',
    occasion: 'Bridal',
    borderStyle: 'Heavy Broad Kathpadar Zari',
    blousePiece: 'Included (Unstitched heavy Zari sleeve blouse)',
    washCare: 'Dry Clean Only in Soft Wrapper',
    handloomCertified: true,
    silkMarkCertified: true,
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'The epitome of Maharashtrian heritage. Handwoven for over 90 days using vintage Jacquard handloom setups, this crimson red bridal saree displays 100+ miniature peacock buttis on the body and an ornate royal durbar pallu.',
    specs: {
      'Saree Length': '6.3 Meters',
      'Blouse Length': '0.85 Meters',
      'Fabric Purity': '100% Certified Mulberry Silk',
      'Weave Technique': 'Triple-ply Handloom Tapestry',
      'Pallu Style': 'Grand Durbar Peacock Tapestry',
      'Origin': 'Yeola Heritage Weaving Hub'
    }
  },
  {
    id: 'pth-004',
    sku: 'IP-SEMI-004',
    title: 'Soft Semi-Paithani Festive Art Silk Saree',
    category: 'Semi-Paithani',
    fabric: 'Semi-Paithani',
    zariType: 'Light Zari Thread Work',
    price: 12500,
    originalPrice: 15000,
    discountPercent: 16,
    rating: 4.6,
    reviewsCount: 42,
    inStock: true,
    colors: [
      { name: 'Pastel Yellow', hex: '#F4E091' },
      { name: 'Royal Blue', hex: '#1E3A8A' }
    ],
    selectedColor: 'Pastel Yellow',
    occasion: 'Casual',
    borderStyle: 'Classic Zari Border',
    blousePiece: 'Included (80cm Silk Blend)',
    washCare: 'Gentle Dry Clean',
    handloomCertified: false,
    silkMarkCertified: false,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1000'
    ],
    description: 'Lightweight, easy-to-drape Semi-Paithani option for poojas, festive gatherings, and daytime family celebrations.',
    specs: {
      'Saree Length': '6.3 Meters',
      'Blouse Length': '0.80 Meters',
      'Fabric Purity': 'Silk Blend',
      'Weave Technique': 'Powerloom Paithani Weave',
      'Pallu Style': 'Peacock Motif Pallu',
      'Origin': 'Nashik, Maharashtra'
    }
  }
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-2026-9841',
    date: '2026-08-28',
    totalAmount: 38500,
    paymentMethod: 'Prepaid (Razorpay UPI)',
    status: 'Delivered',
    trackingNumber: 'IND-EXPR-9081237',
    courier: 'Bluedart Express',
    trackingUrl: 'https://www.bluedart.com/tracking?id=IND-EXPR-9081237',
    items: [
      {
        id: 'pth-001',
        title: 'Maharani Royal Peacock Pure Yeola Paithani Saree',
        color: 'Royal Maroon',
        price: 38500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=300'
      }
    ],
    shippingAddress: {
      name: 'Indrani Sharma',
      phone: '+91 9823456789',
      flat: 'Flat 402, Royal Palms Apartments',
      street: 'FC Road, Shivaji Nagar',
      landmark: 'Near Goodluck Cafe',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411004',
      label: 'Home'
    }
  },
  {
    id: 'ORD-2026-7812',
    date: '2026-09-10',
    totalAmount: 26800,
    paymentMethod: 'Cash on Delivery',
    status: 'Shipped',
    trackingNumber: 'IND-EXPR-4451902',
    courier: 'Delhivery Surface',
    trackingUrl: 'https://www.delhivery.com/track/package/IND-EXPR-4451902',
    items: [
      {
        id: 'pth-002',
        title: 'Emerald Golden Brocade Tissue Silk Paithani',
        color: 'Emerald Green',
        price: 26800,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=300'
      }
    ],
    shippingAddress: {
      name: 'Indrani Sharma',
      phone: '+91 9823456789',
      flat: 'Plot No 88, Sunrise Heights',
      street: 'Baner-Pashan Link Road',
      landmark: 'Opposite Dominoes',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
      label: 'Work'
    }
  }
];

export const PINCODE_DATABASE = {
  '400001': { city: 'Mumbai', state: 'Maharashtra', serviceable: true, estDays: '2-3 Business Days' },
  '411001': { city: 'Pune', state: 'Maharashtra', serviceable: true, estDays: '2-3 Business Days' },
  '422001': { city: 'Nashik', state: 'Maharashtra', serviceable: true, estDays: '1-2 Business Days (Local Express)' },
  '423401': { city: 'Yeola', state: 'Maharashtra', serviceable: true, estDays: '1 Business Day (Hub Same-Day)' },
  '110001': { city: 'New Delhi', state: 'Delhi', serviceable: true, estDays: '3-4 Business Days' },
  '560001': { city: 'Bengaluru', state: 'Karnataka', serviceable: true, estDays: '3-4 Business Days' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', serviceable: true, estDays: '4-5 Business Days' },
  '700001': { city: 'Kolkata', state: 'West Bengal', serviceable: true, estDays: '4-5 Business Days' },
  '500001': { city: 'Hyderabad', state: 'Telangana', serviceable: true, estDays: '3-4 Business Days' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', serviceable: true, estDays: '3-4 Business Days' }
};
