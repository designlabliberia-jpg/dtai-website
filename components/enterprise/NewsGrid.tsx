"use client";

import { useState } from "react";
import Image from "next/image";
import { coverImageUrl, getReadTimeMinutes, type Insight } from "@/sanity/lib/insights";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

function CategoryMeta({ item }: { item: Insight }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-technical text-[10px] uppercase tracking-widest text-brand">{item.category}</span>
      <span className="text-neutral-300 text-[10px]">·</span>
      <span className="font-technical text-[10px] text-neutral-400">{getReadTimeMinutes(item)} min read</span>
    </div>
  );
}

function CardMeta({ item }: { item: Insight }) {
  return (
    <p className="mt-1 font-technical text-[11px] text-neutral-400">
      {formatDate(item.publishDate)} &nbsp;|&nbsp; By {item.author}
    </p>
  );
}

function InsightModal({ item, onClose }: { item: Insight; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-56">
          <Image
            src={coverImageUrl(item, 700)}
            alt={item.title}
            fill
            className="object-cover rounded-t-xl"
            sizes="(min-width:768px) 672px, 100vw"
            priority
            placeholder="blur"
            blurDataURL={coverImageUrl(item, 20)}
          />
        </div>
        <div className="p-6">
          <CategoryMeta item={item} />
          <h2 className="mt-2 font-primary text-xl font-semibold leading-snug text-neutral-900">{item.title}</h2>
          <CardMeta item={item} />
          <p className="mt-3 text-sm text-neutral-600">{item.summary}</p>
          {item.sections?.map((s, i) => (
            <div key={i} className="mt-5">
              {s.heading && <h3 className="font-primary text-base font-semibold text-neutral-900 mb-1">{s.heading}</h3>}
              <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-line">{s.body}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-1.5 text-neutral-600 hover:text-neutral-900 transition-colors"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function useModal() {
  const [selected, setSelected] = useState<Insight | null>(null);
  return { selected, open: setSelected, close: () => setSelected(null) };
}

/** Large hero card */
function HeroCard({ item, onOpen }: { item: Insight; onOpen: (i: Insight) => void }) {
  return (
    <button onClick={() => onOpen(item)} className="group flex flex-col h-full text-left w-full">
      <div className="relative w-full flex-1 min-h-0 overflow-hidden">
        <Image src={coverImageUrl(item, 900)} alt={item.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 50vw, 100vw" priority />
      </div>
      <div className="pt-3 pb-1">
        <CategoryMeta item={item} />
        <h3 className="mt-1 font-primary text-base font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">{item.title}</h3>
        <CardMeta item={item} />
      </div>
    </button>
  );
}

/** Compact row card */
function CompactCard({ item, divider, onOpen }: { item: Insight; divider?: boolean; onOpen: (i: Insight) => void }) {
  return (
    <>
      {divider && <hr className="border-neutral-200" />}
      <button onClick={() => onOpen(item)} className="group flex items-center gap-4 py-3 text-left w-full">
        <div className="flex-1 min-w-0">
          <CategoryMeta item={item} />
          <h3 className="mt-0.5 font-primary text-sm font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors line-clamp-2">{item.title}</h3>
          <CardMeta item={item} />
        </div>
        <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded">
          <Image src={coverImageUrl(item, 200)} alt={item.title} fill className="object-cover" sizes="80px" />
        </div>
      </button>
    </>
  );
}

/** Medium card */
function MediumCard({ item, onOpen }: { item: Insight; onOpen: (i: Insight) => void }) {
  return (
    <button onClick={() => onOpen(item)} className="group flex flex-col h-full text-left w-full">
      <div className="relative w-full h-36 overflow-hidden rounded">
        <Image src={coverImageUrl(item, 600)} alt={item.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 25vw, 50vw" />
      </div>
      <div className="pt-2">
        <CategoryMeta item={item} />
        <h3 className="mt-0.5 font-primary text-sm font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">{item.title}</h3>
        <CardMeta item={item} />
      </div>
    </button>
  );
}

/** Full featured card */
function FullCard({ item, onOpen }: { item: Insight; onOpen: (i: Insight) => void }) {
  return (
    <button onClick={() => onOpen(item)} className="group flex flex-col h-full text-left w-full">
      <div className="relative w-full h-52 overflow-hidden rounded">
        <Image src={coverImageUrl(item, 700)} alt={item.title} fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width:1024px) 50vw, 100vw" />
      </div>
      <div className="pt-3">
        <CategoryMeta item={item} />
        <h3 className="mt-1 font-primary text-base font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">{item.title}</h3>
        <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{item.summary}</p>
        <CardMeta item={item} />
      </div>
    </button>
  );
}

export function NewsGrid({ items }: { items: Insight[] }) {
  const { selected, open, close } = useModal();
  const n = items.length;

  return (
    <>
      {n === 1 && (() => {
        const item = items[0];
        return (
          <button onClick={() => open(item)} className="group flex flex-col md:flex-row h-72 md:h-80 overflow-hidden rounded border border-neutral-200 text-left w-full">
            <div className="relative w-full md:w-1/2 h-48 md:h-full overflow-hidden">
              <Image src={coverImageUrl(item, 900)} alt={item.title} fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width:768px) 50vw, 100vw" priority />
            </div>
            <div className="flex flex-col justify-center gap-2 p-6 md:w-1/2">
              <CategoryMeta item={item} />
              <h3 className="font-primary text-xl font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">{item.title}</h3>
              <p className="text-sm text-neutral-500 line-clamp-3">{item.summary}</p>
              <CardMeta item={item} />
            </div>
          </button>
        );
      })()}

      {n === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => <FullCard key={item.slug} item={item} onOpen={open} />)}
        </div>
      )}

      {n === 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <MediumCard item={items[0]} onOpen={open} />
            <MediumCard item={items[1]} onOpen={open} />
          </div>
          <button onClick={() => open(items[2])} className="group flex flex-col h-full text-left w-full">
            <div className="relative w-full flex-1 min-h-[280px] overflow-hidden rounded">
              <Image src={coverImageUrl(items[2], 700)} alt={items[2].title} fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div className="pt-3">
              <CategoryMeta item={items[2]} />
              <h3 className="mt-1 font-primary text-base font-semibold leading-snug text-neutral-900 group-hover:text-brand transition-colors">{items[2].title}</h3>
              <p className="mt-1 text-sm text-neutral-500 line-clamp-2">{items[2].summary}</p>
              <CardMeta item={items[2]} />
            </div>
          </button>
        </div>
      )}

      {n >= 4 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HeroCard item={items[0]} onOpen={open} />
          <div className="flex flex-col justify-between">
            {items.slice(1).map((item, i) => (
              <CompactCard key={item.slug} item={item} divider={i > 0} onOpen={open} />
            ))}
          </div>
        </div>
      )}

      {selected && <InsightModal item={selected} onClose={close} />}
    </>
  );
}
