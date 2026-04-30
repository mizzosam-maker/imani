const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

// Define the Product schema directly in the seed script to avoid import issues
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  images: [String],
  variants: [String],
  stock: { type: Number, default: 10 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

// Create the model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const productsData = [
  // Home Decor
  { name: "Wabi Style Decor Vases (Large)", category: "Home Decor", price: 3300, stock: 10, variants: ["Large"], images: ["/images/vase-large.jpg"], featured: true },
  { name: "Wabi Style Decor Vases (Medium)", category: "Home Decor", price: 2900, stock: 10, variants: ["Medium"], images: ["/images/vase-medium.jpg"], featured: true },
  { name: "Wabi Style Decor Vases (Small)", category: "Home Decor", price: 2600, stock: 10, variants: ["Small"], images: ["/images/vase-small.jpg"] },
  { name: "Retro Decor Clock", category: "Home Decor", price: 1600, stock: 8, variants: ["Vintage style"], images: ["/images/retro-clock.jpg"] },
  { name: "Donut Glass Lamp", category: "Home Decor", price: 5000, stock: 5, variants: ["Diameter 30cm"], images: ["/images/donut-lamp.jpg"], featured: true },
  { name: "Christmas Throw Pillow Covers", category: "Home Decor", price: 800, stock: 20, variants: ["45cm × 45cm"], images: ["/images/pillow-covers.jpg"] },
  { name: "Pampas Grass", category: "Home Decor", price: 1500, stock: 15, variants: ["Pack of 40 stems"], images: ["/images/pampas.jpg"], featured: true },
  { name: "Artificial Real Touch Roses", category: "Home Decor", price: 850, stock: 25, variants: ["10 stems"], images: ["/images/roses.jpg"] },
  { name: "Baby Breath Flowers", category: "Home Decor", price: 1500, stock: 12, variants: ["10 stems"], images: ["/images/baby-breath.jpg"] },
  { name: "Candle Warmer (Amber Glass)", category: "Home Decor", price: 3000, stock: 7, variants: ["Candle warming lamp"], images: ["/images/candle-warmer.jpg"] },
  { name: "Modern Flower Vase", category: "Home Decor", price: 2200, stock: 8, images: ["/images/modern-vase.jpg"] },
  { name: "Scented Candles", category: "Home Decor", price: 1200, stock: 30, variants: ["230g, multiple scents"], images: ["/images/candles.jpg"] },
  { name: "Retro Flip Clock", category: "Home Decor", price: 4500, stock: 4, variants: ["Battery powered"], images: ["/images/flip-clock.jpg"] },
  { name: "Aroma Diffuser", category: "Home Decor", price: 1300, stock: 10, variants: ["220ml"], images: ["/images/diffuser.jpg"] },
  { name: "Tulips", category: "Home Decor", price: 850, stock: 20, variants: ["10 stems"], images: ["/images/tulips.jpg"] },
  { name: "White Ribbed Flower Vase", category: "Home Decor", price: 1600, stock: 8, images: ["/images/ribbed-vase-white.jpg"] },
  { name: "Clear Ribbed Vase (Flat Base)", category: "Home Decor", price: 2000, stock: 8, images: ["/images/ribbed-vase-clear.jpg"] },
  { name: "Claire Candle Warmer", category: "Home Decor", price: 2800, stock: 6, variants: ["Black, Gold, White"], images: ["/images/claire-warmer.jpg"] },
  { name: "Artificial Calla Lily", category: "Home Decor", price: 200, stock: 50, variants: ["Per stem"], images: ["/images/calla-lily.jpg"] },
  { name: "Eucalyptus", category: "Home Decor", price: 400, stock: 30, variants: ["10 stems per bunch"], images: ["/images/eucalyptus.jpg"] },
  { name: "Clear Ribbed Flower Vase", category: "Home Decor", price: 1400, stock: 10, images: ["/images/ribbed-vase-clear-small.jpg"] },
  { name: "Flower Vase", category: "Home Decor", price: 2500, stock: 7, images: ["/images/flower-vase.jpg"] },
  { name: "Artificial Traveler Palm Tree", category: "Home Decor", price: 4950, stock: 3, variants: ["120cm / 160cm"], images: ["/images/palm-tree.jpg"] },

  // Kitchen
  { name: "SMEG Knife Block", category: "Kitchen", price: 8000, stock: 5, variants: ["Knife storage block"], images: ["/images/smeg-knife.jpg"], featured: true },
  { name: "Baking Tray Set (4pcs)", category: "Kitchen", price: 3500, stock: 8, variants: ["Baking trays"], images: ["/images/baking-tray.jpg"] },
  { name: "Cast Iron Cooking Pots Set (11pcs)", category: "Kitchen", price: 20000, stock: 2, variants: ["Color: Teal"], images: ["/images/cast-iron.jpg"], featured: true },
  { name: "Herb Saver", category: "Kitchen", price: 450, stock: 15, images: ["/images/herb-saver.jpg"] },
  { name: "Sink Organizer", category: "Kitchen", price: 750, stock: 20, variants: ["Rust resistant"], images: ["/images/sink-organizer.jpg"] },
  { name: "Lunchbox", category: "Kitchen", price: 850, stock: 25, variants: ["3 compartments, Pink & Blue"], images: ["/images/lunchbox.jpg"] },
  { name: "Dishrack", category: "Kitchen", price: 3300, stock: 7, variants: ["Black, rust resistant"], images: ["/images/dishrack.jpg"] },
  { name: "High Borosilicate Kettle", category: "Kitchen", price: 800, stock: 12, variants: ["Capacity 1000ml"], images: ["/images/kettle.jpg"] },
  { name: "Straw Cleaning Brush Set (10pc)", category: "Kitchen Accessories", price: 0, stock: 30, variants: ["Colors: Black, White"], images: ["/images/brush-set.jpg"] },
  { name: "Enamel Cast Iron Cooking Set", category: "Kitchen", price: 23000, stock: 2, variants: ["Multi-size cookware set"], images: ["/images/enamel-set.jpg"], featured: true },
  { name: "Mr. Steel Kitchen Container", category: "Kitchen", price: 3000, stock: 8, variants: ["3L"], images: ["/images/steel-container.jpg"] },
  { name: "Silicone Ice Cube Tray", category: "Kitchen", price: 450, stock: 30, variants: ["Honeycomb design"], images: ["/images/ice-tray.jpg"] },
  { name: "RAF Sandwich Toaster", category: "Kitchen Appliance", price: 1800, stock: 6, images: ["/images/sandwich-toaster.jpg"] },
  { name: "Heavy Duty Kitchen Rack", category: "Kitchen", price: 7000, stock: 3, variants: ["Black"], images: ["/images/kitchen-rack.jpg"] },
  { name: "Veggie Slicer", category: "Kitchen Tools", price: 1300, stock: 10, images: ["/images/veggie-slicer.jpg"] },
  { name: "16pc Veggie Slicer Set", category: "Kitchen Tools", price: 1300, stock: 8, images: ["/images/veggie-slicer-set.jpg"] },
  { name: "Electric Wine Opener Set", category: "Kitchen Accessories", price: 1800, stock: 5, variants: ["4-in-1 set"], images: ["/images/wine-opener.jpg"] },
  { name: "Oil Filter Set", category: "Kitchen", price: 1200, stock: 8, variants: ["1.4L / 1.7L"], images: ["/images/oil-filter.jpg"] },
  { name: "Under Cabinet Paper Holder", category: "Kitchen", price: 850, stock: 12, variants: ["Black/Silver"], images: ["/images/paper-holder.jpg"] },
  { name: "Wrought Iron Fruit Basket", category: "Kitchen", price: 900, stock: 15, images: ["/images/fruit-basket.jpg"] },
  { name: "Soap Pump with Sponge", category: "Kitchen", price: 250, stock: 40, images: ["/images/soap-pump.jpg"] },
  { name: "Soap Dispenser with Sponge", category: "Kitchen", price: 250, stock: 40, images: ["/images/soap-dispenser.jpg"] },
  { name: "Sink Caddy with Draining Tray", category: "Kitchen", price: 800, stock: 15, images: ["/images/sink-caddy.jpg"] },

  // Kitchen Storage
  { name: "Alloy Canisters Set", category: "Kitchen Storage", price: 1500, stock: 10, variants: ["Square & Circular, Black & White"], images: ["/images/canisters.jpg"], featured: true },
  { name: "Storage Containers 10kg", category: "Kitchen Storage", price: 3500, stock: 6, variants: ["Food storage"], images: ["/images/container-10kg.jpg"] },
  { name: "Storage Containers 5kg", category: "Kitchen Storage", price: 2800, stock: 8, variants: ["Food storage"], images: ["/images/container-5kg.jpg"] },
  { name: "Spaghetti Cereal Jar", category: "Kitchen Storage", price: 900, stock: 12, images: ["/images/spaghetti-jar.jpg"] },
  { name: "Spaghetti Jar with Handle", category: "Kitchen Storage", price: 850, stock: 12, images: ["/images/spaghetti-jar-handle.jpg"] },
  { name: "Multifunctional Acrylic Organizer", category: "Kitchen Storage", price: 1300, stock: 8, images: ["/images/acrylic-organizer.jpg"] },
  { name: "Acrylic Jar", category: "Kitchen Storage", price: 750, stock: 15, variants: ["Capacity 1000ml"], images: ["/images/acrylic-jar.jpg"] },
  { name: "Airtight Acrylic Container Set", category: "Kitchen Storage", price: 2800, stock: 5, variants: ["7 piece set"], images: ["/images/acrylic-container-set.jpg"], featured: true },
  { name: "Airtight Cereal Container", category: "Kitchen Storage", price: 1200, stock: 10, variants: ["Capacity 2500ml"], images: ["/images/cereal-container.jpg"] },
  { name: "Airtight Cereal Container", category: "Kitchen Storage", price: 1400, stock: 10, variants: ["Capacity 2800ml"], images: ["/images/cereal-container-large.jpg"] },
  { name: "Leakproof Acrylic Pantry Jar", category: "Kitchen Storage", price: 1200, stock: 12, variants: ["Capacity 2.5L"], images: ["/images/pantry-jar.jpg"] },
  { name: "Glass Container Set", category: "Kitchen Storage", price: 2500, stock: 6, variants: ["4pc, bamboo lids"], images: ["/images/glass-container-set.jpg"] },
  { name: "Spice Jar Set", category: "Kitchen Storage", price: 2600, stock: 5, variants: ["12pc"], images: ["/images/spice-jar-set.jpg"] },
  { name: "Bamboo Cereal Dispenser", category: "Kitchen Storage", price: 1300, stock: 8, images: ["/images/cereal-dispenser.jpg"] },
  { name: "Acrylic Fridge Organizer", category: "Kitchen Storage", price: 900, stock: 15, variants: ["Clear/Green"], images: ["/images/fridge-organizer.jpg"] },
  { name: "Acrylic Teabag Organizer", category: "Kitchen Storage", price: 1300, stock: 10, variants: ["With compartments"], images: ["/images/teabag-organizer.jpg"] },

  // Drinkware
  { name: "Stanley Mug", category: "Drinkware", price: 2000, stock: 20, variants: ["Includes straw + leak stopper"], images: ["/images/stanley-mug.jpg"], featured: true },
  { name: "Stanley Leak Proof Lids", category: "Drinkware", price: 500, stock: 25, images: ["/images/stanley-lids.jpg"] },
  { name: "Double Wall Glass Mugs", category: "Drinkware", price: 500, stock: 30, variants: ["Capacity 350ml"], images: ["/images/double-wall-mug.jpg"] },
  { name: "Rotating Whiskey Glass", category: "Drinkware", price: 300, stock: 40, variants: ["Each glass"], images: ["/images/whiskey-glass.jpg"] },
  { name: "High Borosilicate Jug", category: "Drinkware", price: 1000, stock: 12, variants: ["Capacity 1.2L"], images: ["/images/borosilicate-jug.jpg"] },
  { name: "Acrylic Pitcher", category: "Drinkware", price: 0, stock: 10, variants: ["Capacity 1000ml"], images: ["/images/acrylic-pitcher.jpg"] },
  { name: "Nordic Flask", category: "Drinkware", price: 1500, stock: 8, variants: ["Capacity 1L"], images: ["/images/nordic-flask.jpg"] },
  { name: "Borosilicate Glass Mug", category: "Drinkware", price: 500, stock: 25, variants: ["Capacity 350ml"], images: ["/images/borosilicate-mug.jpg"] },
  { name: "Silicone Spill Proof Set (Stanley Mug)", category: "Drinkware Accessory", price: 200, stock: 30, images: ["/images/spill-proof.jpg"] },
  { name: "Double Wall Glass Mug", category: "Drinkware", price: 500, stock: 25, variants: ["Capacity 200ml"], images: ["/images/double-wall-small.jpg"] },
  { name: "Tall Stem Wine Glass", category: "Drinkware", price: 2500, stock: 10, variants: ["Pair"], images: ["/images/wine-glass.jpg"], featured: true },
  { name: "Long Stem Wine Glass", category: "Drinkware", price: 2500, stock: 10, variants: ["Pair"], images: ["/images/long-wine-glass.jpg"] },
  { name: "Boston Glass Shot Bottles Set", category: "Drinkware", price: 2000, stock: 5, variants: ["12 pack + funnel, brush, stickers"], images: ["/images/shot-bottles.jpg"] },
  { name: "Nordic Ribbed Mug", category: "Drinkware", price: 650, stock: 20, variants: ["Each"], images: ["/images/ribbed-mug.jpg"] },
  { name: "Bubble Glass", category: "Drinkware", price: 500, stock: 20, variants: ["Comes with straw"], images: ["/images/bubble-glass.jpg"] },
  { name: "Nordic Matte Mug Set", category: "Drinkware", price: 3000, stock: 5, variants: ["6pcs, 410ml"], images: ["/images/matte-mug-set.jpg"] },
  { name: "Vintage Coffee Mug Set", category: "Drinkware", price: 0, stock: 8, variants: ["Set of 4 + bamboo lids + spoons"], images: ["/images/vintage-mug-set.jpg"] },

  // Dining
  { name: "Table Mats (Set of 6)", category: "Dining", price: 2500, stock: 10, images: ["/images/table-mats-set.jpg"] },
  { name: "Table Mat (Single)", category: "Dining", price: 450, stock: 30, images: ["/images/table-mat.jpg"] },
  { name: "Stoneware Dinner Set (16pcs)", category: "Dining", price: 5000, stock: 4, variants: ["Black"], images: ["/images/dinner-set.jpg"], featured: true },
  { name: "Wooden Coasters", category: "Dining", price: 0, stock: 20, variants: ["Walnut / Leach wood"], images: ["/images/coasters.jpg"] },
  { name: "Cutlery Set", category: "Dining", price: 2000, stock: 8, variants: ["24 pieces"], images: ["/images/cutlery.jpg"] },
  { name: "Ceramic Dinner Plates", category: "Dining", price: 3000, stock: 6, variants: ["Set of 6 (10\")"], images: ["/images/ceramic-plates.jpg"] },

  // Shoes
  { name: "Ladies Heels", category: "Shoes", price: 2000, stock: 8, variants: ["Sizes 37 & 41"], images: ["/images/ladies-heels.jpg"] },
  { name: "Summer Sandals", category: "Shoes", price: 1300, stock: 15, variants: ["Various colors & sizes"], images: ["/images/sandals.jpg"] },
  { name: "Ballerina Flats", category: "Shoes", price: 0, stock: 10, images: ["/images/ballerina.jpg"] },
  { name: "Ladies Heel", category: "Shoes", price: 0, stock: 8, variants: ["Kitten heel (7cm) / Heel (9.5cm), Sizes 39–41"], images: ["/images/ladies-heel.jpg"] },
  { name: "Retro Sandals", category: "Shoes", price: 2200, stock: 6, variants: ["Color: Gold, Sizes 39–40"], images: ["/images/retro-sandals.jpg"], featured: true },
  { name: "Zara Sandals", category: "Shoes", price: 2000, stock: 5, variants: ["Sizes 36–37"], images: ["/images/zara-sandals.jpg"] },
  { name: "Dior Heels", category: "Shoes", price: 3000, stock: 4, images: ["/images/dior-heels.jpg"], featured: true },
  { name: "Ladies Kitten Heel", category: "Shoes", price: 2600, stock: 5, variants: ["Burgundy, Sizes 39 & 41"], images: ["/images/kitten-heel.jpg"] },
  { name: "Ladies Heel (Black)", category: "Shoes", price: 2600, stock: 5, variants: ["Size 39"], images: ["/images/black-heel.jpg"] },
  { name: "Braided Sandals", category: "Shoes", price: 1100, stock: 12, variants: ["Brown, White, Black"], images: ["/images/braided-sandals.jpg"] },
  { name: "Dior Slingback Heels", category: "Shoes", price: 3000, stock: 4, variants: ["Maroon, Sizes 39–40"], images: ["/images/dior-slingback.jpg"] },
  { name: "Dior Slingback Heels", category: "Shoes", price: 3000, stock: 4, variants: ["Nude, Sizes 37, 39, 40"], images: ["/images/dior-slingback-nude.jpg"] },
  { name: "Slingback Heels", category: "Shoes", price: 3000, stock: 6, variants: ["Nude, Black, Maroon"], images: ["/images/slingback.jpg"] },
  { name: "Two-Toned Slingback Shoes", category: "Shoes", price: 2000, stock: 5, variants: ["Sizes 36–40"], images: ["/images/two-tone-slingback.jpg"] },
  { name: "ZA Slides", category: "Shoes", price: 2000, stock: 8, variants: ["Black, Brown"], images: ["/images/za-slides.jpg"] },
  { name: "Sandals", category: "Shoes", price: 1400, stock: 10, images: ["/images/sandals-generic.jpg"] },
  { name: "Mesh Ballet Flats", category: "Shoes", price: 2000, stock: 5, variants: ["Size 39"], images: ["/images/mesh-ballet.jpg"] },

  // Bags
  { name: "Polene Tote Bag", category: "Bags", price: 3500, stock: 6, variants: ["Fits laptop"], images: ["/images/polene-tote.jpg"], featured: true },
  { name: "Crossbody Bags", category: "Bags", price: 3000, stock: 8, variants: ["Colors: Black, Brown, White, Grey"], images: ["/images/crossbody.jpg"] },
  { name: "Bottega Clutch", category: "Bags", price: 2500, stock: 5, images: ["/images/bottega-clutch.jpg"], featured: true },
  { name: "Zara Tote Bag", category: "Bags", price: 2000, stock: 7, variants: ["Maroon, Black, Brown"], images: ["/images/zara-tote.jpg"] },
  { name: "2-in-1 Leather Handbag", category: "Bags", price: 2600, stock: 5, variants: ["Fits laptop"], images: ["/images/leather-handbag.jpg"] },
  { name: "Camilla Straw Bag", category: "Bags", price: 2000, stock: 6, images: ["/images/camilla-straw.jpg"] },
  { name: "Underarm Bag", category: "Bags", price: 2000, stock: 8, images: ["/images/underarm-bag.jpg"] },

  // Clothing
  { name: "Rain Coats", category: "Clothing", price: 600, stock: 15, variants: ["Colors: Black, Jungle Green, Grey"], images: ["/images/rain-coat.jpg"] },
  { name: "Cropped Trench Coat", category: "Clothing", price: 2200, stock: 5, images: ["/images/cropped-trench.jpg"], featured: true },
  { name: "Tweed Blazer", category: "Clothing", price: 3300, stock: 8, variants: ["Colors: black, white, blue, light pink"], images: ["/images/tweed-blazer.jpg"] },

  // Home Utility
  { name: "Non-Slip Bathroom Mats", category: "Bathroom", price: 1000, stock: 20, variants: ["Wear resistant"], images: ["/images/bath-mats.jpg"] },
  { name: "Woven Cotton Rope Laundry Basket", category: "Home", price: 0, stock: 5, variants: ["Color: Grey"], images: ["/images/laundry-basket.jpg"] },
  { name: "Waterproof Mattress Protector Set", category: "Bedding", price: 2600, stock: 8, variants: ["Includes fitted sheet + pillow protectors"], images: ["/images/mattress-protector.jpg"] },
  { name: "Automatic Umbrella", category: "Accessories", price: 1100, stock: 20, variants: ["Colors: Black, Green, Lilac"], images: ["/images/umbrella.jpg"] },
  { name: "Hot Water Bottles", category: "Home", price: 700, stock: 15, images: ["/images/hot-water-bottle.jpg"] },
  { name: "Shower Caddy", category: "Bathroom", price: 2000, stock: 8, images: ["/images/shower-caddy.jpg"] },
  { name: "Soap Dispenser Set with Bamboo Tray", category: "Bathroom", price: 1400, stock: 10, variants: ["2 pack"], images: ["/images/soap-dispenser-set.jpg"], featured: true },
  { name: "Bathroom Corner Organizer Set", category: "Bathroom", price: 2500, stock: 5, variants: ["5pc set"], images: ["/images/bathroom-organizer.jpg"] },
  { name: "Nordic Bathroom Mats", category: "Bathroom", price: 1000, stock: 15, variants: ["Non-slip, 80x50cm"], images: ["/images/nordic-bath-mats.jpg"] },
  { name: "Storage Basket", category: "Home Storage", price: 350, stock: 30, variants: ["Color: Black"], images: ["/images/storage-basket.jpg"] },
  { name: "Retractable Raised Shelf", category: "Storage", price: 900, stock: 12, variants: ["Cabinet organizer"], images: ["/images/retractable-shelf.jpg"] },
  { name: "Laundry Powder Container", category: "Home Storage", price: 1900, stock: 6, images: ["/images/laundry-container.jpg"] },
  { name: "Expandable Bamboo Drawer Organizer", category: "Storage", price: 2200, stock: 5, images: ["/images/drawer-organizer.jpg"] },
  { name: "Acrylic Organizer (Single)", category: "Storage", price: 450, stock: 20, images: ["/images/acrylic-organizer-single.jpg"] },

  // Beauty
  { name: "Summer Fridays Lip Products", category: "Beauty", price: 500, stock: 25, variants: ["Multiple flavors"], images: ["/images/lip-products.jpg"] },
  { name: "Hair Straightener", category: "Beauty", price: 1800, stock: 8, images: ["/images/hair-straightener.jpg"] },

  // Accessories
  { name: "Laptop Sleeve", category: "Accessories", price: 0, stock: 10, variants: ["13\" & 15\", Pink/Black/Dark Blue"], images: ["/images/laptop-sleeve.jpg"] },
  { name: "Casio Watch", category: "Accessories", price: 1800, stock: 8, variants: ["Black, Beige"], images: ["/images/casio-watch.jpg"], featured: true },
  { name: "Jewellery Organizer", category: "Accessories", price: 1300, stock: 10, images: ["/images/jewellery-organizer.jpg"] },
  { name: "Laptop Sleeve", category: "Accessories", price: 1300, stock: 8, variants: ["15\", multiple colors"], images: ["/images/laptop-sleeve-15.jpg"] },
  { name: "Retro Makeup Bag", category: "Accessories", price: 0, stock: 8, variants: ["Black, Peach, White, Brown"], images: ["/images/makeup-bag.jpg"] },
  { name: "Cable Storage Organizer", category: "Accessories", price: 1300, stock: 12, variants: ["Grey, Beige"], images: ["/images/cable-organizer.jpg"] },
  { name: "YB Automatic Umbrella", category: "Accessories", price: 1100, stock: 15, variants: ["Multiple colors"], images: ["/images/yb-umbrella.jpg"] },

  // Seasonal Decor
  { name: "Christmas Wreath", category: "Seasonal Decor", price: 1300, stock: 8, variants: ["Diameter 30cm"], images: ["/images/wreath.jpg"] },
  { name: "Christmas Tree Skirt", category: "Seasonal Decor", price: 1300, stock: 6, variants: ["Gold & Silver, 90cm"], images: ["/images/tree-skirt.jpg"] },

  // Furniture
  { name: "Bamboo Couch Arm Table", category: "Furniture", price: 2000, stock: 5, variants: ["Sofa arm table"], images: ["/images/bamboo-table.jpg"] },

  // Kitchen Accessories
  { name: "Syrup Dispenser", category: "Kitchen Accessories", price: 1800, stock: 8, images: ["/images/syrup-dispenser.jpg"] },
  { name: "Oil / Syrup Dispenser", category: "Kitchen Accessories", price: 1800, stock: 8, images: ["/images/oil-dispenser.jpg"] },
  { name: "Bamboo Salt Cellar", category: "Kitchen Accessories", price: 650, stock: 15, images: ["/images/salt-cellar.jpg"] },
  { name: "Measuring Spoon Set", category: "Kitchen Tools", price: 1650, stock: 10, variants: ["8 piece set"], images: ["/images/measuring-spoons.jpg"] },
  { name: "Honey Dispenser", category: "Kitchen Accessories", price: 800, stock: 12, variants: ["500ml"], images: ["/images/honey-dispenser.jpg"] },
  { name: "Syrup Dispensers (Pair)", category: "Kitchen Accessories", price: 1800, stock: 6, images: ["/images/syrup-dispensers-pair.jpg"] },

  // Lighting
  { name: "LED Mirror / Wall Light", category: "Lighting", price: 3000, stock: 5, variants: ["Rechargeable, Gold/Silver/Black"], images: ["/images/led-mirror.jpg"] },

  // Home Appliances
  { name: "Garment Steamer", category: "Home Appliance", price: 2300, stock: 4, variants: ["1000W"], images: ["/images/garment-steamer.jpg"] },

  // Home
  { name: "Acrylic Throw Blanket", category: "Home", price: 1600, stock: 8, variants: ["Nude, Grey"], images: ["/images/throw-blanket.jpg"] },
  { name: "Bamboo Tray", category: "Kitchen / Dining", price: 1800, stock: 8, variants: ["Diameter 35cm"], images: ["/images/bamboo-tray.jpg"] }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const result = await Product.insertMany(productsData);
    console.log(`✅ Seeded ${result.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();