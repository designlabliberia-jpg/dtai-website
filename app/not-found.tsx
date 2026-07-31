import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-white">
      <Container className="max-w-xl text-center">
        <span className="font-technical text-xs uppercase tracking-wide text-brand">
          404
        </span>
        <h1 className="mt-3 font-primary text-3xl font-semibold tracking-tight text-neutral-900 md:text-4xl">
          Page not found
        </h1>
        <p className="mt-5 text-base leading-relaxed text-neutral-600">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have
          moved. Check the URL, or head back to a known destination below.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-micro hover:bg-tech-blue"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors duration-micro hover:border-brand hover:text-brand"
          >
            Talk to DTAI
          </Link>
        </div>
      </Container>
    </section>
  );
}
