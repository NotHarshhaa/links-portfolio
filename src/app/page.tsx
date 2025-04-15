import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ButtonLink } from '@/components/button-link'
import { CardLink } from '@/components/card-link'
import { data } from '@/constants'
import TypingRole from '@/components/TypingRole'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px] dark:bg-[radial-gradient(#3f3f46_1px,transparent_1px)] z-0" />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full px-4 sm:px-8 pt-24 pb-16 lg:pb-8">
        <a
          href="https://github.com/NotHarshhaa"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full"
        >
          <Avatar className="size-28 shadow border">
            <AvatarImage alt={data.name} src={data.avatar} />
            <AvatarFallback className="font-mono font-bold">
              {data.initials}
            </AvatarFallback>
          </Avatar>
        </a>

        <section className="flex flex-col items-center justify-center">
          <div className="flex gap-4 justify-center items-center mt-8 mb-2">
            <h1 className="font-bold text-3xl dark:text-white text-black text-center">
              {data.name}
            </h1>
          </div>

          <TypingRole />

          <h2 className="mx-auto max-w-lg px-4 text-sm font-mono font-semibold dark:text-neutral-300 text-neutral-700 md:text-pretty text-center mt-2">
            {data.about}
          </h2>
        </section>

        <section className="flex items-center gap-4 my-8">
          {data.contacts.map((contact) => (
            <ButtonLink key={contact.url} {...contact} />
          ))}
        </section>

        <section className="w-full max-w-md lg:max-w-2xl bg-white/80 dark:bg-zinc-900/70 rounded-2xl p-4 shadow-lg backdrop-blur-md">
          <h3 className="font-semibold mb-4 text-xl dark:text-white text-black text-center">
            Personal Network
          </h3>
          <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
            {data.socials.map((social) => (
              <div key={social.url} className="w-full max-w-[600px] mx-auto">
                <CardLink {...social} />
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-md lg:max-w-2xl mt-8 bg-white/80 dark:bg-zinc-900/70 rounded-2xl p-4 shadow-lg backdrop-blur-md">
          <h3 className="font-semibold mb-4 text-xl dark:text-white text-black text-center">
            Community Network
          </h3>
          <div className="flex flex-col gap-4 w-full max-w-lg mx-auto">
            {data.communities.map((community) => (
              <div key={community.url} className="w-full max-w-[600px] mx-auto">
                <CardLink {...community} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
