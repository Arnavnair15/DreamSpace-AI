import { RoomType, RoomStyle, ColorPalette, LightingPreset, Project, FAQItem, Testimonial, UserProfile } from "../types";

export const ROOM_TYPES: RoomType[] = [
  { id: "living_room", name: "Living Room", icon: "Sofa" },
  { id: "bedroom", name: "Bedroom", icon: "Bed" },
  { id: "kitchen", name: "Kitchen", icon: "ChefHat" },
  { id: "home_office", name: "Home Office", icon: "Briefcase" },
  { id: "dining_room", name: "Dining Room", icon: "Utensils" },
  { id: "bathroom", name: "Bathroom", icon: "Bath" }
];

export const ROOM_STYLES: RoomStyle[] = [
  {
    id: "japandi",
    name: "Japandi",
    description: "The perfect blend of Japanese minimalism and Scandinavian warmth. Natural woods, organic shapes, and a soothing, neutral canvas.",
    imageUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    tags: ["Minimalist", "Warm Wood", "Zen", "Organic"]
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    description: "Bright, airy, and highly functional. Emphasizes clean lines, soft light wood, white walls, cosy textiles, and subtle green accents.",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    tags: ["Bright", "Cosy", "Functional", "Linen"]
  },
  {
    id: "modern_minimalist",
    name: "Modern Minimalist",
    description: "Sleek, sophisticated, and free of clutter. Features dramatic architectural shapes, premium metals, and a strict monochrome or muted tone.",
    imageUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    tags: ["Sleek", "High Contrast", "Clean", "Luxe"]
  },
  {
    id: "industrial_loft",
    name: "Industrial Loft",
    description: "Raw and edgy with exposed brick, rustic wood, polished concrete, and bold black iron pipelines. Ideal for high-ceiling urban spaces.",
    imageUrl: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    tags: ["Raw", "Brick", "Iron", "Urban"]
  },
  {
    id: "mid_century_modern",
    name: "Mid-Century Modern",
    description: "Retro-futuristic style celebrating clean, curved lines, warm teak woods, bold abstract art, and signature iconic furniture forms.",
    imageUrl: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
    tags: ["Retro", "Teak Wood", "Curved", "Classic"]
  },
  {
    id: "bohemian_oasis",
    name: "Bohemian Oasis",
    description: "Free-spirited, layered, and incredibly cozy. Bursting with textured rattan, overflowing houseplants, global woven rugs, and warm brass.",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    tags: ["Cozy", "Plants", "Rattan", "Layered"]
  },
  {
    id: "parisian_chic",
    name: "Parisian Chic",
    description: "Timeless European romance. High ornate crown moldings, white marble fireplaces, gilded gold mirrors, and high-fashion soft velvet pieces.",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    tags: ["Ornate", "Luxe Velvet", "Classical", "Parisian"]
  },
  {
    id: "coastal_breeze",
    name: "Coastal Breeze",
    description: "Relaxed seaside elegance. Light-wash oak, soft blue and seafoam green accents, breathable white linen slipcovers, and natural jute textures.",
    imageUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
    tags: ["Seaside", "Light Oak", "Linen", "Fresh"]
  }
];

export const COLOR_PALETTES: ColorPalette[] = [
  {
    id: "warm_neutrals",
    name: "Warm Neutrals",
    colors: ["#FDFBF7", "#EFEAE4", "#D9CFC1", "#8C8275", "#4A453F"],
    description: "Calming creams, soft oats, and earthy clays. Creates a cozy, grounded sanctuary."
  },
  {
    id: "forest_retreat",
    name: "Forest Retreat",
    colors: ["#F4F7F4", "#D5E2D5", "#6B8E23", "#2D4B32", "#1E291F"],
    description: "Deep sage, mossy greens, and rich dark spruce. Brings the organic serenity of nature indoors."
  },
  {
    id: "monochrome_chic",
    name: "Monochrome Chic",
    colors: ["#FFFFFF", "#F1F5F9", "#94A3B8", "#334155", "#0F172A"],
    description: "Crisp white, slate grey, and charcoal black. High-contrast, architectural, and timeless."
  },
  {
    id: "earthy_terracotta",
    name: "Earthy Terracotta",
    colors: ["#FDF4EC", "#F4D9C7", "#D97706", "#B45309", "#78350F"],
    description: "Sun-baked ochre, rustic terracotta, and rich mahogany. Adds energetic solar warmth."
  },
  {
    id: "serene_pastel",
    name: "Serene Blue",
    colors: ["#F0F8FF", "#E0F2FE", "#7DD3FC", "#0284C7", "#0C4A6E"],
    description: "Soft glacier white, duck egg blue, and deep sapphire. Induces immediate focus and calm."
  }
];

export const LIGHTING_PRESETS: LightingPreset[] = [
  {
    id: "natural_daylight",
    name: "Natural Daylight",
    description: "Bright, shadow-less diffuse morning sun. Ideal for clean Scandinavian designs.",
    icon: "Sun"
  },
  {
    id: "golden_hour",
    name: "Golden Hour Warmth",
    description: "Low-angle, warm, dramatic light casting beautiful soft long shadows.",
    icon: "Sunset"
  },
  {
    id: "cozy_ambient",
    name: "Cozy Evening Ambient",
    description: "Warm glowing fireplace, floor lamps, and subtle hidden LED strip uplights.",
    icon: "Flame"
  },
  {
    id: "cinematic_contrast",
    name: "Cinematic Accent",
    description: "Moody, high-contrast spotlighting accentuating architectural shapes.",
    icon: "Sparkles"
  }
];

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "project_1",
    title: "Minimalist Living Room Redesign",
    roomType: "Living Room",
    style: "Japandi",
    beforeImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    date: "June 28, 2026",
    prompt: "Add a comfortable cream boucle sofa, minimalist wooden coffee table, warm textured wool rug, and dynamic indirect warm track lights.",
    colorPalette: "Warm Neutrals",
    lighting: "Golden Hour Warmth"
  },
  {
    id: "project_2",
    title: "Urban Industrial Office conversion",
    roomType: "Home Office",
    style: "Industrial Loft",
    beforeImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    date: "June 15, 2026",
    prompt: "Turn this empty concrete wall space into a premium executive home office with black metal bookshelves, a raw oak desk, leather office chair, and smart plants.",
    colorPalette: "Monochrome Chic",
    lighting: "Cinematic Accent"
  },
  {
    id: "project_3",
    title: "Gourmet Kitchen Transformation",
    roomType: "Kitchen",
    style: "Modern Minimalist",
    beforeImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    date: "June 10, 2026",
    prompt: "Redesign the kitchen cabinets with elegant matte black wood veneer, adding integrated smart appliances, luxury calacatta marble countertops, and warm gold accents.",
    colorPalette: "Monochrome Chic",
    lighting: "Natural Daylight"
  },
  {
    id: "project_4",
    title: "Mid-Century Cozy Reading Bedroom",
    roomType: "Bedroom",
    style: "Mid-Century Modern",
    beforeImage: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80",
    date: "May 24, 2026",
    prompt: "Add a teak bed frame with soft forest green linens, a retro mid-century reading armchair, vintage geometric brass lamps, and rich abstract artwork.",
    colorPalette: "Forest Retreat",
    lighting: "Cozy Evening Ambient"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How does DreamSpace AI work?",
    answer: "DreamSpace AI uses advanced computer vision to analyze the geometry, walls, window locations, and structural elements of your uploaded room photo. It then applies your chosen style, color scheme, and lighting preset to create a photorealistic, architecturally accurate preview of your redesigned room in under 10 seconds."
  },
  {
    question: "Do I need professional blueprints or 3D models?",
    answer: "Not at all! All you need is a simple photo taken from your phone. Our AI automatically detects the depth, perspective, and lighting of the space, so there's no need for any technical design experience."
  },
  {
    question: "Can I choose what furniture or colors to keep?",
    answer: "Yes, in the Premium design playground, you can specify elements you want to retain (like your existing hardwood flooring or fireplace) and write custom text prompts to guide the AI precisely on what additions or subtractions to make."
  },
  {
    question: "How many credits does it cost to generate a room redesign?",
    answer: "Generating a high-resolution redesign concepts costs 1 AI credit. Free tier accounts receive 10 complimentary credits. Pro plan members get 100 credits monthly with access to advanced custom models, and Studio plan members receive unlimited generations."
  },
  {
    question: "Can I download and export my designs?",
    answer: "Absolutely! You can download high-resolution 4K images of your redesigns, share comparison links with friends, and export the exact color palettes, materials list, and matching design catalogs directly to your dashboard."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t_1",
    name: "Sophia Martinez",
    role: "Homeowner in Austin, TX",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    content: "DreamSpace AI saved us thousands of dollars in designer fees. We were debating between Japandi and Bohemian for our main living room. Seeing the realistic 4K comparisons side-by-side made our choice immediate!",
    rating: 5,
    designStyle: "Japandi"
  },
  {
    id: "t_2",
    name: "Alex Thorne",
    role: "Architect & Space Planner",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    content: "The accuracy of depth detection is unbelievable. I can upload raw concrete floor sites and mock elegant Scandinavian furniture arrangements for client alignment in less than two minutes. A game changer for spatial workflows.",
    rating: 5,
    designStyle: "Scandinavian"
  },
  {
    id: "t_3",
    name: "Elena Rostova",
    role: "Interior Design Enthusiast",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    content: "I'm renting a small apartment and didn't know how to cozy it up. DreamSpace AI helped me visualize exactly where to put potted plants, floating shelves, and how a warmer color palette would feel without picking up a paintbrush.",
    rating: 5,
    designStyle: "Bohemian Oasis"
  }
];

export const USER_PROFILE: UserProfile = {
  name: "Arnav Nair",
  email: "nairarnav15@gmail.com",
  credits: 85,
  maxCredits: 100,
  avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
  isPro: true
};
