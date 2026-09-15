/**
 * Centralized Site & Business Configuration for Indrani Paithani
 * Prevents duplicated hardcoded strings throughout the application
 */
export const SITE_CONFIG = {
  brandName: 'Indrani Paithani',
  tagline: 'Authentic Handwoven Paithani Sarees',
  legacyYears: '64+',
  
  // Announcement Bar Top Settings
  announcement: {
    enabled: true,
    text: '✨ Authentic Paithani Sarees | Handwoven in Yeola, Maharashtra',
    offerText: 'Complimentary Express Shipping Across India on orders above ₹10,000'
  },

  // Business Contact Info
  supportPhone: '+91-7507755836',
  altPhone: '+91 94220 12345',
  whatsappNumber: '917507755836',
  supportEmail: 'support@indranipaithani.com',
  locationCity: 'Yeola, Maharashtra, India',
  domain: 'https://indrani-paithani-web.onrender.com',
  
  // Yeola Location & Google Maps
  storeAddress: {
    hub: 'Yeola, Maharashtra, India',
    flagship: 'Station Road, Yeola, Nashik, Maharashtra - 423401'
  },
  googleMapsCidUrl: 'https://www.google.com/maps?cid=1441485876838413668&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=IN&source=embed',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Yeola,Maharashtra,India&t=&z=13&ie=UTF8&iwloc=&output=embed',

  // Business Hours
  businessHours: 'Monday - Sunday: 10:00 AM - 9:00 PM IST',

  // Social Media Handles
  socialLinks: {
    instagram: 'https://instagram.com/indranipaithani',
    facebook: 'https://facebook.com/indranipaithani',
    youtube: 'https://youtube.com/@indranipaithani',
    whatsapp: 'https://wa.me/917507755836'
  },

  // Brand Founder Information
  founder: {
    name: 'Niharika Wade',
    role: 'Founder & CEO, Indrani Paithani',
    photo: '/founder.png',
    quote: 'Luxury begins with trust. At Indrani Paithani, we are dedicated to preserving and celebrating the timeless heritage of Paithani craftsmanship, proudly carrying forward a legacy that has been cherished for over 64 years. Every creation reflects authenticity, elegance, and uncompromising quality.'
  },

  // Occasion Collections Mapping
  occasions: [
    { title: 'Bridal Trousseau', subtitle: 'Royal Maharani Weaves', desc: 'Grand pallus with 100+ peacock buttis and real gold zari for your special day.', filter: 'Maharani', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' },
    { title: 'Wedding Ceremonies', subtitle: 'Classic Peshwai Elegance', desc: 'Vibrant silk weaves designed to dazzle at family weddings and receptions.', filter: 'Yeola Paithani', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800' },
    { title: 'Festive Celebrations', subtitle: 'Tissue & Silk Glow', desc: 'Iridescent Tissue Gold sarees perfect for Diwali, Gudi Padwa & festivals.', filter: 'Tissue Silk', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800' },
    { title: 'Traditional Puja', subtitle: 'Pure Handloom Silk', desc: 'Subtle, elegant silk sarees hand-spun for auspicious family rituals.', filter: 'Yeola Paithani', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800' },
    { title: 'Luxury Gifting', subtitle: 'Heritage Legacy Sarees', desc: 'Precious handloom heirloom gifts passed down through generations.', filter: 'Maharani', img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800' }
  ],

  // Craftsmanship Journey Steps
  craftsmanshipSteps: [
    { step: '01', title: 'Mulberry Silk Selection', desc: 'Sourcing 100% pure Mulberry Silk yarns known for silk luster and high thread strength.' },
    { step: '02', title: 'Natural Hand Dyeing', desc: 'Yarns are dyed in traditional vibrant hues like Magenta, Emerald, Peacock Blue, and Sun Gold.' },
    { step: '03', title: 'Zari Warp & Weft Spin', desc: 'Pure metallic zari and silver-gilt threads are spun onto wooden bobbins for intricate pallu weaving.' },
    { step: '04', title: 'Handloom Card Transfer', desc: 'Master artisans set up handlooms in Yeola, transferring intricate geometric and floral patterns.' },
    { step: '05', title: 'Tapestry Motif Weaving', desc: 'Peacock (Mor), Parrot (Munia), and Lotus (Asavali) motifs are woven thread-by-thread without reverse knots.' },
    { step: '06', title: 'Silk Mark Inspection', desc: 'Each finished saree undergoes rigorous quality testing and receives official Silk Mark certification.' }
  ]
};
