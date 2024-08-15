// import React from "react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white p-4 shadow-inner">
//       <div className="container mx-auto flex flex-wrap items-center justify-between">
//         <div className="flex space-x-4">
//           <Link to="/terms" className="hover:text-red-500">
//             Terms & Conditions
//           </Link>
//           <Link to="/privacy" className="hover:text-red-500">
//             Privacy Policy
//           </Link>
//           <Link to="/faq" className="hover:text-red-500">
//             FAQ
//           </Link>
//           <Link to="/contact" className="hover:text-red-500">
//             Contact Us
//           </Link>
//         </div>

//         <div className="text-sm text-gray-400">
//           &copy; {new Date().getFullYear()} Gym Sparta. All rights reserved.
//         </div>
//       </div>
//     </footer>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-4 shadow-inner">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex space-x-4">
          <Link to="/about" className="hover:text-red-500">
            about
          </Link>
          <Link to="/contact" className="hover:text-red-500">
            Contact Us
          </Link>
        </div>
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Gym Sparta. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
