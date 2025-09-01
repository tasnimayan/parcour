"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Package } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-xl">
              <Package className="h-6 w-6 text-accent" />
            </div>
            <span className="font-medium text-2xl text-foreground tracking-tight">Parcour</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <a
              href="#services"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              Services
            </a>
            <a
              href="/tracking"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              Track Package
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
            >
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-2 font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 rounded-b-2xl">
            <div className="px-4 pt-4 pb-6 space-y-2">
              <a
                href="#services"
                className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-300"
              >
                Services
              </a>
              <a
                href="#tracking"
                className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-300"
              >
                Track Package
              </a>
              <a
                href="#about"
                className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-all duration-300"
              >
                Contact
              </a>
              <div className="px-4 pt-4">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 font-medium">
                  Get a Quote
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
