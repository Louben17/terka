// Značka webu – stejné „ú“ jako ve faviconě.
export function LogoMark({ className = 'size-7 text-lg' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-moss-deep pr-0.5 font-serif text-cream italic ${className}`}
    >
      ú
    </span>
  )
}
