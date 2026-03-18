import "dotenv/config";
import { PrismaClient } from "./generated/client";

const prisma = new PrismaClient();

const products = [
  // --- Men's Shirts ---
  { name: "Classic White Oxford Shirt", slug: "classic-white-oxford-shirt", description: "A timeless white oxford shirt crafted from premium cotton. Features a button-down collar and a relaxed fit perfect for both office and casual settings.", price: 1999, compareAtPrice: 2499, section: "Men", category: "Shirts", image: [], quantity: 45 },
  { name: "Navy Blue Linen Shirt", slug: "navy-blue-linen-shirt", description: "Lightweight linen shirt in deep navy. Breathable fabric ideal for warm weather with a modern slim fit.", price: 2299, compareAtPrice: null, section: "Men", category: "Shirts", image: [], quantity: 30 },
  { name: "Charcoal Flannel Shirt", slug: "charcoal-flannel-shirt", description: "Soft brushed flannel shirt in charcoal grey. Perfect layering piece for cooler days with a comfortable regular fit.", price: 1799, compareAtPrice: 2199, section: "Men", category: "Shirts", image: [], quantity: 22 },
  { name: "Sky Blue Casual Shirt", slug: "sky-blue-casual-shirt", description: "Easy-going cotton shirt in a refreshing sky blue. Ideal for weekend outings with roll-up sleeve tabs.", price: 1499, compareAtPrice: null, section: "Men", category: "Shirts", image: [], quantity: 60 },
  { name: "Black Slim Fit Formal Shirt", slug: "black-slim-fit-formal-shirt", description: "Sharp black formal shirt with a tailored slim fit. Wrinkle-resistant fabric keeps you looking polished all day.", price: 2599, compareAtPrice: 3199, section: "Men", category: "Shirts", image: [], quantity: 18 },

  // --- Men's Trousers ---
  { name: "Khaki Chino Trousers", slug: "khaki-chino-trousers", description: "Versatile khaki chinos made from stretch cotton twill. Features a tapered leg and comfortable mid-rise waist.", price: 1899, compareAtPrice: null, section: "Men", category: "Trousers", image: [], quantity: 40 },
  { name: "Dark Wash Slim Jeans", slug: "dark-wash-slim-jeans", description: "Classic dark indigo jeans with a slim fit silhouette. Premium denim with just the right amount of stretch for all-day comfort.", price: 2499, compareAtPrice: 2999, section: "Men", category: "Trousers", image: [], quantity: 35 },
  { name: "Grey Formal Trousers", slug: "grey-formal-trousers", description: "Tailored grey formal trousers with a flat front design. Crafted from lightweight wool blend for a sharp office look.", price: 2799, compareAtPrice: null, section: "Men", category: "Trousers", image: [], quantity: 25 },
  { name: "Olive Cargo Pants", slug: "olive-cargo-pants", description: "Rugged olive cargo pants with multiple utility pockets. Relaxed fit with an adjustable drawstring hem.", price: 2199, compareAtPrice: 2699, section: "Men", category: "Trousers", image: [], quantity: 28 },
  { name: "Beige Linen Trousers", slug: "beige-linen-trousers", description: "Breezy beige linen trousers perfect for summer. Elastic waistband with a laid-back wide leg cut.", price: 1699, compareAtPrice: null, section: "Men", category: "Trousers", image: [], quantity: 50 },

  // --- Women's Tops ---
  { name: "White Ruffle Blouse", slug: "white-ruffle-blouse", description: "Elegant white blouse with delicate ruffle detailing along the neckline. Lightweight georgette fabric with a flowy silhouette.", price: 1799, compareAtPrice: 2299, section: "Women", category: "Tops", image: [], quantity: 32 },
  { name: "Emerald Satin Camisole", slug: "emerald-satin-camisole", description: "Luxurious emerald green satin camisole with adjustable spaghetti straps. Perfect for layering or wearing solo on a night out.", price: 1299, compareAtPrice: null, section: "Women", category: "Tops", image: [], quantity: 44 },
  { name: "Striped Breton Top", slug: "striped-breton-top", description: "Classic navy and white striped Breton top in soft jersey cotton. Boat neckline with three-quarter sleeves.", price: 999, compareAtPrice: 1399, section: "Women", category: "Tops", image: [], quantity: 70 },
  { name: "Dusty Rose Knit Sweater", slug: "dusty-rose-knit-sweater", description: "Cozy ribbed knit sweater in a soft dusty rose shade. Features dropped shoulders and a slightly oversized fit.", price: 2499, compareAtPrice: null, section: "Women", category: "Tops", image: [], quantity: 20 },
  { name: "Black Peplum Top", slug: "black-peplum-top", description: "Structured black peplum top with a flattering waist-cinching design. Made from a stretch crepe fabric.", price: 1599, compareAtPrice: 1999, section: "Women", category: "Tops", image: [], quantity: 38 },

  // --- Women's Dresses ---
  { name: "Floral Midi Wrap Dress", slug: "floral-midi-wrap-dress", description: "Stunning floral print wrap dress in warm tones. Falls to mid-calf with a flattering V-neckline and tie waist.", price: 3499, compareAtPrice: 4299, section: "Women", category: "Dresses", image: [], quantity: 15 },
  { name: "Little Black Bodycon Dress", slug: "little-black-bodycon-dress", description: "The essential little black dress with a body-hugging fit. Stretch jersey fabric with a square neckline.", price: 2199, compareAtPrice: null, section: "Women", category: "Dresses", image: [], quantity: 27 },
  { name: "Ivory Lace Maxi Dress", slug: "ivory-lace-maxi-dress", description: "Romantic ivory maxi dress with intricate lace overlay. Features a fitted bodice and flowing skirt.", price: 4999, compareAtPrice: 5999, section: "Women", category: "Dresses", image: [], quantity: 10 },
  { name: "Denim Shirt Dress", slug: "denim-shirt-dress", description: "Casual denim shirt dress with a relaxed fit. Button-front closure with a detachable belt.", price: 2799, compareAtPrice: null, section: "Women", category: "Dresses", image: [], quantity: 33 },
  { name: "Rust Pleated Midi Dress", slug: "rust-pleated-midi-dress", description: "Elegant pleated midi dress in a rich rust tone. Satin finish fabric with a high neckline and short sleeves.", price: 3199, compareAtPrice: 3799, section: "Women", category: "Dresses", image: [], quantity: 19 },

  // --- Accessories ---
  { name: "Leather Crossbody Bag", slug: "leather-crossbody-bag", description: "Compact genuine leather crossbody bag in tan. Features an adjustable strap, zip closure, and multiple inner compartments.", price: 3999, compareAtPrice: 4999, section: "Accessories", category: "Bags", image: [], quantity: 20 },
  { name: "Canvas Tote Bag", slug: "canvas-tote-bag", description: "Spacious canvas tote bag in natural with contrasting leather handles. Perfect for daily errands or a day at the beach.", price: 1299, compareAtPrice: null, section: "Accessories", category: "Bags", image: [], quantity: 55 },
  { name: "Classic Aviator Sunglasses", slug: "classic-aviator-sunglasses", description: "Timeless aviator sunglasses with gold metal frames and gradient green lenses. UV400 protection.", price: 2499, compareAtPrice: 2999, section: "Accessories", category: "Sunglasses", image: [], quantity: 40 },
  { name: "Wool Blend Scarf", slug: "wool-blend-scarf", description: "Soft wool blend scarf in a classic herringbone pattern. Generous size for draping or wrapping.", price: 1499, compareAtPrice: null, section: "Accessories", category: "Scarves", image: [], quantity: 65 },
  { name: "Minimalist Leather Watch", slug: "minimalist-leather-watch", description: "Clean minimalist watch with a white dial and genuine leather strap in dark brown. Japanese quartz movement.", price: 4499, compareAtPrice: 5499, section: "Accessories", category: "Watches", image: [], quantity: 12 },

  // --- Footwear ---
  { name: "White Canvas Sneakers", slug: "white-canvas-sneakers", description: "Clean white canvas sneakers with a vulcanized rubber sole. A wardrobe essential that pairs with everything.", price: 2999, compareAtPrice: 3499, section: "Footwear", category: "Sneakers", image: [], quantity: 48 },
  { name: "Tan Suede Chelsea Boots", slug: "tan-suede-chelsea-boots", description: "Classic Chelsea boots in rich tan suede with elastic side panels. Features a durable rubber sole with a slight heel.", price: 5499, compareAtPrice: 6499, section: "Footwear", category: "Boots", image: [], quantity: 14 },
  { name: "Black Leather Loafers", slug: "black-leather-loafers", description: "Polished black leather loafers with a comfortable cushioned insole. Versatile enough for both formal and smart-casual outfits.", price: 3799, compareAtPrice: null, section: "Footwear", category: "Formal", image: [], quantity: 22 },
  { name: "Strappy Block Heel Sandals", slug: "strappy-block-heel-sandals", description: "Elegant strappy sandals with a comfortable block heel in blush pink. Padded footbed for all-day wear.", price: 2299, compareAtPrice: 2799, section: "Footwear", category: "Sandals", image: [], quantity: 30 },
  { name: "Grey Knit Running Shoes", slug: "grey-knit-running-shoes", description: "Lightweight knit running shoes in heather grey with a responsive foam midsole. Breathable upper for maximum comfort.", price: 4299, compareAtPrice: 4999, section: "Footwear", category: "Sneakers", image: [], quantity: 36 },
];

async function main() {
  console.log("Seeding 30 products...");

  await prisma.products.createMany({
    data: products,
  });

  console.log("Done! 30 products inserted.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
