// 'use client';

// import React, { useState } from 'react';

// export function TopAlertBar() {
//     const [isVisible, setIsVisible] = useState(true);

//     if (!isVisible) return null;

//     return (
//         <div className="relative bg-[#fb8a9f] text-black px-4 py-2 flex items-center justify-center z-[60]">
//             <p className="text-sm font-medium pr-8 sm:pr-0">
//                 🚀 Launching SwapSkill Beta! Join now and get 3 free skill swap credits.
//             </p>
//             <button
//                 onClick={() => setIsVisible(false)}
//                 className="absolute right-4 w-6 h-6 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"
//                 aria-label="Close alert"
//             >
//                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <line x1="18" y1="6" x2="6" y2="18"></line>
//                     <line x1="6" y1="6" x2="18" y2="18"></line>
//                 </svg>
//             </button>
//         </div>
//     );
// }
