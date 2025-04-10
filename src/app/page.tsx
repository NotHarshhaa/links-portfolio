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
      <main className="relative z-10 flex items-center flex-col mx-auto w-full justify-center pt-24 px-8">
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

        <h3 className="font-semibold my-4 text-xl dark:text-white text-black text-center">
          Personal Network
        </h3>
        {data.socials.map((social) => (
          <CardLink key={social.url} {...social} />
        ))}

        <h3 className="font-semibold mt-8 mb-4 text-xl dark:text-white text-black text-center">
          Community Network
        </h3>
        {data.communities.map((community) => (
          <CardLink key={community.url} {...community} />
        ))}
      </main>
    </div>
  )
}
