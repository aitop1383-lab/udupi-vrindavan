import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faWhatsapp, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FaTripadvisor } from "react-icons/fa";
/**
 * Site Configuration Data
 * This file contains all shared strings, links, and icons used across multiple components.
 */

export const CONTACT_DETAILS = {
    address: "FB04, WASL Opal, Street 26, Al Karama, Dubai, UAE",
    phone: "+971 42 7253 23",
    whatsapp: "+971 56 301 8186",
    email: "info@UdupiVrindavan.com",
    whatsappLink: "https://wa.me/971563018186",
    googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.358210350702!2d55.3080703!3d25.247057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE0JzQ5LjQiTiA1NcKwMTgnMzYuOSJF!5e0!3m2!1sen!2sae!4v1710440000000!5m2!1sen!2sae",
    googleMapsDirect: "https://www.google.com/maps/search/?api=1&query=25.247057,55.310259"
};

export const SOCIAL_LINKS = [
    {
        id: 'ig',
        name: 'Instagram',
        href: 'https://www.instagram.com/udupivrindavan/',
        icon: Instagram,
        isLucide: true,
        hoverColor: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:to-[#ee2a7b]"
    },
    {
        id: 'fb',
        name: 'Facebook',
        href: 'https://www.facebook.com/UdupiVrindavan/',
        icon: Facebook,
        isLucide: true,
        hoverColor: "hover:bg-[#1877F2]"
    },
    {
        id: 'yt',
        name: 'Youtube',
        href: 'https://www.youtube.com/@udupivrindavan',
        icon: Youtube,
        isLucide: true,
        hoverColor: "hover:bg-[#FF0000]"
    },
    {
        id: 'x',
        name: 'Twitter',
        href: 'https://x.com/UdupiVrindavan',
        icon: faXTwitter,
        isLucide: false,
        hoverColor: "hover:bg-black"
    },
    {
        id: 'g',
        name: 'Google',
        href: 'https://www.google.com/maps/place/Udupi+Vrindavan+Restaurant+LLC/@25.2471236,55.3103148,17z/data=!4m6!3m5!1s0x3e5f43dbc7060cb9:0xfc696ec76610e8d!8m2!3d25.2471236!4d55.3103148!16s%2Fg%2F11ltjbh3f7?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D',
        icon: faGoogle,
        isLucide: false,
        hoverColor: "hover:bg-[#4285F4]"
    },

    {
        id: 't',
        name: "Tripadvisor",
        href: "https://www.tripadvisor.in/Restaurant_Review-g295424-d32750588-Reviews-Udupi_Vrindavan-Dubai_Emirate_of_Dubai.html",
        icon: FaTripadvisor,
        isLucide: true,
        hoverColor: "hover:bg-[#00AF87]"
    }
];

export const DELIVERY_PARTNERS = [
    { name: "Noon", logo: "/noon.png", bgColor: "#F3D506", link: "https://www.noon.com/" },
    { name: "Careem", logo: "/careem.png", bgColor: "#C2FFE4", link: "https://www.careem.com/" },
    { name: "Talabat", logo: "/talabat.png", bgColor: "#FFFFFF", link: "https://www.talabat.com/" },
    { name: "Deliveroo", logo: "/deliveroo.png", bgColor: "#CBFFFB", link: "https://deliveroo.ae/" },
    { name: "Smiles", logo: "/smiles.png", bgColor: "#8240FA", link: "https://smiles.ae/" },
    { name: "Keeta", logo: "/keeta.png", bgColor: "#FFD200", link: "https://keeta.ae/" }
];

export const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Visit Udupi", href: "/visit-udupi" },
    { name: "About Us", href: "/about-us" },
    { name: "Heritage", href: "/heritage" },
    { name: "Our Commitment", href: "/our-commitment" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Order Online", href: "https://order.udupivrindavan.com" }
];



/**
 * Food Journey / Process Steps
 * Details the 6-step journey of quality and service.
 */
export const FOOD_JOURNEY_STEPS = [
    {
        id: "01",
        title: "Hire the Best",
        desc: "We only hire experienced cooks from Karnataka. They collectively have decades of experience."
    },
    {
        id: "02",
        title: "Right Equipment",
        desc: "Our dosa tawa, idli steamer and many specialised equipment are imported from India."
    },
    {
        id: "03",
        title: "Quality Sourcing",
        desc: "Our suppliers, from Karnataka, deliver vegetables every day and ingredients weekly. So you always eat the freshest food."
    },
    {
        id: "04",
        title: "Your Preferences",
        desc: "Our Kannada speaking Front of House staff inform the cooks of your preferences (less salt, no onion, spiciness etc.)"
    },
    {
        id: "05",
        title: "Cook with Love",
        desc: "Working 10 hours in front of kitchen fire isn’t easy!! We take care of our employees very well so that their happiness reflects into the food."
    },
    {
        id: "06",
        title: "Star Hospitality",
        desc: "Our Front of House staff always strive to fulfil your culinary expectations. Though all speak Kannada, they can speak multiple languages!"
    },
];


/**
 * Employee Commitment & Benefits Data
 * Organized by categories with bilingual (English/Kannada) support.
 */
export const EMPLOYEE_BENEFITS = [
    {
        title: "Worker Welfare",
        kannadaTitle: "ಸಿಬ್ಬಂದಿ ಸೌಖ್ಯ",
        // Passing the icon as a component name or pre-rendered element
        // Note: Since siteConfig is a .tsx file, we can keep the JSX icons here
        items: [
            "Though our staff work some of the lowest hours in F&B industry, we have arranged expensive accommodation at walking distance.",
            "If an employee decides to leave, we never force them to unpaid work. Similarly, if an employee family member abroad is unwell, we arrange complimentary flights.",
            "We do not illegally 'retain' employee passports. But we do operate a 'three strikes' policy for unacceptable attitude."
        ],
        kannadaItems: [
            "ನಮ್ಮ ಸಿಬ್ಬಂದಿ ಕಡಿಮೆ ಸಮಯ ಕೆಲಸ ಮಾಡಿದರೂ, ಅವರ ಅನುಕೂಲಕ್ಕಾಗಿ ಸಮೀಪದಲ್ಲಿ ಉತ್ತಮ ವಸತಿ ವ್ಯವಸ್ಥೆ ಮಾಡಿದ್ದೇವೆ.",
            "ಕೆಲಸ ಬಿಡುವವರಿಗೆ ಯಾವುದೇ ಒತ್ತಾಯ ಮಾಡುವುದಿಲ್ಲ. ವಿದೇಶದಲ್ಲಿರುವ ಉದ್ಯೋಗಿಯ ಕುಟುಂಬದವರಿಗೆ ಆರೋಗ್ಯ ಸರಿ ಇಲ್ಲದಿದ್ದರೆ ಉಚಿತ ವಿಮಾನ ವ್ಯವಸ್ಥೆ ಮಾಡುತ್ತೇವೆ.",
            "ನಾವು ಉದ್ಯೋಗಿಗಳ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗಳನ್ನು ಇಟ್ಟುಕೊಳ್ಳುವುದಿಲ್ಲ. ಆದರೆ ಶಿಸ್ತಿನ ವಿಚಾರದಲ್ಲಿ ರಾಜಿ ಮಾಡಿಕೊಳ್ಳುವುದಿಲ್ಲ."
        ]
    },
    {
        title: "Empowerment",
        kannadaTitle: "ಸಬಲೀಕರಣ",
        items: [
            "Our cooks have final decision on supplier selection. Similarly, our Front of House staff are empowered to give discounts and full refunds.",
            "Everyone of our staff has direct communication with the owner to offer feedback and express concerns.",
            "Almost all our staff are internal referrals which generates trust in the organisation and colleagues."
        ],
        kannadaItems: [
            "ಅಡುಗೆಯವರಿಗೆ ಗುಣಮಟ್ಟದ ವಸ್ತುಗಳ ಆಯ್ಕೆಯ ಅಧಿಕಾರ ನೀಡಲಾಗಿದೆ. ಗ್ರಾಹಕರಿಗೆ ರಿಯಾಯಿತಿ ನೀಡುವ ಅಧಿಕಾರವನ್ನು ಸಿಬ್ಬಂದಿಗೆ ನೀಡಿದ್ದೇವೆ.",
            "ಸಿಬ್ಬಂದಿ ಮಾಲೀಕರೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ ಹೊಂದಿದ್ದು, ತಮ್ಮ ಅನಿಸಿಕೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಬಹುದು.",
            "ನಮ್ಮ ಹೆಚ್ಚಿನ ಸಿಬ್ಬಂದಿ ಶಿಫಾರಸಿನ ಮೂಲಕ ಬಂದವರಾಗಿದ್ದು, ಪರಸ್ಪರ ನಂಬಿಕೆಯಿಂದ ಕೆಲಸ ಮಾಡುತ್ತಾರೆ."
        ]
    },
    {
        title: "Remuneration",
        kannadaTitle: "ಸಂಭಾವನೆ",
        items: [
            "Above-market wages plus additional 20% hourly wage for overtime (no compulsion).",
            "Paid annual leave with direct flight tickets to visit families.",
            "Premium medical insurance and interest-free salary advances to avoid loan sharks."
        ],
        kannadaItems: [
            "ಮಾರುಕಟ್ಟೆಗಿಂತ ಹೆಚ್ಚಿನ ವೇತನ ಮತ್ತು ಹೆಚ್ಚುವರಿ ಕೆಲಸಕ್ಕೆ 20% ಅಧಿಕ ವೇತನ ನೀಡುತ್ತೇವೆ.",
            "ವೇತನದೊಂದಿಗೆ ವಾರ್ಷಿಕ ರಜೆ ಮತ್ತು ಕುಟುಂಬವನ್ನು ಭೇಟಿ ಮಾಡಲು ವಿಮಾನ ಟಿಕೆಟ್ ನೀಡುತ್ತೇವೆ.",
            "ದುಬಾರಿ ವೈದ್ಯಕೀಯ ವಿಮೆ ಮತ್ತು ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ಬಡ್ಡಿಯಿಲ್ಲದ ಮುಂಗಡ ವೇತನ ನೀಡುತ್ತೇವೆ."
        ]
    },
    {
        title: "Training",
        kannadaTitle: "ತರಬೇತಿ",
        items: [
            "We undertake 360 degree feedback every quarter and educate staff.",
            "Provided kitchen staff with POS and KOT software in Kannada to overcome language issues.",
            "Share customer feedback and mystery shopper findings for continual improvement."
        ],
        kannadaItems: [
            "ಪ್ರತಿ ಮೂರು ತಿಂಗಳಿಗೊಮ್ಮೆ ಸಿಬ್ಬಂದಿಗೆ ಅಗತ್ಯ ತರಬೇತಿ ನೀಡುತ್ತೇವೆ.",
            "ಸುಲಭವಾಗಿ ಕೆಲಸ ನಿರ್ವಹಿಸಲು ಕನ್ನಡದಲ್ಲೇ ಇರುವ POS ಮತ್ತು KOT ಸಾಫ್ಟ್‌ವೇರ್‌ಗಳನ್ನು ನೀಡಿದ್ದೇವೆ.",
            "ಗ್ರಾಹಕರ ಅನಿಸಿಕೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಮೂಲಕ ಸೇವೆಯ ಗುಣಮಟ್ಟವನ್ನು ಹೆಚ್ಚಿಸುತ್ತೇವೆ."
        ]
    }
];



/**
 * Text-based Customer Reviews
 */
export const REVIEWS = [
    { name: "Purnendu Sinha", role: "Local Guide • 146 reviews", text: "Udupi Vrundavan in Karama is a hidden gem for anyone who loves authentic South Indian, especially traditional Kannada style food. The mini tiffin was perfectly balanced, the dosa crisp and light, and the chapati sagu truly reminded me of home. What truly touched my heart was their philosophy of donating food and helping the needy." },
    { name: "Nimmi", role: "Local Guide • 67 reviews", text: "Authentic Karnataka-style vegetarian restaurant that completely blew us away! No preservatives, no MSG, and they only use coconut oil. Ghee and butter are sourced from Karnataka’s trusted Nandini brand. It genuinely felt like a little slice of Karnataka in the heart of Dubai." },
    { name: "Syed Mohammed Faizuddin", role: "Local Guide • 7 reviews", text: "Real Udupi cuisine manifest. The dose was a buttery dream, perfectly crisp and flavorful. The sambar deserves special mention—easily the best I’ve had while eating out in Dubai. The filter coffee with jaggery was the perfect finish." },
    { name: "Unais Mahammad", role: "Regular Guest", text: "I visit Udupi Vrindavan on a daily basis, and it never disappoints. Butter Masala Dosa is easily the best I’ve had. Eating here truly feels like a 'home away from home'. Special thanks to Arjun, Chinmay, and Avinash for being so attentive." },
    { name: "Sarah Siraj", role: "Local Guide • 65 reviews", text: "We are big fans of Bangalore style breakfasts, and this was the most simple and authentic place we’ve been to. The staff was so welcoming, the moment you step in you feel transported back to India. The filter coffee was phenomenal." },
    { name: "Manjunath D", role: "Local Guide • 23 reviews", text: "Captures the authentic flavors of Karnataka. Their Pudi Dosa is absolutely amazing – perfectly crisp with a generous layer of spicy pudi. They prepare all dishes using coconut oil and pure ghee, which is impressive." }
];

/**
 * Video Testimonials
 * Note: thumbnails should be in /public/Thumbnail/ and videos in /public/videos/
 */
export const VIDEO_REVIEWS = [
    { id: 1, thumbnail: "/Thumbnail/Image-1.jpg", videoUrl: "/videos/video1.mp4" },
    { id: 2, thumbnail: "/Thumbnail/Image-2.jpg", videoUrl: "/videos/video2.mp4" },
    { id: 3, thumbnail: "/Thumbnail/Image-3.jpg", videoUrl: "/videos/video3.mp4" },
    { id: 4, thumbnail: "/Thumbnail/Image-4.jpg", videoUrl: "/videos/video4.mp4" },
    { id: 5, thumbnail: "/Thumbnail/Image-5.jpg", videoUrl: "/videos/video5.mp4" },
    { id: 6, thumbnail: "/Thumbnail/Image-6.jpg", videoUrl: "/videos/video6.mp4" }
];


/**
 * Visit Udupi Page Content
 */
export const UDUPI_FEATURES = [
    {
        title: "Spiritual Heritage",
        desc: "Experience the 13th-century Sri Krishna Temple, the epicenter of Dvaita philosophy and sacred traditions."
    },
    {
        title: "Coastal Beauty",
        desc: "Explore the Arabian Sea coastline, featuring unique basaltic rock formations and golden sand beaches."
    },
    {
        title: "Culinary Capital",
        desc: "Home to the world-renowned Udupi cuisine—a Satvik tradition that has conquered hearts globally."
    }
];

export const TRAVEL_MODES = [
    {
        type: "Air",
        title: "By Air",
        desc: "Mangalore International (IXE) is your gateway, located just 60km away from Udupi."
    },
    {
        type: "Train",
        title: "By Rail",
        desc: "The Konkan Railway route offers one of the most scenic train journeys in India."
    },
    {
        type: "Road",
        title: "By Road",
        desc: "Smooth connectivity via NH-66 with luxury bus services from major tech hubs like Bangalore."
    }
];

export const MUST_VISIT_PLACES = [
    {
        img: "/VisitUdupi_Gallery/temple.jpeg",
        title: "Sri Krishna Temple",
        desc: "A divine sanctuary featuring the unique 'Kanakana Kindi' window."
    },
    {
        img: "/VisitUdupi_Gallery/beach_udupi.jpeg",
        title: "Malpe Beach",
        desc: "Known for its pristine silver sands and the bustling Malpe fishing harbor."
    },
    {
        img: "/VisitUdupi_Gallery/ocean-rock.jpeg",
        title: "St Mary's Island",
        desc: "A geological marvel featuring columned basaltic lava rocks found nowhere else in India."
    }
];

export const CULTURE_GALLERY = [
    { src: "culture-tiger.jpeg", label: "Traditional Folk Dance" },
    { src: "templewater.jpeg", label: "Sacred Temple Tank" },
    { src: "templehome.jpeg", label: "Ancient Temple Architecture" },
    { src: "culture-fes.jpeg", label: "Spiritual Festivals" },
    { src: "ocean-light.jpeg", label: "Historic Lighthouse" },
    { src: "old-culture.jpeg", label: "Ancient Crafts" },
    { src: "old-culture2.jpeg", label: "Bustling Car Street" },
    { src: "ocean-green.jpeg", label: "Serene Beach" },
    { src: "ocean-rock.jpeg", label: "Unique Basalt Formations" },
];


export const UDUPI_GEOGRAPHY = {
    title: "The Jewel of the Karnataka Coast",
    desc: "Nestled between the emerald Western Ghats and the turquoise Arabian Sea, Udupi's geography creates a unique micro-climate that supports lush green landscapes and exotic biodiversity.",
    mapLink: "https://www.google.com/maps/place/Udupi,+Karnataka/@13.3318053,74.7058096,13z/data=!3m1!4b1!4m6!3m5!1s0x3bbcbb69938f41cf:0xcccc99e431850143!8m2!3d13.3439188!4d74.7474504!16zL20vMDJkN2xs?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D"
};

export const CUISINE_HIGHLIGHTS = [
    { name: "Ghee Roast Dosa", desc: "Crispy, spicy, and buttery" },
    { name: "Neer Dosa", desc: "Light and lacy rice crepes" },
    { name: "Kotte Kadubu", desc: "Idlis steamed in jackfruit leaves" },
    { name: "Filter Kaapi", desc: "The soul of South India" }
];