import { Link } from '@inertiajs/react';
import w_thriftopia from '@/assets/icon/w-thriftopia.webp';
import { FaFacebook, FaTwitter, FaInstagram, FaTiktok } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FooterMenuItem {
  title: string;
  href: string;
}

interface FooterMenuSection {
  title: string;
  items: FooterMenuItem[];
}

const footerSections: FooterMenuSection[] = [
  {
    title: "About Us",
    items: [
      { title: "Tentang Kami", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Karir", href: "/careers" },
      { title: "Kontak", href: "/contact" },
    ]
  },
  {
    title: "Layanan",
    items: [
      { title: "Jual Beli", href: "/buy-sell" },
      { title: "Donasi", href: "/donate" },
      { title: "Refurbish", href: "/refurbish" },
      { title: "Custom Order", href: "/custom" },
    ]
  },
  {
    title: "Info",
    items: [
      { title: "FAQ", href: "/faq" },
      { title: "Syarat & Ketentuan", href: "/terms" },
      { title: "Kebijakan Privasi", href: "/privacy" },
      { title: "Panduan", href: "/guide" },
    ]
  }
];

const socialLinks = [
  { icon: FaInstagram, href: "https://instagram.com" },
  { icon: FaFacebook, href: "https://facebook.com" },
  { icon: FaTwitter, href: "https://twitter.com" },
  { icon: FaTiktok, href: "https://tiktok.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <img 
              src={w_thriftopia} 
              alt="Thriftopia" 
              className="h-12 w-auto mb-4 hover:opacity-80 transition-opacity cursor-pointer" 
            />
            <p className="text-xs text-gray-400 mt-4 max-w-md leading-relaxed opacity-90 hover:opacity-100 transition-opacity">
              Thriftopia adalah platform jual beli baju bekas berkualitas. 
              Kami berkomitmen untuk mendukung gaya hidup berkelanjutan dan ekonomi sirkular.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-base hidden md:flex font-semibold text-white tracking-wider uppercase mb-4">
                {section.title}
              </h3>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="md:hidden flex w-full items-center justify-between bg-[#262626] px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-[#333333]">
                  <span>{section.title}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent align="start" className="w-56 bg-[#262626] border-[#404040]">
                  {section.items.map((item) => (
                    <DropdownMenuItem key={item.title} asChild className="text-gray-300 hover:text-white focus:text-white focus:bg-[#333333]">
                      <Link href={item.href}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Desktop Links */}
              <ul className="hidden md:flex flex-col space-y-3">
                {section.items.map((item) => (
                  <li key={item.title}>
                    <Link 
                      href={item.href} 
                      className="text-sm text-gray-400 hover:text-white transition-all hover:translate-x-1 duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Thriftopia. All rights reserved.
            </p>
            <div className="flex items-center space-x-8 mt-6 md:mt-0">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-white transform hover:scale-110 transition-all hover:rotate-6"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
