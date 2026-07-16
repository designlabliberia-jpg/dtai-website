"use client";

import dynamic from "next/dynamic";
import type { ServiceCardProps } from "./ServiceCard";

const ServiceCard = dynamic(() => import("./ServiceCard").then((m) => ({ default: m.ServiceCard })), { ssr: false });

export function ServiceCardLazy(props: ServiceCardProps) {
  return <ServiceCard {...props} />;
}
