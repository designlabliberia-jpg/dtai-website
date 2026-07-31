"use client";

import Link from "next/link";
import Image from "next/image";
import { coverImageUrl, getReadTimeMinutes, type Insight } from "@/sanity/lib/insights";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

function CardMeta({ item }: { item: Insight }) {
  return (
    <p className="mt-1 font-technical text-[11px] text-neutral-400">
      {formatDate(item.publishDate)} &nbsp;|&nbsp; By {item.author}
    </p>
  );
}

/** Large hero card: image top, text bottom */
function HeroCard({ item }: { item: Insight }) {
  return (
    <Link href={`/insights/${item.slug}`} className="group flex flex-col h-full">
      <div className="relative w-full flex-1 min-h-0 overflow-hidden">
        <Image
          src={coverImageUrl(item, 900)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 50vw, 100vw"
          priority
        />
      </div>
      <div className="pt-3 pb-1">
        <span className="font-technical text-[10px] uppercase tracking-widest text-brand">{item.category}</span>
        <h3 className="mt-1 font-primary text-base font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">
          {item.title}
        </h3>
        <CardMeta item={item} />
      </div>
    </Link>
  );
}

/** Compact row card: text left, small thumbnail right */
function CompactCard({ item, divider }: { item: Insight; divider?: boolean }) {
  return (
    <>
      {divider && <hr className="border-neutral-200" />}
      <Link href={`/insights/${item.slug}`} className="group flex items-center gap-4 py-3">
        <div className="flex-1 min-w-0">
          <span className="font-technical text-[10px] uppercase tracking-widest text-brand">{item.category}</span>
          <h3 className="mt-0.5 font-primary text-sm font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors line-clamp-2">
            {item.title}
          </h3>
          <CardMeta item={item} />
        </div>
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded">
          <Image
            src={coverImageUrl(item, 200)}
            alt={item.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
      </Link>
    </>
  );
}

/** Medium card: image top, text below (used in 3-item layout left column) */
function MediumCard({ item }: { item: Insight }) {
  return (
    <Link href={`/insights/${item.slug}`} className="group flex flex-col h-full">
      <div className="relative w-full h-36 overflow-hidden rounded">
        <Image
          src={coverImageUrl(item, 600)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 25vw, 50vw"
        />
      </div>
      <div className="pt-2">
        <span className="font-technical text-[10px] uppercase tracking-widest text-brand">{item.category}</span>
        <h3 className="mt-0.5 font-primary text-sm font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">
          {item.title}
        </h3>
        <CardMeta item={item} />
      </div>
    </Link>
  );
}

/** Full featured card: image top, full text below (used in 2-item layout) */
function FullCard({ item }: { item: Insight }) {
  return (
    <Link href={`/insights/${item.slug}`} className="group flex flex-col h-full">
      <div className="relative w-full h-52 overflow-hidden rounded">
        <Image
          src={coverImageUrl(item, 700)}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 50vw, 100vw"
        />
      </div>
      <div className="pt-3">
        <span className="font-technical text-[10px] uppercase tracking-widest text-brand">{item.category}</span>
        <h3 className="mt-1 font-primary text-base font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{item.summary}</p>
        <CardMeta item={item} />
      </div>
    </Link>
  );
}

export function NewsGrid({ items }: { items: Insight[] }) {
  const n = items.length;

  /* ── 1 item: split hero ── */
  if (n === 1) {
    const item = items[0];
    return (
      <Link href={`/insights/${item.slug}`} className="group flex flex-col md:flex-row h-72 md:h-80 overflow-hidden rounded border border-neutral-200">
        <div className="relative w-full md:w-1/2 h-48 md:h-full overflow-hidden">
          <Image
            src={coverImageUrl(item, 900)}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(min-width:768px) 50vw, 100vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-center gap-2 p-6 md:w-1/2">
          <span className="font-technical text-[10px] uppercase tracking-widest text-brand">{item.category}</span>
          <h3 className="font-primary text-xl font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-neutral-500 line-clamp-3">{item.summary}</p>
          <CardMeta item={item} />
        </div>
      </Link>
    );
  }

  /* ── 2 items: 50/50 grid ── */
  if (n === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => <FullCard key={item.slug} item={item} />)}
      </div>
    );
  }

  /* ── 3 items: 2 stacked left, 1 tall right ── */
  if (n === 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <MediumCard item={items[0]} />
          <MediumCard item={items[1]} />
        </div>
        <Link href={`/insights/${items[2].slug}`} className="group flex flex-col h-full">
          <div className="relative w-full flex-1 min-h-[280px] overflow-hidden rounded">
            <Image
              src={coverImageUrl(items[2], 700)}
              alt={items[2].title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width:1024px) 50vw, 100vw"
            />
          </div>
          <div className="pt-3">
            <span className="font-technical text-[10px] uppercase tracking-widest text-brand">{items[2].category}</span>
            <h3 className="mt-1 font-primary text-base font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">
              {items[2].title}
            </h3>
            <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{items[2].summary}</p>
            <CardMeta item={items[2]} />
          </div>
        </Link>
      </div>
    );
  }

  /* ── 4 items: asymmetric hero left + 3 compact right ── */
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <HeroCard item={items[0]} />
      <div className="flex flex-col justify-between">
        {items.slice(1).map((item, i) => (
          <CompactCard key={item.slug} item={item} divider={i > 0} />
        ))}
      </div>
    </div>
  );
}
