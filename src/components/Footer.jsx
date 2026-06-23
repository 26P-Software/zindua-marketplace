import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const footerLinks = {
    Company: ['About Us', 'Careers', 'Press', 'Blog'],
    Support: ['Help Center', 'Safety', 'API Documentation', 'Contact'],
    Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Licenses']
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-4">
          <h2 className="text-[#fe3448] font-bold text-2xl">ZinduaMarket</h2>
          <p className="text-sm text-[#757575] max-w-xs">
            Building the future of e-commerce. Scalable, secure, and developer-focused.
          </p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-gray-900 font-bold mb-4">Subscribe to our newsletter</h4>
          <form className="flex gap-2 max-w-md" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#fe3448] outline-none"
            />
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-black transition-colors">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-gray-900 font-bold mb-4">{title}</h4>
            <ul className="space-y-2 text-sm text-[#757575]">
              {links.map((link) => (
                <li key={link} className="hover:text-[#fe3448] cursor-pointer transition-colors">
                  {/* Conditional check to link 'Help Center' to the FAQ section */}
                  {link === 'Help Center' ? (
                    <a href="/faq-section">{link}</a>
                  ) : (
                    link
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#757575]">
        <p>&copy; {new Date().getFullYear()} Zindua Market, Inc. All rights reserved.</p>
        <div className="flex gap-6 text-xl">
          <FontAwesomeIcon icon={faTwitter} className="hover:text-[#fe3448] cursor-pointer transition-colors" />
          <FontAwesomeIcon icon={faGithub} className="hover:text-[#fe3448] cursor-pointer transition-colors" />
          <FontAwesomeIcon icon={faLinkedin} className="hover:text-[#fe3448] cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;