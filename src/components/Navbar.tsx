import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/shadowrez-logo.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <nav className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="Shadowrez AI logo"
            className="h-9 w-auto object-contain drop-shadow-[0_0_12px_hsl(var(--cyan)/0.4)] group-hover:drop-shadow-[0_0_18px_hsl(var(--cyan)/0.6)] transition-all"
          />
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
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="hero" size="sm">Book demo</Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
