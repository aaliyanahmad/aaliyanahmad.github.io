import Image from "next/image";

type AboutPortraitProps = {
  alt: string;
  location: string;
  name: string;
  src: string | null;
};

export function AboutPortrait({
  alt,
  location,
  name,
  src,
}: AboutPortraitProps) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <figure>
      <div className="portrait-frame relative aspect-[4/5] overflow-hidden border border-[var(--line-strong)] bg-surface">
        {src ? (
          <Image
            alt={alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 100vw"
            src={src}
          />
        ) : (
          <div
            aria-label="Portrait to be added"
            className="portrait-placeholder absolute inset-0 grid place-items-center"
            role="img"
          >
            <span className="font-serif text-[clamp(5rem,16vw,10rem)] italic leading-none tracking-[-0.08em] text-bone/12">
              {initials}
            </span>
            <span className="absolute bottom-5 left-5 text-[0.62rem] uppercase tracking-[0.2em] text-muted">
              Portrait / To be added
            </span>
          </div>
        )}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 size-4 border-l border-t border-copper"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 size-4 border-b border-r border-copper"
        />
      </div>
      <figcaption className="flex items-start justify-between gap-5 border-x border-b border-[var(--line)] px-4 py-3 text-[0.62rem] uppercase tracking-[0.16em] text-muted">
        <span>{name}</span>
        <span className="text-right">{location}</span>
      </figcaption>
    </figure>
  );
}
