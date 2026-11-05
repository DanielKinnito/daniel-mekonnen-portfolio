export default function SectionHeading({ text }: { text: string }) {
  return (
    <h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
      {text}
    </h3>
  );
}
