// ── SINGLE SOURCE OF TRUTH FOR ALL MENU DATA ────────────────
// Prices sourced from meltndip.com official menu (prices.md)
// Edit this file to update menu items, packages, FAQs etc.

export type UnifiedMenuItem = {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  image?: string;
  price: number | null;
  priceRegular?: number;
  priceLarge?: number;
};

export const UNIFIED_MENU: UnifiedMenuItem[] = [
  // ── CREPE ────────────────────────────────────────────────
  { id: "cr-triple-choc", name: "Triple Chocolate Crepe", category: "Crepe", price: 14.49, description: "Folded crepe, topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-triple-choc.jpg" },
  { id: "cr-rocky-road", name: "Rocky Road Crepe", category: "Crepe", price: 17.49, description: "Crepe filled with MARSHMALLOW topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-rocky-road.png" },
  { id: "cr-digestive", name: "Digestive Crepe", category: "Crepe", price: 17.49, description: "Crepe filled with white chocolate and a SEMI SWEET BISCUIT topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-digestive.jpg" },
  { id: "cr-lotus", name: "Lotus Crepe", category: "Crepe", price: 17.49, description: "Crepe stuffed with LOTUS Butter and cookies drizzled with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-lotus.jpg" },
  { id: "cr-yolo", name: "Y.O.L.O Crepe", category: "Crepe", price: 17.49, description: "Crepe stuffed with OREO and white chocolate and dipped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-yolo.jpg" },
  { id: "cr-brownies", name: "Brownies Crepe", category: "Crepe", price: 17.49, description: "A crepe filled with BROWNIES and patisserie cream and topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-brownies.jpg" },
  { id: "cr-cream-dream", name: "Cream and Dream", category: "Crepe", price: 17.49, description: "CRUNCHY rice stuffed crepe filled with white chocolate and dipped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-cream-dream.jpg" },
  { id: "cr-pina-colada", name: "Pina Colada Crepe", category: "Crepe", price: 17.49, description: "Crepe pouch stuffed with patisserie cream, COCONUT flakes & fresh PINEAPPLE all topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-pina-colada.jpg" },
  { id: "cr-banana-wrap", name: "Banana Wrap", category: "Crepe", price: 16.49, description: "A full BANANA dipped in Melt n Dip special cream, wrapped with crepe and topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-banana-wrap.jpg" },
  { id: "cr-fettuccine", name: "Fettuccine Crepe", category: "Crepe", price: 17.49, description: "Crepe, cut fettuccini style with one scoop of vanilla gelato topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-fettuccine.jpg" },
  { id: "cr-meltndip", name: "Melt N Dip Crepe", category: "Crepe", price: 17.99, description: "French crepe filled with (strawberry, banana, pineapple, kiwi) topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-meltndip.jpg" },
  { id: "cr-red-velvet", name: "Red Velvet Fettuccine", category: "Crepe", price: 17.49, description: "Red Velvet crepe, cut fettuccine style with one scoop of vanilla gelato topped with White Belgian Chocolate", image: "/assets/menu/cr-red-velvet.jpg" },
  { id: "cr-apple-cin", name: "Apple Cinnamon Pouch", category: "Crepe", price: 17.99, description: "Crepe stuffed with Melt n Dip special cream, apple and cinnamon all topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-apple-cin.jpg" },
  { id: "cr-banana-cin", name: "Banana Cinnamon Pouch", category: "Crepe", price: 17.99, description: "Crepe stuffed with Melt n Dip special cream, banana and cinnamon all topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-banana-cin.jpg" },
  { id: "cr-pistachio", name: "Pistachio Crepe", category: "Crepe", price: 17.49, description: "Folded crepe, topped with PISTACHIO spread and white Belgian chocolate, decorated with pistachio.", image: "/assets/menu/cr-pistachio.png" },
  { id: "cr-pistachio-fett", name: "Pistachio Fettuccine", category: "Crepe", price: 17.99, description: "Crepe, cut fettuccini style with one scoop of pistachio gelato topped with PISTACHIO spread and white chocolate, decorated with pistachio.", image: "/assets/menu/cr-pistachio-fett.png" },
  { id: "cr-cotton-candy", name: "Cotton Candy Pouch", category: "Crepe", price: 17.99, description: "Crepe stuffed with Meltndip special cream, strawberry and COTTON CANDY all topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/cr-cotton-candy.png" },
  { id: "cr-dubai-choc", name: "Dubai Chocolate Crepe", category: "Crepe", price: 17.49, description: "Crepe filled with KUNAFE, pistachio spread, pistachio nuts and topped with Milk chocolate, Pistachio and Kunafe", image: undefined },

  // ── WAFFLE ───────────────────────────────────────────────
  { id: "wf-meltndip", name: "Melt N Dip Waffle", category: "Waffle", price: 17.99, description: "Toasted waffle with fresh fruits (banana, pineapple, kiwi, and strawberry) topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/wf-meltndip.jpg" },
  { id: "wf-chocolate", name: "Chocolate Waffle", category: "Waffle", price: 14.99, description: "Toasted waffle topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/wf-chocolate.jpg" },
  { id: "wf-brownies", name: "Brownies Waffle", category: "Waffle", price: 16.49, description: "Toasted waffle topped with BROWNIES pieces dipped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/wf-brownies.jpg" },
  { id: "wf-lotus", name: "Lotus Waffle", category: "Waffle", price: 17.49, description: "Toasted waffle dipped in LOTUS biscuit crumbs and butter spread topped with white Belgian Chocolate and a scoop of Lotus gelato", image: "/assets/menu/wf-lotus.jpg" },
  { id: "wf-kunafa", name: "Kunafa Waffle Cup", category: "Waffle", price: 17.49, description: "Waffle cup stuffed with KANAFEH and white chocolate all topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/wf-kunafa.jpg" },
  { id: "wf-pistachio", name: "Pistachio Waffle", category: "Waffle", price: 17.49, description: "Toasted waffle topped with PISTACHIO spread and white Belgian chocolate, decorated with pistachio and a scoop of pistachio gelato", image: "/assets/menu/wf-pistachio.png" },

  // ── COOKIES & CAKE ───────────────────────────────────────
  { id: "ck-lovely-cookies", name: "Lovely Cookies", category: "Cookies & Cake", subcategory: "Cookies", price: 17.49, description: "A skillet pan of fresh baked chocolate chip COOKIE topped with a scoop of vanilla gelato, dipped with three kinds of Belgian Chocolate (Milk, Dark, and White)", image: "/assets/menu/ck-lovely-cookies.jpg" },
  { id: "ck-red-velvet", name: "Red Velvet Cookies", category: "Cookies & Cake", subcategory: "Cookies", price: 17.49, description: "A skillet pan of fresh baked RED VELVET COOKIE topped with a scoop of vanilla gelato, dipped with white Belgian Chocolate.", image: "/assets/menu/ck-red-velvet.png" },
  { id: "ck-brownies-magic", name: "Brownies Magic", category: "Cookies & Cake", subcategory: "Cake", price: 13.49, description: "A skillet pan filled with brownies and a scoop of vanilla gelato, topped with fresh strawberries and three kinds of Belgian chocolate", image: "/assets/menu/ck-brownies-magic.jpg" },
  { id: "ck-flake-sense", name: "Flake Sense", category: "Cookies & Cake", subcategory: "Cake", price: 13.49, description: "Layer of rice crispies, vanilla gelato, and topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/ck-flake-sense.jpg" },
  { id: "ck-lava-cake", name: "Lava Cake", category: "Cookies & Cake", subcategory: "Cake", price: 17.49, description: "Warm lava cake with vanilla gelato and topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/ck-lava-cake.jpg" },

  // ── DIP STICK & SHARING PLATTERS ─────────────────────────
  { id: "ds-fruit-stick", name: "Fruit Stick", category: "Dip Stick & Sharing", subcategory: "Dip Stick", price: 11.99, description: "A skewer filed with fruits, brownies, éclair and marshmallow dipped in Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/ds-fruit-stick.jpg" },
  { id: "ds-eclair-pyramid", name: "Éclair Pyramid", category: "Dip Stick & Sharing", subcategory: "Dip Stick", price: 14.99, description: "11 mini cream puffs topped with Milk, Dark, and White Belgian Chocolate", image: "/assets/menu/ds-eclair-pyramid.jpg" },
  { id: "ds-pistachio-eclair", name: "Pistachio Éclair", category: "Dip Stick & Sharing", subcategory: "Dip Stick", price: 16.49, description: "11 mini cream puffs topped with PISTACHIO spread and white Belgian chocolate, decorated with pistachio.", image: "/assets/menu/ds-pistachio-eclair.png" },
  { id: "ds-lotus-eclair", name: "Lotus Éclair", category: "Dip Stick & Sharing", subcategory: "Dip Stick", price: 14.99, description: "11 mini cream puffs topped with LOTUS butter and white Belgian chocolate, decorated with Lotus cookie crumbs.", image: "/assets/menu/ds-lotus-eclair.png" },
  { id: "ds-my-passion-1", name: "My Passion (1 person)", category: "Dip Stick & Sharing", subcategory: "My Passion", price: 16.49, description: "A full plate of fruits, brownies, éclair, and marshmallow with Belgian Milk Chocolate. For one person.", image: "/assets/menu/ds-my-passion-1.jpg" },
  { id: "ds-my-passion-2", name: "My Passion (2 people)", category: "Dip Stick & Sharing", subcategory: "My Passion", price: 23.49, description: "A full plate of fruits, brownies, éclair, and marshmallow with Belgian Milk Chocolate. For two people.", image: "/assets/menu/ds-my-passion-2.jpg" },
  { id: "ds-my-passion-4", name: "My Passion (4 people)", category: "Dip Stick & Sharing", subcategory: "My Passion", price: 50.49, description: "A full plate of fruits, brownies, éclair, and marshmallow with Belgian Milk Chocolate. For four people.", image: "/assets/menu/ds-my-passion-4.jpg" },

  // ── FRESH FRUIT & FRUIT PLATTERS ─────────────────────────
  { id: "ff-tahiti", name: "Tahiti", category: "Fresh Fruit & Platters", subcategory: "Fresh Fruit", priceRegular: 11.49, priceLarge: 13.49, price: 11.49, description: "Strawberry juice with seasonal fresh fruits topped with strawberry gelato", image: "/assets/menu/ff-tahiti.png" },
  { id: "ff-avocado", name: "Avocado", category: "Fresh Fruit & Platters", subcategory: "Fresh Fruit", priceRegular: 13.49, priceLarge: 14.49, price: 13.49, description: "Fresh Avocado blended with honey, topped with keshta, almonds, and cashews.", image: "/assets/menu/ff-avocado.png" },
  { id: "ms-banana", name: "Banana Milkshake", category: "Milkshakes & Cheesecake", subcategory: "Milkshake", priceRegular: 11.49, priceLarge: 12.49, price: 11.49, description: "Banana shake blended with keshta, honey, almonds, and cashews.", image: "/assets/menu/ff-banana-milkshake.png" },
  { id: "ff-panama", name: "Panama", category: "Fresh Fruit & Platters", subcategory: "Fresh Fruit", priceRegular: 11.49, priceLarge: 13.49, price: 11.49, description: "Mango juice with seasonal fresh fruits topped with mango gelato", image: "/assets/menu/ff-panama.png" },
  { id: "ff-avocado-nutella", name: "Avocado with Nutella", category: "Fresh Fruit & Platters", subcategory: "Fresh Fruit", priceRegular: 12.99, priceLarge: 13.99, price: 12.99, description: "Avocado and Nutella layers topped with whipped cream and strawberries.", image: "/assets/menu/ff-avocado-nutella.png" },
  { id: "ff-meltndip-cocktail", name: "Meltndip Cocktail", category: "Fresh Fruit & Platters", subcategory: "Fresh Fruit", priceRegular: 12.99, priceLarge: 13.99, price: 12.99, description: "Avocado and cocktail juice layers topped with whipped cream, decorated with seasonal fruits and honey.", image: "/assets/menu/ff-meltndip-cocktail.png" },
  { id: "ff-cocktail-fruit", name: "Cocktail Fruit", category: "Fresh Fruit & Platters", subcategory: "Fresh Fruit", priceRegular: 11.99, priceLarge: 13.49, price: 11.99, description: "Seasonal fresh fruits topped with three kinds of juices (strawberry, mango, and guava), decorated with Keshta, almonds, cashews and honey.", image: undefined },
  { id: "fp-nutella-fruit-salad", name: "Nutella Fruit Salad", category: "Fresh Fruit & Platters", subcategory: "Fruit Platters", price: 17.99, description: "Nutella Chocolate, Strawberry, Banana, Melt n Dip special cream, and whipped cream", image: "/assets/menu/fp-nutella-fruit-salad.jpg" },
  { id: "fp-royal-fruit-salad", name: "Royal Fruit Salad", category: "Fresh Fruit & Platters", subcategory: "Fruit Platters", price: 17.99, description: "Seasonal fresh fruits topped with Raspberry and Mango Gelato.", image: "/assets/menu/fp-royal-fruit-salad.jpg" },
  { id: "fp-crunchy-fruit-salad", name: "Crunchy Fruit Salad", category: "Fresh Fruit & Platters", subcategory: "Fruit Platters", price: 17.99, description: "Rice Krispies, condensed milk, strawberry, banana, Melt n Dip special cream and topped with whipped cream", image: "/assets/menu/fp-crunchy-fruit-salad.jpg" },
  { id: "fp-lotus-fruit-salad", name: "Lotus Fruit Salad", category: "Fresh Fruit & Platters", subcategory: "Fruit Platters", price: 17.99, description: "Lotus cookie butter, strawberry, banana, Melt n Dip special cream topped with whipped cream and Lotus crumbs.", image: "/assets/menu/fp-lotus-fruit-salad.jpg" },
  { id: "fp-fruit-salad", name: "Fruit Salad", category: "Fresh Fruit & Platters", subcategory: "Fruit Platters", price: 17.99, description: "Seasonal fresh fruits topped with Keshta, cashews, almonds, and honey.", image: "/assets/menu/fp-fruit-salad.jpg" },
  { id: "fp-banana-split", name: "Banana Split", category: "Fresh Fruit & Platters", subcategory: "Fruit Platters", price: 13.49, description: "A trio of vanilla, strawberry, and chocolate gelato. Topped with Belgian Milk Chocolate. All finished with fresh banana and whipped cream.", image: "/assets/menu/fp-banana-split.jpg" },

  // ── MILKSHAKES & CHEESECAKE ──────────────────────────────
  { id: "ms-chocolate", name: "Chocolate Milkshake", category: "Milkshakes & Cheesecake", subcategory: "Milkshake", price: 6.99, image: "/assets/menu/ms-chocolate.png" },
  { id: "ms-lotus", name: "Lotus Milkshake", category: "Milkshakes & Cheesecake", subcategory: "Milkshake", price: 6.99, image: "/assets/menu/ms-lotus.png" },
  { id: "ms-oreo", name: "Oreo Milkshake", category: "Milkshakes & Cheesecake", subcategory: "Milkshake", price: 6.99, image: "/assets/menu/ms-oreo.png" },
  { id: "ms-nutella", name: "Nutella Milkshake", category: "Milkshakes & Cheesecake", subcategory: "Milkshake", price: 6.99, image: "/assets/menu/ms-nutella.png" },
  { id: "ms-pistachio", name: "Pistachio Milkshake", category: "Milkshakes & Cheesecake", subcategory: "Milkshake", price: 6.99, image: "/assets/menu/ms-pistachio.png" },
  { id: "ms-strawberry", name: "Strawberry Milkshake", category: "Milkshakes & Cheesecake", subcategory: "Milkshake", price: 6.99, image: "/assets/menu/ms-strawberry.png" },
  { id: "ms-dubai-cup", name: "Dubai Strawberry Cup", category: "Milkshakes & Cheesecake", subcategory: "Dubai Strawberry Cup", priceRegular: 14.99, priceLarge: 19.99, price: 14.99, description: "Fresh strawberries with Dubai chocolate and pistachio", image: "/assets/menu/ms-dubai-cup-r.png" },
  { id: "cs-milk-choc", name: "Milk Chocolate Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-milk-choc.png" },
  { id: "cs-white-choc", name: "White Chocolate Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-white-choc.png" },
  { id: "cs-dark-choc", name: "Dark Chocolate Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-dark-choc.png" },
  { id: "cs-triple-choc", name: "Triple Chocolates Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-triple-choc.png" },
  { id: "cs-nutella", name: "Nutella Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-nutella.png" },
  { id: "cs-lotus", name: "Lotus Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-lotus.png" },
  { id: "cs-oreo", name: "Oreo Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-oreo.png" },
  { id: "cs-strawberry", name: "Strawberry Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-strawberry.png" },
  { id: "cs-pistachio", name: "Pistachio Cheesecake", category: "Milkshakes & Cheesecake", subcategory: "Cheesecake", price: 10.99, image: "/assets/menu/cs-pistachio.png" },

  // ── BEVERAGES ────────────────────────────────────────────
  // Drink it Fresh
  { id: "bf-carrot", name: "Carrot Juice", category: "Beverages", subcategory: "Drink it Fresh", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: undefined },
  { id: "bf-orange", name: "Orange Juice", category: "Beverages", subcategory: "Drink it Fresh", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: undefined },
  { id: "bf-apple", name: "Apple Juice", category: "Beverages", subcategory: "Drink it Fresh", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: undefined },
  { id: "bf-pineapple", name: "Pineapple Juice", category: "Beverages", subcategory: "Drink it Fresh", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: undefined },
  { id: "bf-grape", name: "Grape Juice", category: "Beverages", subcategory: "Drink it Fresh", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: undefined },
  // Drink it Cold
  { id: "bc-lemonade", name: "Lemonade", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 6.49, priceLarge: 7.49, price: 6.49, image: "/assets/menu/bc-lemonade.png" },
  { id: "bc-mint-lemonade", name: "Mint Lemonade", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 7.49, priceLarge: 8.49, price: 7.49, image: "/assets/menu/bc-mint-lemonade.png" },
  { id: "bc-strawberry", name: "Strawberry Drink", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: "/assets/menu/bc-strawberry.png" },
  { id: "bc-mango", name: "Mango Drink", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: "/assets/menu/bc-mango.png" },
  { id: "bc-strawberry-banana", name: "Strawberry Banana", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: undefined },
  { id: "bc-strawberry-banana-blue", name: "Strawberry Banana Blueberry", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: undefined },
  { id: "bc-cocktail-juice", name: "Cocktail Juice", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: "/assets/menu/bc-cocktail-juice.png" },
  { id: "bc-guava", name: "Guava Drink", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 8.49, priceLarge: 9.49, price: 8.49, image: undefined },
  { id: "bc-iced-coffee", name: "Iced Coffee", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 4.99, priceLarge: 5.99, price: 4.99, image: undefined },
  { id: "bc-iced-coffee-latte", name: "Iced Coffee Latte", category: "Beverages", subcategory: "Drink it Cold", priceRegular: 4.99, priceLarge: 5.99, price: 4.99, image: undefined },
  // Drink it Hot
  { id: "bh-espresso", name: "Espresso", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 2.99, priceLarge: 4.49, price: 2.99, description: "100% Natural Arabica or Robusta, 30 ml cup", image: "/assets/menu/bh-espresso.png" },
  { id: "bh-espresso-macchiato", name: "Espresso Macchiato", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 3.99, priceLarge: 4.99, price: 3.99, description: "Espresso with a dollop of milk foam", image: "/assets/menu/bh-espresso-macchiato.png" },
  { id: "bh-americano", name: "Americano", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 3.99, priceLarge: 4.99, price: 3.99, description: "100% Natural Arabica or Robusta, 30 ml cup", image: "/assets/menu/bh-americano.png" },
  { id: "bh-cappuccino", name: "Cappuccino", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 4.99, priceLarge: 5.99, price: 4.99, description: "Coffee & milk", image: "/assets/menu/bh-cappuccino.png" },
  { id: "bh-cafe-latte", name: "Café Latte", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 4.99, priceLarge: 5.99, price: 4.99, description: "Smooth espresso and steamed milk", image: "/assets/menu/bh-cafe-latte.png" },
  { id: "bh-cafe-mocha", name: "Café Mocha", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 5.49, priceLarge: 6.49, price: 5.49, description: "Coffee 30%, milk 50%, Water 20%, 280 ml + foam", image: "/assets/menu/bh-cafe-mocha.png" },
  { id: "bh-caramel-macchiato", name: "Caramel Macchiato", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 5.49, priceLarge: 6.49, price: 5.49, description: "Rich espresso with caramel", image: "/assets/menu/bh-caramel-macchiato.png" },
  { id: "bh-white-choc-mocha", name: "White Chocolate Mocha", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 5.49, priceLarge: 6.49, price: 5.49, description: "Rich espresso with white chocolate", image: "/assets/menu/bh-white-choc-mocha.png" },
  { id: "bh-espresso-affogato", name: "Espresso Affogato", category: "Beverages", subcategory: "Drink it Hot", price: 7.99, image: "/assets/menu/bh-espresso-affogato.png" },
  { id: "bh-tea", name: "Tea", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 2.99, priceLarge: 3.99, price: 2.99, image: "/assets/menu/bh-tea.png" },
  { id: "bh-tea-milk", name: "Tea with milk", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 2.99, priceLarge: 3.99, price: 2.99, description: "Black Tea with milk", image: undefined },
  { id: "bh-belgian-hot-choc", name: "Belgian hot Chocolate", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 5.49, priceLarge: 6.49, price: 5.49, image: "/assets/menu/bh-belgian-hot-choc.png" },
  { id: "bh-turkish-coffee", name: "Turkish Coffee", category: "Beverages", subcategory: "Drink it Hot", priceRegular: 4.99, priceLarge: 5.99, price: 4.99, description: "100% Natural Arabica or Robusta, 30 ml cup", image: "/assets/menu/bh-turkish-coffee.png" },
];

// ── HELPER: Get unique categories ──────────────────────────
export function getMenuCategories(): string[] {
  return [...new Set(UNIFIED_MENU.map((item) => item.category))];
}

export function getMenuByCategory(category: string): UnifiedMenuItem[] {
  return UNIFIED_MENU.filter((item) => item.category === category);
}

// ── CATEGORY DISPLAY MAPPING (for MND page tabs) ───────────
export const CATEGORY_DISPLAY: Record<string, { label: string; id: string }> = {
  Crepe: { label: "Crepes", id: "crepes" },
  Waffle: { label: "Waffles", id: "waffles" },
  "Cookies & Cake": { label: "Cookies & Cake", id: "cake" },
  "Dip Stick & Sharing": { label: "Dip Stick", id: "dipstick" },
  "Fresh Fruit & Platters": { label: "Fruits & Platters", id: "gelato" },
  "Milkshakes & Cheesecake": { label: "Milkshakes & Cheesecake", id: "milkshakes" },
  Beverages: { label: "Beverages", id: "drinks" },
};

// ── GELATO & DAMASCENE (separate items not in standard menu) ─
export const GELATO_ITEMS = [
  { id: "gl-1-scoop", name: "1 Scoop Gelato", price: 4.99, description: "Single scoop of artisan gelato" },
  { id: "gl-2-scoop", name: "2 Scoop Gelato", price: 6.99, description: "Double scoop of artisan gelato" },
  { id: "gl-3-scoop", name: "3 Scoop Gelato", price: 9.49, description: "Triple scoop of artisan gelato" },
  { id: "gl-party-8", name: "Gelato Party (8 scps)", price: 28.99, description: "Gelato party pack - 8 scoops" },
  { id: "gl-party-16", name: "Gelato Party (16 scps)", price: 45.99, description: "Gelato party pack - 16 scoops" },
  { id: "dm-1-person", name: "Damascene Ice Cream (1 person)", price: 13.49, description: "Homemade ice cream damascene style with keshta & pistachio - single serve" },
  { id: "dm-1lb", name: "Damascene Ice Cream (1 lb)", price: 29.49, description: "Homemade ice cream damascene style with keshta & pistachio - 1 lb" },
  { id: "dm-2lb", name: "Damascene Ice Cream (2 lbs)", price: 52.49, description: "Homemade ice cream damascene style with keshta & pistachio - 2 lbs" },
];

// ── NEW ITEMS NOT IN OLD DATA ──────────────────────────────
export const NEW_ITEMS_LIST = [
  "Pistachio Crepe ($17.49)",
  "Pistachio Fettuccine ($17.99)",
  "Cotton Candy Pouch ($17.99)",
  "Dubai Chocolate Crepe ($17.49)",
  "Pistachio Waffle ($17.49)",
  "Red Velvet Cookies ($17.49)",
  "Pistachio Éclair ($16.49)",
  "Lotus Éclair ($14.99)",
  "Crunchy Fruit Salad ($17.99)",
  "Tahiti (R $11.99 / L $13.49)",
  "Avocado (R $13.49 / L $14.49)",
  "Banana Milkshake (R $11.49 / L $12.49)",
  "Panama (R $11.99 / L $13.49)",
  "Avocado with Nutella (R $12.99 / L $13.99)",
  "Meltndip Cocktail (R $12.99 / L $13.99)",
  "Cocktail Fruit (R $11.99 / L $13.49)",
  "Dubai Strawberry Cup R/L ($14.99/$19.99) — was $6 in old data",
  "All 9 Cheesecake flavors ($10.99 each)",
  "All Drink it Fresh beverages (5 items)",
  "Gelato scoops + party sizes",
  "Damascene Ice Cream (3 sizes)",
  "6 Milkshake flavors ($6.99 each)",
  "Espresso Affogato ($7.99)",
];

// ── PACKAGES ───────────────────────────────────────────────
export const PACKAGES = [
  {
    name: "Sweet Bites",
    min: 8,
    max: 10,
    desc: "Fruit sticks, brownie bites, mini éclairs, chocolate drizzle.",
  },
  {
    name: "Classic Dessert",
    min: 12,
    max: 15,
    desc: "Mini crepes, fruit cups, brownies, Belgian chocolate toppings.",
  },
  {
    name: "Premium Melt N Dip",
    min: 18,
    max: 25,
    desc: "Crepes, waffles, gelato, fruit cups, premium chocolate station.",
  },
];

// ── EVENT TYPES ────────────────────────────────────────────
export const EVENT_TYPES = [
  "Wedding / Nikah",
  "Birthday",
  "Corporate Event",
  "Graduation",
  "Iftar and Eid",
  "Baby / Bridal Shower",
  "Community Event",
  "Mosque / Church Event",
  "Grand Opening",
  "Late-Night Dessert Bar",
  "Other",
];

// ── SERVICE STYLES ─────────────────────────────────────────
export const SERVICE_STYLES = [
  "Self-Pickup (Palos Park Store)",
  "Drop-Off Catering Trays",
  "Delivery & Setup",
  "Live Crepe / Waffle Station",
  "Full-Service Staffed Catering",
  "Food Truck",
];

// ── FAQS ───────────────────────────────────────────────────
export const FAQS = [
  {
    q: "What is the minimum spend?",
    a: "In-house / external catering: $750 minimum food spend. Food truck: $1,500 minimum food spend. Both exclude labor, delivery, and tax.",
  },
  {
    q: "What do you serve?",
    a: "Belgian chocolate fountains, artisan gelato, fresh crepes, waffles, fruit displays, brownie bites, éclairs, Dubai Chocolate Strawberry Cups, and signature chai and coffee beverages. All Halal.",
  },
  {
    q: "What hours are you available?",
    a: "External events: 12:00 noon to 10:00pm. Store rentals: 12:00 noon to 12:00 midnight. Special requests considered based on availability.",
  },
  {
    q: "Is outside food allowed?",
    a: "No outside food or beverages permitted. All food must be provided by Delight Enterprises / Melt N Dip.",
  },
  {
    q: "Do you have a sound system?",
    a: "Yes - our store has a sound system with TV connectivity. Karaoke available for an additional charge.",
  },
  {
    q: "How far in advance must I book?",
    a: "Minimum 30 days advance booking for food truck and in-house catering.",
  },
  {
    q: "What is your cancellation policy?",
    a: "30% non-refundable deposit required. Cancellations 15+ days before: 25% deposit refunded. Within 15 days: full deposit forfeited.",
  },
  {
    q: "What power do you need?",
    a: "220V power required for all chocolate fountain setups. Please confirm venue power availability in advance.",
  },
];

// ── BAG ITEM (shared type) ────────────────────────────────
export type BagItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  selectedSize?: "regular" | "large";
};
