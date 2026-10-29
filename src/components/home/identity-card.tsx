import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock } from '@/components/ui/clock'
import { Corners } from '@/components/frame'
import { BadgeCheck, MapPin } from 'lucide-react'

type IdentityCardProps = {
  avatar?: string
  initials?: string
  name?: string
  role?: string
}

/**
 * Passport-style identity card for the hero. Pairs a framed avatar with a
 * compact live readout (role, base, local time, availability).
 */
export function IdentityCard({
  avatar = '/assets/avatar.png',
  initials = 'HR',
  name = 'Harshhaa Vardhan Reddy',
  role = 'Platform & AI Infrastructure'
}: IdentityCardProps) {
  return (
    <div className="relative w-full border border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-3 py-2 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
        <span>identity.card</span>
        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          verified
        </span>
      </div>

      <div className="bg-dot-grid relative flex items-center justify-center overflow-hidden px-5 py-7 sm:px-6">
        <div className="relative">
          <div className="relative overflow-hidden">
            <Corners />
            <Avatar className="size-36 overflow-hidden rounded-none border border-border bg-muted sm:size-44">
              <AvatarImage
                src={avatar}
                alt={name}
                className="rounded-none object-cover"
              />
              <AvatarFallback className="rounded-none bg-muted font-heading text-3xl font-semibold tracking-wider">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span
              aria-hidden
              className="animate-scanline pointer-events-none absolute inset-x-0 top-0 h-1/5 bg-gradient-to-b from-transparent via-signal/25 to-transparent"
            />
          </div>
          <span className="absolute -right-2 -bottom-2 border border-border bg-background px-2 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-foreground uppercase shadow-hard">
            5+ yrs
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t border-border">
        <div className="col-span-2 border-b border-border px-3.5 py-3">
          <p className="font-heading text-lg font-semibold tracking-tight">
            {name}
          </p>
          <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            {role}
          </p>
        </div>

        <div className="flex items-center gap-1.5 border-r border-border px-3.5 py-2.5 text-[11px] text-muted-foreground">
          <MapPin className="size-3 text-muted-foreground/70" />
          Hyderabad, IN
        </div>
        <div className="flex items-center justify-between px-3.5 py-2.5 font-mono text-[11px] text-muted-foreground tabular-nums">
          <span className="text-[9px] tracking-[0.14em] uppercase opacity-60">
            local
          </span>
          <Clock className="text-foreground" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/20 px-3.5 py-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] text-emerald-600 uppercase dark:text-emerald-400">
          <BadgeCheck className="size-3" />
          open to build
        </span>
        <span
          aria-hidden
          className="h-4 w-24 opacity-60"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, var(--foreground) 0, var(--foreground) 1px, transparent 1px, transparent 3px, var(--foreground) 3px, var(--foreground) 5px, transparent 5px, transparent 7px)',
          }}
        />
        <span className="font-mono text-[9px] tracking-[0.12em] text-muted-foreground/60">
          PFE-2026
        </span>
      </div>
    </div>
  )
}
