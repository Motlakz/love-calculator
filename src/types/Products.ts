export interface ProductPrice {
    amount: number;
    currency: string;
    formatted: string;
}

export interface ProductImage {
    url: string;
    alt: string;
    width: number;
    height: number;
}

export interface Product {
    id: string;
    name: string;
    price: ProductPrice;
    description: string;
    image: ProductImage;
    slug: string;
    affiliateLink: string;
}
  
export const Products: Product[] = [
    // Christmas Gifts
    {
        id: '1',
        name: "Smart Home Assistant Bundle",
        price: {
            amount: 59.99,
            currency: 'USD',
            formatted: '$59.99'
        },
        description: "Complete smart home starter kit with voice assistant, smart bulbs, and plug",
        image: {
            url: "https://m.media-amazon.com/images/I/61KZBhfB-WL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Smart Home Assistant Bundle",
            width: 300,
            height: 300
        },
        slug: "smart-home-assistant-bundle",
        affiliateLink: "https://amzn.to/3P47MIe"
    },
    {
        id: '2',
        name: "Premium Coffee Maker",
        price: {
            amount: 1498.96,
            currency: 'USD',
            formatted: '$1498.96'
        },
        description: "Programmable coffee maker with built-in grinder and thermal carafe",
        image: {
            url: "https://m.media-amazon.com/images/I/71TyNnCKhnL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Premium Coffee Maker",
            width: 300,
            height: 300
        },
        slug: "premium-coffee-maker",
        affiliateLink: "https://amzn.to/3VON9n7"
    },
    {
        id: '3',
        name: "Wireless Noise-Cancelling Earbuds",
        price: {
            amount: 24.99,
            currency: 'USD',
            formatted: '$24.99'
        },
        description: "True wireless earbuds with active noise cancellation and premium sound",
        image: {
            url: "https://m.media-amazon.com/images/I/411NxOSWI5L._AC_UY327_FMwebp_QL65_.jpg",
            alt: "Wireless Earbuds",
            width: 300,
            height: 300
        },
        slug: "wireless-noise-cancelling-earbuds",
        affiliateLink: "https://amzn.to/3VQJ1Tr"
    },
    {
        id: '4',
        name: "Digital Photo Frame",
        price: {
            amount: 139.99,
            currency: 'USD',
            formatted: '$139.99'
        },
        description: "HD digital photo frame with cloud sync and touchscreen controls",
        image: {
            url: "https://m.media-amazon.com/images/I/81muIfSfIVL._AC_UY327_FMwebp_QL65_.jpg",
            alt: "Digital Photo Frame",
            width: 300,
            height: 300
        },
        slug: "digital-photo-frame",
        affiliateLink: "https://amzn.to/408YaCs"
    },
    {
        id: '5',
        name: "Luxury Watch Set",
        price: {
            amount: 114.99,
            currency: 'USD',
            formatted: '$114.99'
        },
        description: "Elegant watch set with interchangeable bands and smart features",
        image: {
            url: "https://m.media-amazon.com/images/I/819Cz1sfPlL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Luxury Watch Set",
            width: 300,
            height: 300
        },
        slug: "luxury-watch-set",
        affiliateLink: "https://amzn.to/4iGpyil"
    },

    // Valentine's Day Gifts
    {
        id: '6',
        name: "Godiva Chocolatier Chocolate Gift Box",
        price: {
            amount: 38.10,
            currency: 'USD',
            formatted: '$38.10'
        },
        description: "Handcrafted premium chocolates in an elegant gift box",
        image: {
            url: "https://m.media-amazon.com/images/I/81BWKR3SepL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Godiva Chocolate Assorted",
            width: 300,
            height: 300
        },
        slug: "luxury-chocolate-collection",
        affiliateLink: "https://amzn.to/41FQb0J"
    },
    {
        id: '7',
        name: "Rose Gold Jewelry Set",
        price: {
            amount: 49.76,
            currency: 'USD',
            formatted: '$49.76'
        },
        description: "Elegant necklace, bracelet, and earring set with genuine diamonds",
        image: {
            url: "https://m.media-amazon.com/images/I/715gK1QObHL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Rose Gold Jewelry Set",
            width: 300,
            height: 300
        },
        slug: "rose-gold-jewelry-set",
        affiliateLink: "https://amzn.to/4gPBTPv"
    },
    {
        id: '8',
        name: "Couples Spa Experience",
        price: {
            amount: 42.99,
            currency: 'USD',
            formatted: '$42.99'
        },
        description: "Luxury spa day package for two with massage and treatments",
        image: {
            url: "https://m.media-amazon.com/images/I/71vBTYQPipL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Couples Spa Experience",
            width: 300,
            height: 300
        },
        slug: "couples-spa-experience",
        affiliateLink: "https://amzn.to/3ZQHTjW"
    },
    {
        id: '9',
        name: "Couple Cooking Set",
        price: {
            amount: 24.95,
            currency: 'USD',
            formatted: '$24.95'
        },
        description: "Curated selection of couples cooking sets",
        image: {
            url: "https://m.media-amazon.com/images/I/810gv0np62L._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Couples Cooking Set",
            width: 300,
            height: 300
        },
        slug: "couples-cooking-experience",
        affiliateLink: "https://amzn.to/4iOYZaM"
    },
    {
        id: '10',
        name: "Designer Perfume Collection",
        price: {
            amount: 189.99,
            currency: 'USD',
            formatted: '$189.99'
        },
        description: "Luxury perfume gift set with three signature scents",
        image: {
            url: "https://m.media-amazon.com/images/I/71jIaPZ3xpL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Designer Perfume Collection",
            width: 300,
            height: 300
        },
        slug: "designer-perfume-collection",
        affiliateLink: "https://amzn.to/3P6uxLp"
    },

    // Birthday Gifts
    {
        id: '11',
        name: "Premium Gaming Accessories",
        price: {
            amount: 74.99,
            currency: 'USD',
            formatted: '$74.99'
        },
        description: "Latest gaming accessories",
        image: {
            url: "https://m.media-amazon.com/images/I/61r0Tel9wUL._AC_UY327_FMwebp_QL65_.jpg",
            alt: "Premium Gaming Accessories",
            width: 300,
            height: 300
        },
        slug: "premium-gaming-console",
        affiliateLink: "https://amzn.to/3P8OvFy"
    },
    {
        id: '12',
        name: "Designer Handbag",
        price: {
            amount: 56.99,
            currency: 'USD',
            formatted: '$56.99'
        },
        description: "Luxury leather handbag from top designer brand",
        image: {
            url: "https://m.media-amazon.com/images/I/71BeYXHbLnL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Designer Handbag",
            width: 300,
            height: 300
        },
        slug: "designer-handbag",
        affiliateLink: "https://amzn.to/3WezxSv"
    },
    {
        id: '13',
        name: "4K Drone with Camera",
        price: {
            amount: 129.99,
            currency: 'USD',
            formatted: '$129.99'
        },
        description: "Professional-grade drone with 4K camera and stabilization",
        image: {
            url: "https://m.media-amazon.com/images/I/817EFbc8DzL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "4K Drone with Camera",
            width: 300,
            height: 300
        },
        slug: "4k-drone-camera",
        affiliateLink: "https://amzn.to/403gyMR"
    },
    {
        id: '14',
        name: "Luxury Skincare Set",
        price: {
            amount: 89.00,
            currency: 'USD',
            formatted: '$89.00'
        },
        description: "Complete premium skincare collection with anti-aging treatments",
        image: {
            url: "https://m.media-amazon.com/images/I/717AmO+LuIL._AC_UL480_FMwebp_QL65_.jpg",
            alt: "Luxury Skincare Set",
            width: 300,
            height: 300
        },
        slug: "luxury-skincare-set",
        affiliateLink: "https://amzn.to/4049XBH"
    }
];
