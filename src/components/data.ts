// ── ALL STATIC DATA FOR THE CATERING PAGE ────────────────
// Edit this file to update menu items, packages, FAQs etc.
import {
  Cookie,
  CakeSlice,
  IceCreamCone,
  Coffee,
  Cherry,
  Candy,
} from "lucide-react";

const CDN = "https://meltndip.com/wp-content/uploads";

export const MENU = [
  {
    category: "Dessert Cups",
    icon: "🍓",
    items: [
      {
        id: "dc1",
        name: "Dubai Strawberry Cup",
        pricePerPerson: 6,
        desc: "Fresh strawberries filled with premium Belgian chocolate blends.",
      },
      {
        id: "dc2",
        name: "Brownies Magic Cup",
        pricePerPerson: 5,
        desc: "Rich Belgian chocolate brownies in a cup with toppings.",
      },
      {
        id: "dc3",
        name: "Fruit Salad Cup",
        pricePerPerson: 4,
        desc: "Fresh seasonal fruits, lightly dressed.",
      },
      {
        id: "dc4",
        name: "Nutella Fruit Salad",
        pricePerPerson: 5,
        desc: "Fresh fruits tossed in creamy Nutella.",
      },
      {
        id: "dc5",
        name: "Lotus Salad",
        pricePerPerson: 5,
        desc: "Lotus Biscoff with fruits and cream.",
      },
      {
        id: "dc6",
        name: "Royal Fruit Salad",
        pricePerPerson: 6,
        desc: "Premium fruits with a signature drizzle.",
      },
    ],
  },
  {
    category: "Crepes",
    icon: "🥞",
    items: [
      {
        id: "cr1",
        name: "Triple Chocolate Crepe",
        pricePerPerson: 8,
        desc: "Dark, milk and white Belgian chocolate layered crepe.",
      },
      {
        id: "cr2",
        name: "Melt n Dip Crepe",
        pricePerPerson: 9,
        desc: "Our flagship - chocolate poured.",
      },
      {
        id: "cr3",
        name: "Lotus Crepe",
        pricePerPerson: 8,
        desc: "Biscoff spread with banana and cream.",
      },
      {
        id: "cr4",
        name: "Brownies Crepe",
        pricePerPerson: 8,
        desc: "Brownie bites folded into a rich chocolate crepe.",
      },
      {
        id: "cr5",
        name: "Red Velvet Fettuccine",
        pricePerPerson: 9,
        desc: "Red velvet crepe strips with cream cheese drizzle.",
      },
      {
        id: "cr6",
        name: "Apple Cinnamon Crepe Pouch",
        pricePerPerson: 7,
        desc: "Warm apple filling with cinnamon and caramel.",
      },
      {
        id: "cr7",
        name: "Pina Colada Crepe",
        pricePerPerson: 7,
        desc: "Pineapple, coconut cream and white chocolate.",
      },
      {
        id: "cr8",
        name: "Fettuccine Crepe",
        pricePerPerson: 8,
        desc: "Classic Belgian chocolate fettuccine strips.",
      },
    ],
  },
  {
    category: "Waffles",
    icon: "🧇",
    items: [
      {
        id: "wf1",
        name: "Chocolate Waffle",
        pricePerPerson: 7,
        desc: "Classic Belgian waffle with rich chocolate.",
      },
      {
        id: "wf2",
        name: "Melt n Dip Waffle",
        pricePerPerson: 8,
        desc: "Our signature waffle with chocolate pour.",
      },
      {
        id: "wf3",
        name: "Brownies Waffle",
        pricePerPerson: 8,
        desc: "Brownie-style waffle with fudge drizzle.",
      },
      {
        id: "wf4",
        name: "Lotus Waffle",
        pricePerPerson: 8,
        desc: "Biscoff spread with caramelised waffle.",
      },
      {
        id: "wf5",
        name: "Knefe Waffle Cup",
        pricePerPerson: 9,
        desc: "Knefe-inspired waffle with cheese and syrup.",
      },
    ],
  },
  {
    category: "Platters & Bites",
    icon: "🍢",
    items: [
      {
        id: "pb1",
        name: "Fruit Sticks",
        pricePerPerson: 4,
        desc: "Fresh fruit skewers with Belgian chocolate dip.",
      },
      {
        id: "pb2",
        name: "Brownie Bites",
        pricePerPerson: 4,
        desc: "Bite-sized Belgian chocolate brownies.",
      },
      {
        id: "pb3",
        name: "Éclair Bites",
        pricePerPerson: 5,
        desc: "Mini cream éclairs with chocolate glaze.",
      },
      {
        id: "pb4",
        name: "Marshmallow Chocolate Skewers",
        pricePerPerson: 4,
        desc: "Toasted marshmallows dipped in Belgian chocolate.",
      },
      {
        id: "pb5",
        name: "Belgian Chocolate Dipping Platter",
        pricePerPerson: 6,
        desc: "Mixed dipping platter with premium Belgian chocolate.",
      },
    ],
  },
  {
    category: "Gelato & Drinks",
    icon: "🍦",
    items: [
      {
        id: "gd1",
        name: "Artisan Gelato Cups",
        pricePerPerson: 5,
        desc: "Authentic Italian-style gelato scoops.",
      },
      {
        id: "gd2",
        name: "Karak Chai",
        pricePerPerson: 3,
        desc: "Our signature pre-sweetened Karak chai blend.",
      },
      {
        id: "gd3",
        name: "Masala Chai",
        pricePerPerson: 3,
        desc: "Aromatic masala spiced chai, pre-sweetened.",
      },
      {
        id: "gd4",
        name: "Cardamom Chai",
        pricePerPerson: 3,
        desc: "Fragrant cardamom chai blend.",
      },
      {
        id: "gd5",
        name: "Black Signature Coffee",
        pricePerPerson: 3,
        desc: "Rich, bold signature coffee.",
      },
      {
        id: "gd6",
        name: "Fresh Juice",
        pricePerPerson: 4,
        desc: "Curated fresh juices - limited choices.",
      },
    ],
  },
];

export const MENU_CATEGORIES = [
  {
    id: "cake",
    label: "Cake",
    Icon: Cherry,
    items: [
      {
        name: "Lava Cake",
        img: `${CDN}/2022/06/lava_cake-110x110.jpg`,
        desc: "Warm lava cake with gelato and Belgian chocolate, garnished with whipped cream",
      },
      {
        name: "Flake Sense",
        img: `${CDN}/2022/06/flake_sense-110x110.jpg`,
        desc: "Rice crispies, vanilla gelato & Belgian Chocolate",
      },
      {
        name: "Brownies Magic",
        img: `${CDN}/2022/06/brownies_magic-110x110.jpg`,
        desc: "Vanilla gelato, chocolate brownies, strawberries & Belgian Chocolate",
      },
    ],
  },
  {
    id: "crepes",
    label: "Crepes",
    Icon: CakeSlice,
    items: [
      {
        name: "Melt n Dip Crepe",
        img: `${CDN}/2022/06/melt_n_dip_crepe-110x110.jpg`,
        desc: "French crepe with strawberry, banana, pineapple, kiwi & Belgian Chocolate",
      },
      {
        name: "Banana Wrap",
        img: `${CDN}/2022/06/banana_wrap_crepe-110x110.jpg`,
        desc: "Full banana in special cream, wrapped in crepe with Belgian Chocolate",
      },
      {
        name: "Fettuccine Crepe",
        img: `${CDN}/2022/06/fettuccine_crepe-110x110.jpg`,
        desc: "Crepe cut fettuccini style with vanilla gelato & Belgian Chocolate",
      },
      {
        name: "Y.O.L.O. Crepe",
        img: `${CDN}/2020/06/yolo_crepe-110x110.jpg`,
        desc: "Crepe stuffed with Oreo and special cream topped with Belgian Chocolate",
      },
      {
        name: "Rocky Road Crepe",
        img: `${CDN}/2020/09/rocky_road_crepe-110x110.png`,
        desc: "Marshmallow-filled crepe with three kinds of Belgian Chocolate",
      },
      {
        name: "Triple Chocolate Crepe",
        img: `${CDN}/2020/09/triple_chocolate_crepe-110x110.jpg`,
        desc: "Folded crepe, topped with Milk, Dark, and White Belgian Chocolate",
      },
      {
        name: "Brownies Crepe",
        img: `${CDN}/2022/06/brownies_crepe-110x110.jpg`,
        desc: "Crepe filled with brownies and patisserie cream, topped with Belgian Chocolate",
      },
      {
        name: "Cream & Dream Crepe",
        img: `${CDN}/2022/06/cream_and_dream_crepe-110x110.jpg`,
        desc: "Crunchy crepe filled with Melt n Dip special cream & Belgian Chocolate",
      },
      {
        name: "Lotus Crepe",
        img: `${CDN}/2022/06/lotus_crepe-110x110.jpg`,
        desc: "Lotus butter crowned with a trio of Belgian Chocolate and lotus biscuit",
      },
      {
        name: "Pina Colada Crepe",
        img: `${CDN}/2022/06/pina_colada_crepe-110x110.jpg`,
        desc: "Crepe with coconut, pineapple & special cream topped with Belgian Chocolate",
      },
      {
        name: "Red Velvet Fettuccine",
        img: `${CDN}/2022/06/red_velvet_fettuccine_crepe-110x110.jpg`,
        desc: "Red velvet crepe with vanilla gelato & Belgian Chocolate",
      },
      {
        name: "Banana Cinnamon Crepe",
        img: `${CDN}/2022/06/banana_cinnamon_crepe_pouch-110x110.jpg`,
        desc: "Crepe with banana, cinnamon & special cream topped with Belgian Chocolate",
      },
      {
        name: "Apple Cinnamon Crepe",
        img: `${CDN}/2022/06/apple_cinnamon_crepe_pouch-110x110.jpg`,
        desc: "Crepe with apple, cinnamon & special cream topped with Belgian Chocolate",
      },
      {
        name: "Digestive Crepe",
        img: `${CDN}/2022/06/digestive_crepe-110x110.jpg`,
        desc: "Crepe with white chocolate and semi sweet biscuit, topped with Belgian Chocolate",
      },
    ],
  },
  {
    id: "dipstick",
    label: "Dip Stick",
    Icon: Candy,
    items: [
      {
        name: "Fruit Stick",
        img: `${CDN}/2022/06/fruit_stick-110x110.jpg`,
        desc: "Skewer of fruits, brownies, eclair & marshmallow dipped in Belgian Chocolate",
      },
      {
        name: "Eclair Pyramid",
        img: `${CDN}/2022/06/eclair_pyramid-110x110.jpg`,
        desc: "Eclairs filled with special cream and covered with Belgian chocolate",
      },
      {
        name: "My Passion for 1",
        img: `${CDN}/2022/06/my_passion-110x110.jpg`,
        desc: "Full plate of fruits, brownies, eclair & marshmallow with Belgian Chocolate",
      },
    ],
  },
  {
    id: "drinks",
    label: "Drink it Hot",
    Icon: Coffee,
    items: [
      {
        name: "Turkish Coffee",
        img: `${CDN}/2019/06/01-1-110x110.png`,
        desc: "100% Natural Arabica or Robusta, 30 ml cup",
      },
      {
        name: "Espresso",
        img: `${CDN}/2019/06/06-1-110x110.png`,
        desc: "Coffee 50%, milk 50%, 280 ml",
      },
      {
        name: "Americano",
        img: `${CDN}/2019/06/01-1-110x110.png`,
        desc: "100% Natural Arabica or Robusta, 30 ml cup",
      },
      {
        name: "Cappuccino",
        img: `${CDN}/2019/06/02-1-110x110.png`,
        desc: "Coffee & milk",
      },
      {
        name: "Cafe Latte",
        img: `${CDN}/2019/06/03-1-110x110.png`,
        desc: "Smooth espresso and steamed milk",
      },
      {
        name: "Caramel Macchiato",
        img: `${CDN}/2019/06/05-1-110x110.png`,
        desc: "Rich espresso with caramel",
      },
      {
        name: "Espresso Macchiato",
        img: `${CDN}/2019/06/08-110x110.png`,
        desc: "Espresso macchiato",
      },
      {
        name: "White Chocolate Mocha",
        img: `${CDN}/2019/06/07-110x110.png`,
        desc: "Coffee 30%, milk 50%, Water 20%, 280 ml + foam",
      },
      { name: "Tea", img: `${CDN}/2022/06/tea-110x110.png`, desc: "Black Tea" },
    ],
  },
  {
    id: "gelato",
    label: "Fruits & Gelato",
    Icon: IceCreamCone,
    items: [
      {
        name: "Nutella Fruit Salad",
        img: `${CDN}/2022/10/nutella_fruit_salad-110x110.jpg`,
        desc: "Nutella, Strawberry, Banana, special cream & whipped cream",
      },
      {
        name: "Fruit Salad",
        img: `${CDN}/2022/10/fruit_salad-110x110.jpg`,
        desc: "Seasonal fresh fruits with Keshta, cashews, almonds & honey",
      },
      {
        name: "Royal Fruit Salad",
        img: `${CDN}/2022/10/royal_fruit_salad-110x110.jpg`,
        desc: "Seasonal fruits topped with Raspberry and Mango Gelato",
      },
      {
        name: "Lotus Salad",
        img: `${CDN}/2022/10/lotus_salad-110x110.jpg`,
        desc: "Lotus butter, strawberry, banana & Melt n Dip special cream",
      },
      {
        name: "Damascene Ice Cream",
        img: `${CDN}/2022/10/damascene_ice_cream-110x110.jpg`,
        desc: "Homemade ice cream damascene style with keshta & pistachio",
      },
      {
        name: "Banana Split",
        img: `${CDN}/2022/10/banana_split-110x110.jpg`,
        desc: "Trio of vanilla, strawberry & chocolate gelato with homemade hot fudge",
      },
    ],
  },
  {
    id: "waffles",
    label: "Waffles",
    Icon: Cookie,
    items: [
      {
        name: "Melt n Dip Waffle",
        img: `${CDN}/2022/06/melt_n_dip_waffle-110x110.jpg`,
        desc: "Toasted waffle with fresh fruits topped with three kinds of Belgian Chocolate (Milk, Dark, and White)",
      },
      {
        name: "Chocolate Waffle",
        img: `${CDN}/2022/06/chocolate_waffle-110x110.jpg`,
        desc: "Toasted waffle topped with three kinds of Belgian Chocolate",
      },
      {
        name: "Knefe Waffle Cup",
        img: `${CDN}/2022/06/knefe_waffle_cup-110x110.jpg`,
        desc: "Waffle cup stuffed with kanafeh and white chocolate, topped with Belgian Chocolate",
      },
      {
        name: "Brownies Waffle",
        img: `${CDN}/2022/06/brownies_waffle-110x110.jpg`,
        desc: "Toasted waffle topped with brownies dipped in Belgian Chocolate",
      },
      {
        name: "Lotus Waffle",
        img: `${CDN}/2022/06/lotus_waffle-110x110.jpg`,
        desc: "Lotus biscuit crumbs, butter spread, White Belgian Chocolate & Lotus gelato",
      },
      {
        name: "Lovely Cookies",
        img: `${CDN}/2022/10/lovely_cookies-110x110.jpg`,
        desc: "Fresh baked chocolate chip cookie with vanilla gelato & Belgian Chocolate",
      },
    ],
  },
];

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
    name: "Premium Melt n Dip",
    min: 18,
    max: 25,
    desc: "Crepes, waffles, gelato, fruit cups, premium chocolate station.",
  },
];

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

export const SERVICE_STYLES = [
  "Drop-Off (no staff)",
  "Delivery & Setup",
  "Live Crepe / Waffle Station",
  "Full-Service Staffed Catering",
  "Food Truck",
];

export const FAQS = [
  {
    q: "What is the minimum spend?",
    a: "In-house / external catering: $750 minimum food spend. Food truck: $1,500 minimum food spend. Both exclude labor, delivery, and tax.",
  },
  {
    q: "What do you serve?",
    a: "Belgian chocolate fountains, artisan gelato, fresh crepes, waffles, fruit displays, brownie bites, éclairs, Dubai Chocolate Strawberry Cups, and signature chai and coffee beverages. All 100% Halal-certified.",
  },
  {
    q: "What hours are you available?",
    a: "External events: 12:00 noon to 10:00pm. Store rentals: 12:00 noon to 12:00 midnight. Special requests considered based on availability.",
  },
  {
    q: "Is outside food allowed?",
    a: "No outside food or beverages permitted. All food must be provided by Delight Enterprises / Melt n Dip.",
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

// Shared type
export type BagItem = {
  id: string;
  name: string;
  category: string;
  pricePerPerson: number;
  quantity: number;
};
