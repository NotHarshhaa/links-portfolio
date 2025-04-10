import { DevtoIcon } from '@/components/icons/devto'
import { HashnodeIcon } from '@/components/icons/hashnode'
import { GithubIcon } from '@/components/icons/github'
import { LinkedinIcon } from '@/components/icons/linkedin'
import { MailIcon } from '@/components/icons/mail'
import { ResumeIcon } from '@/components/icons/resume'
import { TelegramIcon } from '@/components/icons/telegram'
import { WebIcon } from '@/components/icons/web'
import { WhatsappIcon } from '@/components/icons/whatsapp'
import { XIcon } from '@/components/icons/x'

export const SOCIAL_DATA = {
  name: 'Harshhaa Vardhan Reddy',
  initials: 'HR',
  avatar: '/assets/avatar.jpg',
  about: `DevOps Engineer, a passionate DevOps Engineer on a mission to automate everything and scale cloud infrastructures efficiently with a love for technology and a knack for problem-solving. I thrive on challenges and enjoy collaborating with teams to deliver innovative solutions that drive success. Let's connect and explore the world of DevOps together!. Based in Hyderabad, India`,
  contacts: [
    {
      title: 'Portfolio',
      url: 'https://notharshhaa.site',
      icon: WebIcon
    },
    {
      title: 'Resume',
      url: 'https://cv.notharshhaa.site',
      icon: ResumeIcon
    },
    {
      title: 'Email',
      url: 'mailto:harshhaa03@gmail.com',
      icon: MailIcon
    },
    {
      title: 'WhatsApp',
      url: 'https://wa.me/+917995905634',
      icon: WhatsappIcon
    }
  ],
  socials: [
    {
      title: 'GitHub',
      url: 'https://github.com/NotHarshhaa',
      icon: GithubIcon
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/harshhaa-vardhan-reddy',
      icon: LinkedinIcon
    },
    {
      title: 'The everything app',
      url: 'https://x.com/NotHarshhaa',
      icon: XIcon
    },
    {
      title: 'Dev Community',
      url: 'https://dev.to/NotHarshhaa',
      icon: DevtoIcon
    },
    {
      title: 'Telegram',
      url: 'https://t.me/NotHarshhaa',
      icon: TelegramIcon
    }
  ],
  communities: [
    {
      title: 'Free DevOps & Cloud Community Learning',
      url: 'https://t.me/prodevopsguy',
      icon: TelegramIcon
    },
    {
      title: 'Best DevOps & Cloud Blogs & Articles',
      url: 'https://hashnode.com/@prodevopsguy',
      icon: HashnodeIcon
    }
  ]
}
