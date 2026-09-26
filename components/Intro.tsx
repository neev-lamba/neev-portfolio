import Image from "next/image";
import LightsOut from "@/components/LightsOut";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { siteData } from "@/lib/content";

const iconLink =
  "inline-flex size-11 items-center justify-center rounded-full border border-pill text-text transition-colors hover:border-text";

export default function Intro() {
  const { intro, photo, links, ui } = siteData;

  return (
    <section className="mt-14 grid items-center gap-10 sm:mt-20 md:mt-[110px] md:grid-cols-[340px_1fr] md:gap-14 lg:grid-cols-[420px_1fr] lg:gap-20">
      <div className="relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-[20px] md:aspect-[420/520] md:max-w-none">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="(min-width: 1100px) 420px, (min-width: 900px) 340px, 360px"
          className="object-cover object-[50%_30%]"
        />
      </div>
      <div className="flex flex-col gap-7">
        <LightsOut />
        <h1 className="m-0 text-[44px] font-semibold leading-none tracking-[-1.5px] sm:text-[56px] sm:tracking-[-2px] md:text-[72px] md:tracking-[-3px] lg:text-[88px]">
          {intro.headline}
        </h1>
        <p className="m-0 max-w-[560px] text-[19px] leading-[1.5] text-pretty text-text2 sm:text-[24px]">
          {intro.subline}
        </p>
        <div className="flex items-center gap-3">
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label={ui.social.linkedin} className={iconLink}>
            <LinkedInIcon />
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label={ui.social.github} className={iconLink}>
            <GitHubIcon />
          </a>
          <a href={`mailto:${links.email}`} aria-label={ui.social.email} className={iconLink}>
            <MailIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
