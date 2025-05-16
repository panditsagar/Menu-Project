
import React from "react";
import { useLocation } from 'react-router-dom';
const menuItems = [
    {
        id: 1,
        title: "Tartare Topped With Avocado",
        description: "crispy corn, Japanese mayo, sriracha, scallion, tobanjan.",
        price: 625,
        labels: ["DF", "GF"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_929583_1725619015057_Capture.PNG",
    },
    {
        id: 2,
        title: "Mushroom Googly Dim Sum",
        description: "assorted wild mushrooms, cream cheese, vegetarian broth...",
        price: 625,
        labels: ["POPULAR"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_1030396_1740049859160_Capture2.PNG",
    },
    {
        id: 3,
        title: "Super Food Salad",
        description: "assorted mesclun greens, roasted pumpkin seeds, watermelon, amaranth puff.",
        price: 525,
        labels: ["VE", "GF"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_543992_1726580344905_DSC00025.jpg",
    },
    {
        id: 4,
        title: "Classic Chicken Burger",
        description: "crispy chicken patty with mayo and lettuce in a toasted bun.",
        price: 199,
        labels: ["DF"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_543994_1726580442376_DSC00153.jpg",
    },
    {
        id: 5,
        title: "Paneer Wrap",
        description: "paneer tikka wrapped with veggies and spicy mint chutney.",
        price: 249,
        labels: ["VEG", "SPICY"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_543998_1726645913381_DSC00455.jpg",
    },
    {
        id: 6,
        title: "Peri Peri Fries",
        description: "crisp fries tossed in spicy peri peri seasoning.",
        price: 99,
        labels: ["VE"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_750794_1702549698.802454.png",
    },
    {
        id: 7,
        title: "Masala Lemonade",
        description: "refreshing lemonade with a twist of Indian spices.",
        price: 75,
        labels: ["VE", "GF"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_955088_1738071471888_Ceasar_salad_.jpg",
    },
    {
        id: 8,
        title: "Veggie Delight Pizza",
        description: "cheesy pizza with peppers, onions, olives, and mushrooms.",
        price: 399,
        labels: ["VEG"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_955103_1738064012211_Mushroom_galouti.jpg",
    },
    {
        id: 9,
        title: "Choco Lava Cake",
        description: "rich chocolate cake with molten chocolate center.",
        price: 120,
        labels: ["POPULAR", "VEG"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_955107_1738064360523_Avocado_flat_bread.jpg",
    },
    {
        id: 10,
        title: "Iced Americano",
        description: "bold espresso poured over ice, served chilled.",
        price: 150,
        labels: ["DF", "GF"],
        imageUrl: "https://airmenusimages.blr1.cdn.digitaloceanspaces.com/item/item_955109_1737539910955_Tandoori_chicken.jpg",
    },
];

const MenuItems = () => {
    const location = useLocation();
    const category = location.state?.category;
    const Loading = false
    return (
        <>
            <div className="p-4 pb-2">
                <h1 className="text-black text-3xl font-semibold px-1">{category.name}</h1>
                <hr className="text-gray-300" />
            </div>
            <div className="p-4 w-full mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">

                {menuItems.map((item) => (
                    <div key={item.id} className="flex bg-white overflow-hidden">

                        {Loading ? (<div className="w-1/2 h-full object-cover">
                            <img
                                src="/loading-Image.gif"
                                alt=""
                                className="h-[180px] object-cover"
                            />
                        </div>) : <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-1/2 h-full object-cover"
                        />}

                        <div className="flex flex-col justify-between flex-1 bg-[#F6F6F6] px-2 py-4">
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-base font-semibold text-gray-900 leading-none">{item.title}</h3>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                                <div className="text-xs text-green-600 font-medium mt-1">
                                    {item.labels.filter(label => label !== "POPULAR").join(" | ")}
                                </div>
                            </div>
                            <div className="text-sm font-semibold text-gray-800 mt-2">₹{item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MenuItems;
