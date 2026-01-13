export function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Monsters', href: '#monsters' },
      // { label: 'Pricing', href: '#pricing' },
    ],
    company: [
      { label: 'About', href: '#about' },
      { label: 'Marketplace (soon) ', href: '#marketplace' },
      // { label: 'Careers', href: '#careers' },
    ],
    legal: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Contact', href: 'mailto:radarsardar@gmail.com' },
    ],
    social: [
      { label: 'Twitter', href: 'https://x.com/poopmonsterinc', icon: '𝕏' },
      { label: 'Github', href: 'https://github.com/microbiomedao', icon: '💬' },
      // { label: 'Instagram', href: 'https://instagram.com', icon: '📷' },
    ],
  };

  return (
    <footer className="bg-surface border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              {/* <span className="text-2xl">💩</span> */}
              <span className="font-heading font-bold text-xl">Phoop</span>
            </a>
            <p className="text-white/50 text-sm mb-4">
              A digestive health tracker with real world rewards. Level up your wellness journey.
            </p>
            <div className="flex gap-4">
              {links.social.map((item, index) => {
                const hoverColors = ['hover:text-honey-bronze-400', 'hover:text-muted-teal-400', 'hover:text-cotton-rose-400'];
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`text-white/50 transition-colors ${hoverColors[index % hoverColors.length]}`}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Poop Tracker. All rights reserved.
          </p>
          <p className="text-white/40 text-sm">
            Made with 💩 and ❤️ for your health
          </p>
        </div>
      </div>
    </footer>
  );
}
