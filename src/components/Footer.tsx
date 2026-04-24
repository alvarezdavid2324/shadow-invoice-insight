import logo from "@/assets/shadowrez-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <img
          src={logo}
          alt="Shadowrez AI logo"
          className="h-9 w-auto object-contain opacity-90"
        />
        <p className="text-xs text-muted-foreground font-mono">
          © 2026 Shadowrez AI · Automate the shadows.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Security</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
