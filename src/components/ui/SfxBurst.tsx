/**
 * Terminal SFX Burst — signature element "Ink & Intrusion".
 * Starburst komik berisi vokabulari terminal/keamanan.
 * Muncul saat parent (.group) di-hover atau menerima focus —
 * murni CSS, otomatis hormat pada prefers-reduced-motion.
 *
 * Pemakaian: parent butuh class `group relative`, lalu posisikan
 * burst via className (mis. "-top-8 -right-4").
 */

interface SfxBurstProps {
  text: string
  color?: "yellow" | "red" | "green"
  static?: boolean
  className?: string
}

const colorClass: Record<NonNullable<SfxBurstProps["color"]>, string> = {
  yellow: "",
  red: "sfx-red",
  green: "sfx-green",
}

export default function SfxBurst({
  text,
  color = "yellow",
  static: isStatic = false,
  className = "",
}: SfxBurstProps) {
  return (
    <span
      aria-hidden="true"
      className={`sfx-burst ${colorClass[color]} ${
        isStatic ? "sfx-static" : ""
      } ${className}`}
    >
      <span className="sfx-burst-text">{text}</span>
    </span>
  )
}
