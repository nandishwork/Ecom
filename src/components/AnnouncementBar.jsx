import React from 'react';

const AnnouncementBar = () => {
  const content = "FREE SHIPPING ON ORDERS OVER ₹5,000 • USE CODE: HIVNK15 FOR ₹1,500 OFF • SHOP THE NEW WINTER COLLECTION NOW • DISCOUNTS UP TO 50% OFF FOR A LIMITED TIME • JOIN THE HIVNK CLUB FOR EXCLUSIVE ACCESS • ";

  return (
    <div className="w-full bg-black text-white h-10 flex items-center overflow-hidden border-t border-gray-800">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-xs uppercase tracking-widest px-4 font-light">
          {content}
        </span>
        <span className="text-xs uppercase tracking-widest px-4 font-light">
          {content}
        </span>
        <span className="text-xs uppercase tracking-widest px-4 font-light">
          {content}
        </span>
      </div>
    </div>
  );
};

export default AnnouncementBar;
