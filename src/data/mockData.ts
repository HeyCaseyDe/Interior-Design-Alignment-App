import { Space, Board, BoardImage } from '@/types';

export const SPACES: Space[] = [
  { id: 'kitchen', name: 'Kitchen', order: 1, isActive: true },
  { id: 'primary-bedroom', name: 'Primary Bedroom', order: 2, isActive: true },
  { id: 'primary-bath', name: 'Primary Bath', order: 3, isActive: true },
  { id: 'exterior', name: 'Exterior', order: 4, isActive: true },
  { id: 'primary-closet', name: 'Primary Closet', order: 5, isActive: true },
  { id: 'living-room', name: 'Living Room', order: 6, isActive: true },
  { id: 'dining-room', name: 'Dining Room', order: 7, isActive: true }
];

const generateUnsplashUrl = (width: number, height: number, seed: string) => 
  `https://picsum.photos/seed/${seed}/${width}/${height}`;

// Function to generate unique images for each board
const generateBoardImages = (spacePrefix: string, boardNum: number, imageData: {alt: string, tags: string[]}[]) => {
  return imageData.map((data, index) => ({
    id: `${spacePrefix}${boardNum}-${index + 1}`,
    url: generateUnsplashUrl(400, 300, `${spacePrefix}-board${boardNum}-${index + 1}`),
    alt: data.alt,
    tags: data.tags
  }));
};

export const MOCK_BOARDS: Board[] = [
  // Kitchen boards - each board has unique images
  {
    id: 'kitchen-1', spaceId: 'kitchen', name: 'Style Direction', order: 1,
    images: generateBoardImages('k', 1, [
      { alt: 'Modern white kitchen', tags: ['modern', 'white', 'minimalist', 'marble'] },
      { alt: 'Rustic farmhouse kitchen', tags: ['rustic', 'farmhouse', 'wood', 'vintage'] },
      { alt: 'Industrial style kitchen', tags: ['industrial', 'metal', 'concrete', 'dark'] },
      { alt: 'Scandinavian kitchen', tags: ['scandinavian', 'light-wood', 'clean', 'bright'] },
      { alt: 'Traditional kitchen', tags: ['traditional', 'warm', 'classic', 'elegant'] },
      { alt: 'Contemporary kitchen', tags: ['contemporary', 'sleek', 'geometric', 'neutral'] }
    ])
  },
  {
    id: 'kitchen-2', spaceId: 'kitchen', name: 'Color Palette', order: 2,
    images: generateBoardImages('k', 2, [
      { alt: 'White and gray kitchen', tags: ['white', 'gray', 'neutral', 'clean'] },
      { alt: 'Navy and brass kitchen', tags: ['navy', 'brass', 'bold', 'sophisticated'] },
      { alt: 'Warm wood tones kitchen', tags: ['wood', 'warm', 'natural', 'honey'] },
      { alt: 'Black and white kitchen', tags: ['black', 'white', 'contrast', 'dramatic'] },
      { alt: 'Sage green kitchen', tags: ['green', 'sage', 'earthy', 'calming'] },
      { alt: 'Cream and beige kitchen', tags: ['cream', 'beige', 'soft', 'warm-neutral'] }
    ])
  },
  {
    id: 'kitchen-3', spaceId: 'kitchen', name: 'Materials & Finishes', order: 3,
    images: generateBoardImages('k', 3, [
      { alt: 'Marble countertop kitchen', tags: ['marble', 'luxurious', 'veined', 'classic'] },
      { alt: 'Quartz surface kitchen', tags: ['quartz', 'durable', 'consistent', 'modern'] },
      { alt: 'Butcher block counters', tags: ['wood', 'butcher-block', 'warm', 'natural'] },
      { alt: 'Concrete countertop kitchen', tags: ['concrete', 'industrial', 'smooth', 'contemporary'] },
      { alt: 'Granite surface kitchen', tags: ['granite', 'speckled', 'traditional', 'durable'] },
      { alt: 'Stainless steel kitchen', tags: ['stainless-steel', 'professional', 'sleek', 'hygienic'] }
    ])
  },
  {
    id: 'kitchen-4', spaceId: 'kitchen', name: 'Layout & Flow', order: 4,
    images: generateBoardImages('k', 4, [
      { alt: 'Galley kitchen layout', tags: ['galley', 'efficient', 'narrow', 'functional'] },
      { alt: 'L-shaped kitchen', tags: ['l-shaped', 'corner', 'spacious', 'versatile'] },
      { alt: 'Kitchen island design', tags: ['island', 'central', 'social', 'storage'] },
      { alt: 'Open concept kitchen', tags: ['open-concept', 'flowing', 'connected', 'spacious'] },
      { alt: 'U-shaped kitchen', tags: ['u-shaped', 'enclosed', 'efficient', 'work-triangle'] },
      { alt: 'Peninsula kitchen', tags: ['peninsula', 'connected', 'breakfast-bar', 'semi-open'] }
    ])
  },
  {
    id: 'kitchen-5', spaceId: 'kitchen', name: 'Lighting & Ambiance', order: 5,
    images: generateBoardImages('k', 5, [
      { alt: 'Pendant lights over island', tags: ['pendant', 'island', 'task-lighting', 'stylish'] },
      { alt: 'Under cabinet lighting', tags: ['under-cabinet', 'led', 'ambient', 'functional'] },
      { alt: 'Chandelier in kitchen', tags: ['chandelier', 'elegant', 'dramatic', 'focal-point'] },
      { alt: 'Recessed ceiling lights', tags: ['recessed', 'clean', 'general-lighting', 'modern'] },
      { alt: 'Track lighting system', tags: ['track-lighting', 'adjustable', 'flexible', 'contemporary'] },
      { alt: 'Natural light kitchen', tags: ['natural-light', 'windows', 'bright', 'airy'] }
    ])
  },

  // Primary Bedroom boards
  {
    id: 'bedroom-1', spaceId: 'primary-bedroom', name: 'Overall Mood', order: 1,
    images: generateBoardImages('b', 1, [
      { alt: 'Serene modern bedroom', tags: ['modern', 'serene', 'neutral', 'platform-bed'] },
      { alt: 'Cozy rustic bedroom', tags: ['rustic', 'cozy', 'wood', 'warm'] },
      { alt: 'Elegant luxury bedroom', tags: ['luxury', 'elegant', 'rich-fabrics', 'chandelier'] },
      { alt: 'Minimalist zen bedroom', tags: ['minimalist', 'zen', 'simple', 'calming'] },
      { alt: 'Bohemian eclectic bedroom', tags: ['bohemian', 'eclectic', 'colorful', 'textiles'] },
      { alt: 'Contemporary chic bedroom', tags: ['contemporary', 'chic', 'stylish', 'sophisticated'] }
    ])
  },
  {
    id: 'bedroom-2', spaceId: 'primary-bedroom', name: 'Color Story', order: 2,
    images: generateBoardImages('b', 2, [
      { alt: 'Soft neutral bedroom', tags: ['neutral', 'soft', 'beige', 'cream'] },
      { alt: 'Bold navy bedroom', tags: ['navy', 'bold', 'dramatic', 'sophisticated'] },
      { alt: 'Warm earth tones bedroom', tags: ['earth-tones', 'warm', 'brown', 'terracotta'] },
      { alt: 'Cool blue and gray bedroom', tags: ['blue', 'gray', 'cool', 'calming'] },
      { alt: 'Blush and gold bedroom', tags: ['blush', 'gold', 'feminine', 'elegant'] },
      { alt: 'Monochromatic white bedroom', tags: ['white', 'monochromatic', 'pure', 'clean'] }
    ])
  },
  {
    id: 'bedroom-3', spaceId: 'primary-bedroom', name: 'Furniture Style', order: 3,
    images: generateBoardImages('b', 3, [
      { alt: 'Platform bed modern', tags: ['platform-bed', 'modern', 'low-profile', 'sleek'] },
      { alt: 'Four poster traditional bed', tags: ['four-poster', 'traditional', 'grand', 'classic'] },
      { alt: 'Upholstered headboard', tags: ['upholstered', 'soft', 'comfortable', 'luxurious'] },
      { alt: 'Mid-century modern furniture', tags: ['mid-century', 'modern', 'vintage', 'iconic'] },
      { alt: 'Rustic wood furniture', tags: ['rustic', 'wood', 'natural', 'handcrafted'] },
      { alt: 'Contemporary floating furniture', tags: ['contemporary', 'floating', 'minimalist', 'space-saving'] }
    ])
  },
  {
    id: 'bedroom-4', spaceId: 'primary-bedroom', name: 'Textiles & Patterns', order: 4,
    images: generateBoardImages('b', 4, [
      { alt: 'Geometric patterns', tags: ['geometric', 'patterns', 'modern', 'bold'] },
      { alt: 'Floral prints', tags: ['floral', 'prints', 'romantic', 'traditional'] },
      { alt: 'Solid luxurious fabrics', tags: ['solid', 'luxurious', 'rich', 'elegant'] },
      { alt: 'Natural linen textures', tags: ['linen', 'natural', 'textured', 'casual'] },
      { alt: 'Velvet and silk', tags: ['velvet', 'silk', 'opulent', 'glamorous'] },
      { alt: 'Cozy knit throws', tags: ['knit', 'cozy', 'comfortable', 'casual'] }
    ])
  },
  {
    id: 'bedroom-5', spaceId: 'primary-bedroom', name: 'Lighting Design', order: 5,
    images: generateBoardImages('b', 5, [
      { alt: 'Bedside pendant lights', tags: ['pendant', 'bedside', 'modern', 'functional'] },
      { alt: 'Crystal chandelier', tags: ['chandelier', 'crystal', 'elegant', 'dramatic'] },
      { alt: 'Modern table lamps', tags: ['table-lamps', 'modern', 'sleek', 'ambient'] },
      { alt: 'Wall sconces', tags: ['sconces', 'wall-mounted', 'space-saving', 'stylish'] },
      { alt: 'Natural window light', tags: ['natural-light', 'windows', 'bright', 'airy'] },
      { alt: 'Recessed ceiling lights', tags: ['recessed', 'ceiling', 'clean', 'minimal'] }
    ])
  },

  // Primary Bath boards
  {
    id: 'bathroom-1', spaceId: 'primary-bath', name: 'Style & Atmosphere', order: 1,
    images: generateBoardImages('ba', 1, [
      { alt: 'Spa-like zen bathroom', tags: ['spa', 'zen', 'natural-stone', 'calming'] },
      { alt: 'Modern sleek bathroom', tags: ['modern', 'sleek', 'glass', 'chrome'] },
      { alt: 'Traditional elegant bathroom', tags: ['traditional', 'elegant', 'marble', 'classic'] },
      { alt: 'Industrial loft bathroom', tags: ['industrial', 'loft', 'concrete', 'metal'] },
      { alt: 'Coastal relaxed bathroom', tags: ['coastal', 'relaxed', 'blue', 'natural-light'] },
      { alt: 'Luxury hotel bathroom', tags: ['luxury', 'hotel', 'opulent', 'sophisticated'] }
    ])
  },
  {
    id: 'bathroom-2', spaceId: 'primary-bath', name: 'Fixtures & Hardware', order: 2,
    images: generateBoardImages('ba', 2, [
      { alt: 'Freestanding soaking tub', tags: ['freestanding', 'soaking-tub', 'luxury', 'focal-point'] },
      { alt: 'Walk-in rain shower', tags: ['walk-in', 'rain-shower', 'modern', 'spacious'] },
      { alt: 'Vintage clawfoot tub', tags: ['vintage', 'clawfoot', 'classic', 'romantic'] },
      { alt: 'Double vanity sinks', tags: ['double-vanity', 'practical', 'spacious', 'convenient'] },
      { alt: 'Wall-mounted fixtures', tags: ['wall-mounted', 'space-saving', 'modern', 'clean'] },
      { alt: 'Traditional pedestal sink', tags: ['pedestal', 'traditional', 'elegant', 'timeless'] }
    ])
  },
  {
    id: 'bathroom-3', spaceId: 'primary-bath', name: 'Tile & Stone', order: 3,
    images: generateBoardImages('ba', 3, [
      { alt: 'Marble subway tiles', tags: ['marble', 'subway-tile', 'classic', 'elegant'] },
      { alt: 'Natural stone walls', tags: ['natural-stone', 'textured', 'organic', 'spa-like'] },
      { alt: 'Geometric mosaic patterns', tags: ['mosaic', 'geometric', 'patterns', 'artistic'] },
      { alt: 'Large format porcelain', tags: ['porcelain', 'large-format', 'modern', 'seamless'] },
      { alt: 'Hexagon floor tiles', tags: ['hexagon', 'floor-tile', 'trendy', 'interesting'] },
      { alt: 'Wood-look ceramic tiles', tags: ['wood-look', 'ceramic', 'warm', 'natural'] }
    ])
  },
  {
    id: 'bathroom-4', spaceId: 'primary-bath', name: 'Color Scheme', order: 4,
    images: generateBoardImages('ba', 4, [
      { alt: 'All white bathroom', tags: ['white', 'clean', 'bright', 'timeless'] },
      { alt: 'Navy and white bathroom', tags: ['navy', 'white', 'nautical', 'sophisticated'] },
      { alt: 'Warm gray bathroom', tags: ['gray', 'warm', 'neutral', 'contemporary'] },
      { alt: 'Black and gold bathroom', tags: ['black', 'gold', 'dramatic', 'luxurious'] },
      { alt: 'Soft blue bathroom', tags: ['blue', 'soft', 'calming', 'serene'] },
      { alt: 'Earth tone bathroom', tags: ['earth-tones', 'natural', 'warm', 'organic'] }
    ])
  },
  {
    id: 'bathroom-5', spaceId: 'primary-bath', name: 'Layout Preferences', order: 5,
    images: generateBoardImages('ba', 5, [
      { alt: 'Master suite layout', tags: ['master-suite', 'connected', 'private', 'luxurious'] },
      { alt: 'Compact efficient layout', tags: ['compact', 'efficient', 'smart', 'functional'] },
      { alt: 'Separate tub and shower', tags: ['separate', 'tub-shower', 'spacious', 'versatile'] },
      { alt: 'Open concept bathroom', tags: ['open-concept', 'flowing', 'modern', 'spacious'] },
      { alt: 'Traditional compartments', tags: ['compartments', 'traditional', 'private', 'organized'] },
      { alt: 'Wet room design', tags: ['wet-room', 'European', 'seamless', 'modern'] }
    ])
  },

  // Exterior boards
  {
    id: 'exterior-1', spaceId: 'exterior', name: 'Architectural Style', order: 1,
    images: generateBoardImages('e', 1, [
      { alt: 'Modern minimalist exterior', tags: ['modern', 'minimalist', 'clean-lines', 'glass'] },
      { alt: 'Traditional colonial exterior', tags: ['traditional', 'colonial', 'brick', 'classic'] },
      { alt: 'Contemporary geometric exterior', tags: ['contemporary', 'geometric', 'bold', 'striking'] },
      { alt: 'Craftsman style exterior', tags: ['craftsman', 'detailed', 'warm', 'inviting'] },
      { alt: 'Rustic farmhouse exterior', tags: ['rustic', 'farmhouse', 'wood', 'natural'] },
      { alt: 'Mediterranean villa exterior', tags: ['mediterranean', 'villa', 'stucco', 'elegant'] }
    ])
  },
  {
    id: 'exterior-2', spaceId: 'exterior', name: 'Color & Materials', order: 2,
    images: generateBoardImages('e', 2, [
      { alt: 'Natural stone facade', tags: ['stone', 'natural', 'durable', 'timeless'] },
      { alt: 'White brick exterior', tags: ['brick', 'white', 'clean', 'classic'] },
      { alt: 'Dark wood siding', tags: ['wood', 'dark', 'modern', 'sophisticated'] },
      { alt: 'Stucco and tile', tags: ['stucco', 'tile', 'mediterranean', 'warm'] },
      { alt: 'Metal and glass', tags: ['metal', 'glass', 'industrial', 'contemporary'] },
      { alt: 'Mixed material facade', tags: ['mixed-materials', 'varied', 'interesting', 'dynamic'] }
    ])
  },
  {
    id: 'exterior-3', spaceId: 'exterior', name: 'Landscaping & Entry', order: 3,
    images: generateBoardImages('e', 3, [
      { alt: 'Grand front entrance', tags: ['grand', 'entrance', 'impressive', 'welcoming'] },
      { alt: 'Modern minimal landscaping', tags: ['modern', 'minimal', 'clean', 'geometric'] },
      { alt: 'Lush garden entrance', tags: ['lush', 'garden', 'natural', 'abundant'] },
      { alt: 'Desert landscape design', tags: ['desert', 'drought-resistant', 'sculptural', 'unique'] },
      { alt: 'Traditional formal gardens', tags: ['traditional', 'formal', 'manicured', 'elegant'] },
      { alt: 'Casual cottage garden', tags: ['cottage', 'casual', 'charming', 'relaxed'] }
    ])
  },
  {
    id: 'exterior-4', spaceId: 'exterior', name: 'Lighting & Accents', order: 4,
    images: generateBoardImages('e', 4, [
      { alt: 'Modern exterior lighting', tags: ['modern', 'lighting', 'sleek', 'architectural'] },
      { alt: 'Traditional lantern lighting', tags: ['traditional', 'lanterns', 'classic', 'warm'] },
      { alt: 'Landscape accent lighting', tags: ['landscape', 'accent', 'dramatic', 'highlighting'] },
      { alt: 'Porch and entry lighting', tags: ['porch', 'entry', 'welcoming', 'functional'] },
      { alt: 'Security lighting design', tags: ['security', 'safety', 'practical', 'bright'] },
      { alt: 'Decorative string lights', tags: ['decorative', 'string-lights', 'festive', 'cozy'] }
    ])
  },
  {
    id: 'exterior-5', spaceId: 'exterior', name: 'Overall Curb Appeal', order: 5,
    images: generateBoardImages('e', 5, [
      { alt: 'Stunning curb appeal', tags: ['stunning', 'impressive', 'eye-catching', 'beautiful'] },
      { alt: 'Welcoming front yard', tags: ['welcoming', 'friendly', 'approachable', 'inviting'] },
      { alt: 'Elegant sophisticated exterior', tags: ['elegant', 'sophisticated', 'refined', 'upscale'] },
      { alt: 'Charming cottage style', tags: ['charming', 'cottage', 'quaint', 'cozy'] },
      { alt: 'Bold modern statement', tags: ['bold', 'modern', 'statement', 'striking'] },
      { alt: 'Classic timeless appeal', tags: ['classic', 'timeless', 'enduring', 'traditional'] }
    ])
  },

  // Primary Closet boards
  {
    id: 'closet-1', spaceId: 'primary-closet', name: 'Organization Style', order: 1,
    images: generateBoardImages('c', 1, [
      { alt: 'Walk-in closet luxury', tags: ['walk-in', 'luxury', 'spacious', 'organized'] },
      { alt: 'Boutique-style display', tags: ['boutique', 'display', 'elegant', 'glamorous'] },
      { alt: 'Modern minimal organization', tags: ['modern', 'minimal', 'clean', 'efficient'] },
      { alt: 'Traditional built-ins', tags: ['traditional', 'built-ins', 'wood', 'classic'] },
      { alt: 'Industrial pipe system', tags: ['industrial', 'pipe', 'exposed', 'urban'] },
      { alt: 'Custom modular system', tags: ['custom', 'modular', 'flexible', 'adaptable'] }
    ])
  },
  {
    id: 'closet-2', spaceId: 'primary-closet', name: 'Storage Solutions', order: 2,
    images: generateBoardImages('c', 2, [
      { alt: 'Built-in drawers', tags: ['built-in', 'drawers', 'organized', 'concealed'] },
      { alt: 'Open shelving system', tags: ['open', 'shelving', 'accessible', 'display'] },
      { alt: 'Hanging rod systems', tags: ['hanging', 'rods', 'efficient', 'space-saving'] },
      { alt: 'Shoe storage solutions', tags: ['shoe-storage', 'specialized', 'organized', 'accessible'] },
      { alt: 'Accessory organization', tags: ['accessories', 'jewelry', 'organized', 'visible'] },
      { alt: 'Multi-level hanging', tags: ['multi-level', 'maximized', 'efficient', 'smart'] }
    ])
  },
  {
    id: 'closet-3', spaceId: 'primary-closet', name: 'Finishes & Hardware', order: 3,
    images: generateBoardImages('c', 3, [
      { alt: 'White painted finish', tags: ['white', 'painted', 'clean', 'bright'] },
      { alt: 'Natural wood finish', tags: ['wood', 'natural', 'warm', 'organic'] },
      { alt: 'Dark espresso finish', tags: ['dark', 'espresso', 'sophisticated', 'elegant'] },
      { alt: 'Chrome and glass', tags: ['chrome', 'glass', 'modern', 'sleek'] },
      { alt: 'Brass and leather', tags: ['brass', 'leather', 'luxurious', 'rich'] },
      { alt: 'Matte black hardware', tags: ['black', 'matte', 'contemporary', 'bold'] }
    ])
  },
  {
    id: 'closet-4', spaceId: 'primary-closet', name: 'Layout & Flow', order: 4,
    images: generateBoardImages('c', 4, [
      { alt: 'L-shaped closet layout', tags: ['l-shaped', 'corner', 'efficient', 'spacious'] },
      { alt: 'Straight wall closet', tags: ['straight', 'wall', 'simple', 'functional'] },
      { alt: 'Island closet design', tags: ['island', 'central', 'luxury', 'abundant-storage'] },
      { alt: 'Galley closet layout', tags: ['galley', 'narrow', 'efficient', 'organized'] },
      { alt: 'Corner closet solution', tags: ['corner', 'space-saving', 'clever', 'compact'] },
      { alt: 'Room-sized closet', tags: ['room-sized', 'spacious', 'luxury', 'abundant'] }
    ])
  },
  {
    id: 'closet-5', spaceId: 'primary-closet', name: 'Lighting & Display', order: 5,
    images: generateBoardImages('c', 5, [
      { alt: 'LED strip lighting', tags: ['led', 'strip', 'even', 'modern'] },
      { alt: 'Pendant closet lighting', tags: ['pendant', 'stylish', 'decorative', 'focused'] },
      { alt: 'Recessed ceiling lights', tags: ['recessed', 'ceiling', 'clean', 'bright'] },
      { alt: 'Display case lighting', tags: ['display', 'showcase', 'luxury', 'boutique'] },
      { alt: 'Natural window light', tags: ['natural', 'window', 'bright', 'airy'] },
      { alt: 'Motion sensor lighting', tags: ['motion', 'sensor', 'convenient', 'automatic'] }
    ])
  },

  // Living Room boards
  {
    id: 'living-1', spaceId: 'living-room', name: 'Overall Atmosphere', order: 1,
    images: generateBoardImages('l', 1, [
      { alt: 'Cozy comfortable living', tags: ['cozy', 'comfortable', 'inviting', 'warm'] },
      { alt: 'Elegant formal living', tags: ['elegant', 'formal', 'sophisticated', 'refined'] },
      { alt: 'Modern minimal living', tags: ['modern', 'minimal', 'clean', 'sleek'] },
      { alt: 'Rustic casual living', tags: ['rustic', 'casual', 'relaxed', 'natural'] },
      { alt: 'Eclectic bohemian living', tags: ['eclectic', 'bohemian', 'colorful', 'artistic'] },
      { alt: 'Traditional classic living', tags: ['traditional', 'classic', 'timeless', 'established'] }
    ])
  },
  {
    id: 'living-2', spaceId: 'living-room', name: 'Furniture Style', order: 2,
    images: generateBoardImages('l', 2, [
      { alt: 'Sectional sofa layout', tags: ['sectional', 'spacious', 'family-friendly', 'comfortable'] },
      { alt: 'Mid-century modern furniture', tags: ['mid-century', 'modern', 'iconic', 'stylish'] },
      { alt: 'Traditional furniture set', tags: ['traditional', 'matched', 'formal', 'classic'] },
      { alt: 'Contemporary modular', tags: ['contemporary', 'modular', 'flexible', 'modern'] },
      { alt: 'Vintage eclectic mix', tags: ['vintage', 'eclectic', 'unique', 'personal'] },
      { alt: 'Minimalist furniture', tags: ['minimalist', 'simple', 'functional', 'clean'] }
    ])
  },
  {
    id: 'living-3', spaceId: 'living-room', name: 'Color Palette', order: 3,
    images: generateBoardImages('l', 3, [
      { alt: 'Neutral warm palette', tags: ['neutral', 'warm', 'beige', 'comfortable'] },
      { alt: 'Bold jewel tones', tags: ['bold', 'jewel-tones', 'rich', 'dramatic'] },
      { alt: 'Monochromatic scheme', tags: ['monochromatic', 'cohesive', 'sophisticated', 'calm'] },
      { alt: 'Earth tone palette', tags: ['earth-tones', 'natural', 'grounding', 'organic'] },
      { alt: 'Cool blue and gray', tags: ['cool', 'blue', 'gray', 'calming'] },
      { alt: 'Black and white contrast', tags: ['black', 'white', 'contrast', 'striking'] }
    ])
  },
  {
    id: 'living-4', spaceId: 'living-room', name: 'Textiles & Patterns', order: 4,
    images: generateBoardImages('l', 4, [
      { alt: 'Luxurious velvet textures', tags: ['velvet', 'luxurious', 'rich', 'elegant'] },
      { alt: 'Natural linen fabrics', tags: ['linen', 'natural', 'relaxed', 'casual'] },
      { alt: 'Geometric patterns', tags: ['geometric', 'patterns', 'modern', 'structured'] },
      { alt: 'Floral and botanical', tags: ['floral', 'botanical', 'natural', 'traditional'] },
      { alt: 'Solid color blocking', tags: ['solid', 'color-blocking', 'bold', 'modern'] },
      { alt: 'Mixed pattern layering', tags: ['mixed', 'patterns', 'layered', 'eclectic'] }
    ])
  },
  {
    id: 'living-5', spaceId: 'living-room', name: 'Layout & Function', order: 5,
    images: generateBoardImages('l', 5, [
      { alt: 'Conversation seating layout', tags: ['conversation', 'seating', 'social', 'intimate'] },
      { alt: 'Media room setup', tags: ['media', 'tv', 'entertainment', 'comfortable'] },
      { alt: 'Open floor plan', tags: ['open', 'floor-plan', 'flowing', 'spacious'] },
      { alt: 'Reading nook corner', tags: ['reading', 'nook', 'cozy', 'quiet'] },
      { alt: 'Multi-functional space', tags: ['multi-functional', 'flexible', 'adaptable', 'practical'] },
      { alt: 'Formal reception area', tags: ['formal', 'reception', 'elegant', 'impressive'] }
    ])
  },

  // Dining Room boards
  {
    id: 'dining-1', spaceId: 'dining-room', name: 'Dining Style', order: 1,
    images: generateBoardImages('d', 1, [
      { alt: 'Formal elegant dining', tags: ['formal', 'elegant', 'sophisticated', 'entertaining'] },
      { alt: 'Casual family dining', tags: ['casual', 'family', 'comfortable', 'everyday'] },
      { alt: 'Modern minimalist dining', tags: ['modern', 'minimalist', 'clean', 'simple'] },
      { alt: 'Rustic farmhouse dining', tags: ['rustic', 'farmhouse', 'warm', 'welcoming'] },
      { alt: 'Contemporary chic dining', tags: ['contemporary', 'chic', 'stylish', 'trendy'] },
      { alt: 'Traditional classic dining', tags: ['traditional', 'classic', 'timeless', 'established'] }
    ])
  },
  {
    id: 'dining-2', spaceId: 'dining-room', name: 'Table & Seating', order: 2,
    images: generateBoardImages('d', 2, [
      { alt: 'Large dining table', tags: ['large', 'table', 'entertaining', 'spacious'] },
      { alt: 'Round pedestal table', tags: ['round', 'pedestal', 'intimate', 'classic'] },
      { alt: 'Extendable dining table', tags: ['extendable', 'flexible', 'practical', 'adaptable'] },
      { alt: 'Bench seating style', tags: ['bench', 'seating', 'casual', 'space-saving'] },
      { alt: 'Upholstered dining chairs', tags: ['upholstered', 'chairs', 'comfortable', 'elegant'] },
      { alt: 'Mixed seating arrangement', tags: ['mixed', 'seating', 'eclectic', 'interesting'] }
    ])
  },
  {
    id: 'dining-3', spaceId: 'dining-room', name: 'Lighting Design', order: 3,
    images: generateBoardImages('d', 3, [
      { alt: 'Chandelier centerpiece', tags: ['chandelier', 'centerpiece', 'elegant', 'dramatic'] },
      { alt: 'Modern pendant lights', tags: ['pendant', 'modern', 'stylish', 'focused'] },
      { alt: 'Candle and ambient lighting', tags: ['candle', 'ambient', 'romantic', 'warm'] },
      { alt: 'Track lighting system', tags: ['track', 'flexible', 'adjustable', 'contemporary'] },
      { alt: 'Wall sconce lighting', tags: ['sconce', 'wall', 'atmospheric', 'elegant'] },
      { alt: 'Natural daylight dining', tags: ['natural', 'daylight', 'bright', 'airy'] }
    ])
  },
  {
    id: 'dining-4', spaceId: 'dining-room', name: 'Color & Decor', order: 4,
    images: generateBoardImages('d', 4, [
      { alt: 'Rich deep colors', tags: ['rich', 'deep', 'dramatic', 'cozy'] },
      { alt: 'Light airy colors', tags: ['light', 'airy', 'bright', 'fresh'] },
      { alt: 'Neutral sophisticated palette', tags: ['neutral', 'sophisticated', 'elegant', 'timeless'] },
      { alt: 'Bold accent wall', tags: ['bold', 'accent', 'wall', 'statement'] },
      { alt: 'Natural wood tones', tags: ['wood', 'natural', 'warm', 'organic'] },
      { alt: 'Metallic accents', tags: ['metallic', 'accents', 'glamorous', 'luxurious'] }
    ])
  },
  {
    id: 'dining-5', spaceId: 'dining-room', name: 'Entertainment Features', order: 5,
    images: generateBoardImages('d', 5, [
      { alt: 'Built-in bar area', tags: ['bar', 'built-in', 'entertaining', 'sophisticated'] },
      { alt: 'China display cabinet', tags: ['china', 'display', 'cabinet', 'traditional'] },
      { alt: 'Buffet serving area', tags: ['buffet', 'serving', 'practical', 'functional'] },
      { alt: 'Wine storage display', tags: ['wine', 'storage', 'display', 'elegant'] },
      { alt: 'Open to kitchen', tags: ['open', 'kitchen', 'connected', 'flowing'] },
      { alt: 'Separate formal room', tags: ['separate', 'formal', 'private', 'intimate'] }
    ])
  }
];

export const LIFESTYLE_OPTIONS = {
  budgetRange: [
    '$50,000 - $75,000',
    '$75,000 - $100,000', 
    '$100,000 - $150,000',
    '$150,000 - $200,000',
    '$200,000+'
  ],
  appliancePreferences: [
    'High-end integrated appliances',
    'Professional-grade cooking equipment',
    'Energy-efficient appliances',
    'Smart home integration',
    'Vintage or retro styling'
  ],
  familyLifestyle: [
    'Young family with children',
    'Empty nesters',
    'Frequent entertainers',
    'Multi-generational living',
    'Pet-friendly design',
    'Aging in place considerations'
  ],
  styleIndicators: [
    'Travel and global influences',
    'Art and gallery collections',
    'Music and entertainment focus',
    'Wellness and spa experiences',
    'Outdoor living and nature',
    'Technology and innovation'
  ]
};

export const MOCK_DOSSIER_SECTIONS = [
  {
    id: '1',
    title: 'Project Overview',
    content: 'Based on your selections, we see a preference for modern, clean-lined design with warm, natural elements. Your style leans toward contemporary sophistication with touches of organic texture and carefully curated color palettes.',
    order: 1,
    type: 'summary' as const
  },
  {
    id: '2', 
    title: 'Style Summary',
    content: 'Your design aesthetic combines contemporary minimalism with warm, inviting elements. Key themes include clean architectural lines, natural materials like wood and stone, and a sophisticated neutral palette with selective use of color.',
    order: 2,
    type: 'style' as const
  },
  {
    id: '3',
    title: 'Most Selected Tags',
    content: 'Modern, Clean Lines, Natural Materials, Neutral Colors, Warm Wood Tones, Minimalist, Sophisticated, Comfortable, Quality Craftsmanship, Timeless Design',
    order: 3,
    type: 'tags' as const
  },
  {
    id: '4',
    title: 'Kitchen Preferences', 
    content: 'You gravitate toward kitchens that balance functionality with aesthetic appeal. Clean, uncluttered surfaces, quality materials, and thoughtful storage solutions are priorities. You appreciate the warmth of natural wood against contemporary finishes.',
    order: 4,
    type: 'space' as const
  },
  {
    id: '5',
    title: 'Bedroom Preferences',
    content: 'Your ideal bedroom is a serene retreat that feels both luxurious and comfortable. You prefer calming color palettes, quality textiles, and furniture with clean but not stark lines. Natural light and uncluttered spaces are important.',
    order: 5,
    type: 'space' as const
  }
];