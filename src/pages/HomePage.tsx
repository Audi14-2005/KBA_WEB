import { Hero } from '../components/hero'
import { About } from '../components/about'
import { Certificate } from '../components/certificate'
import { Leadership } from '../components/leadership'
import { Partners } from '../components/partners'
import { CoreTeam } from '../components/core-team'
import { Contact } from '../components/contact'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Certificate />
      <Leadership />
      <Partners />
      <CoreTeam />
      <Contact />
    </>
  )
}