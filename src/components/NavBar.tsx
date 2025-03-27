
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/90 backdrop-blur-md border-b shadow-sm dark:bg-gray-900/90" 
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-medium">MI</span>
            </div>
            <span className="text-xl font-medium">Multi-Intent AI</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Demo
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                Login
              </Button>
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container py-4 px-4 bg-background border-b">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#demo" 
                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </a>
              <a 
                href="#about" 
                className="text-sm font-medium py-2 px-4 rounded-md hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              {!user && (
                <Link 
                  to="/auth" 
                  className="text-sm font-medium py-2 px-4 rounded-md bg-primary text-primary-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              {user && (
                <Link 
                  to="/dashboard" 
                  className="text-sm font-medium py-2 px-4 rounded-md bg-primary text-primary-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
