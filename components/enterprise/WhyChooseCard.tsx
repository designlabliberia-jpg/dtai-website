export interface WhyChooseCardProps {
  title: string;
  description: string;
}

export function WhyChooseCard({ title, description }: WhyChooseCardProps) {
  return (
    <div className="border-r border-neutral-200 pr-8 pl-2">
      <h3 className="font-primary text-lg font-bold text-brand leading-snug mb-3">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-600">{description}</p>
    </div>
  );
}
