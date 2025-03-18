import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Home, Lightbulb, Brain, Workflow, Users, HelpCircle, FileText } from 'lucide-react';
import Logo from '../Logo';

interface MenuButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  icon: React.ElementType;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, onClick, isActive, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef<HTMLSpanElement | null>(null);

  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="relative text-gray-300 hover:text-white py-3 px-4 transition-all duration-300 group flex items-center gap-3 rounded-xl hover:bg-white/5"
    >
      <Icon className="w-5 h-5" />
      <span ref={textRef} className="relative z-10 text-base">{children}</span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 16, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden flex items-center"
          >
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </motion.div>
        )}
      </AnimatePresence>
      {isActive && (
        <motion.div
          layoutId="underline"
          className="absolute inset-0 bg-blue-500/10 rounded-xl -z-10"
          style={{ width: textRef.current ? textRef.current.offsetWidth : 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

const menuItems = [
  { label: 'Home', href: 'home', icon: Home, isExternal: false },
  { label: 'Services', href: 'services', icon: Lightbulb, isExternal: false },
  { label: 'Why Us', href: 'why-us', icon: Brain, isExternal: false },
  { label: 'Process', href: 'process', icon: Workflow, isExternal: false },
  { label: 'Team', href: 'team', icon: Users, isExternal: false },
  { label: 'Q&A', href: 'faq', icon: HelpCircle, isExternal: false },
  { label: 'Case Studies', href: '/case-studies', icon: FileText, isExternal: true }
];

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position for menu
  const scrollPosition = useRef(0);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // Get the stored scroll position
    const storedPosition = parseInt(document.body.style.top || '0') * -1;
    
    // Reset body styles and restore scroll position
    document.body.style.cssText = '';
    window.scrollTo(0, storedPosition);

    // Wait for next frame to ensure scroll position is restored
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navHeight = 56; // Height of the navbar
        const elementPosition = element.offsetTop - navHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 0);
  };

  // Enhanced scroll locking
  useEffect(() => {
    if (isMenuOpen) {
      // Store current scroll position
      scrollPosition.current = window.pageYOffset;
      
      // Lock body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      // Restore scroll position
      if (document.body.style.position === 'fixed') {
        document.body.style.cssText = '';
        window.scrollTo(0, scrollPosition.current);
      }
    }

    return () => {
      document.body.style.cssText = '';
      if (scrollPosition.current) {
        window.scrollTo(0, scrollPosition.current);
      }
    };
  }, [isMenuOpen]);

  // Section tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!isMenuOpen) {
        const sections = menuItems.map(item => item.href).filter(href => !href.startsWith('/'));
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { top, bottom } = element.getBoundingClientRect();
            const elementTop = top + window.scrollY;
            const elementBottom = bottom + window.scrollY;

            if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    } else {
      setActiveSection(location.pathname.replace('/', ''));
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, isMenuOpen]);

  const handleBookCall = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);

    window.open('https://calendly.com/yoniinsell/30min', '_blank');
    setIsMenuOpen(false);
  };

  const handleClick = (href: string) => {
    if (href === '/case-studies') {
      setIsMenuOpen(false);
      document.body.style.cssText = '';
      if (scrollPosition.current) {
        window.scrollTo(0, scrollPosition.current);
      }
      window.location.href = href; 
      return;
    }

    // Handle internal navigation
    const sectionId = href.replace('#', '');
    scrollToSection(sectionId);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 touch-manipulation">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/85 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 opacity-30" />
        <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>

      <nav className="px-4 py-3 relative">
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="relative z-50 flex items-center -ml-2 p-2 touch-manipulation"
          >
            <div className="h-8 w-auto">
              <Logo />
            </div>
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors touch-manipulation"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-0 min-h-screen bg-black/95 backdrop-blur-2xl pt-20"
          >
            <div className="px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <div key={item.label} className="relative w-fit">
                  <MenuButton
                    onClick={() => handleClick(item.href)}
                    isActive={activeSection === item.href || (item.isExternal && location.pathname === item.href)}
                    icon={item.icon}
                  >
                    {item.label}
                  </MenuButton>
                </div>
              ))}

              <motion.button
                onClick={handleBookCall}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 mt-8 touch-manipulation"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MobileNavbar;