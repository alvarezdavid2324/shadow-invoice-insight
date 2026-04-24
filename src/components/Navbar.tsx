import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <nav className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-gradient-cyan flex items-center justify-center shadow-glow-soft group-hover:shadow-glow transition-all">
              <Eye className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>
          <span className="font-semibold tracking-tight text-lg">
            Shadowrez<span className="text-cyan"> AI</span>
          </span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#industries" className="hover:text-foreground transition-colors">Industries</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Sign in</Button>
          <Button variant="hero" size="sm">Book demo</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
