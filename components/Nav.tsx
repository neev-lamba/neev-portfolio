import MobileMenu from "@/components/MobileMenu";
import ThemeToggle from "@/components/ThemeToggle";
import { siteData } from "@/lib/content";

export default function Nav() {
  const { navName, links, ui } = siteData;
  const t = ui.nav;
  const navLinks = [
    { href: "#work", label: t.work },
    { href: "#about", label: t.about },
    { href: links.resume, label: t.resume, external: true },
  ];

  return (
    <nav className="flex items-center justify-between gap-3">
      <a href="#top" className="text-[18px] font-bold tracking-[-0.2px]">
        {navName}
      </a>
      <div className="flex items-center gap-2 text-[15px] sm:gap-3 md:gap-8">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="hidden h-10 items-center leading-none text-muted md:inline-flex"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          className="inline-flex h-10 items-center whitespace-nowrap rounded-full border border-pill px-3.5 leading-none sm:px-[18px] md:ml-2"
        >
          {t.getInTouch}
        </a>
        <ThemeToggle toLight={t.toLight} toDark={t.toDark} />
        <MobileMenu label={t.menu} links={navLinks} />
      </div>
    </nav>
  );
}
