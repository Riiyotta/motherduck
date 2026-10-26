import Hero from '../components/Hero.jsx'
import Architecture from '../components/Architecture.jsx'
import Platform from '../components/Platform.jsx'
import Integrations from '../components/Integrations.jsx'
import Customers from '../components/Customers.jsx'
import AgentNative from '../components/AgentNative.jsx'
import Blog from '../components/Blog.jsx'

// Homepage section order per spec §1.
export default function Home() {
  return (
    <>
      <Hero />
      <Architecture />
      <Platform />
      <Integrations />
      <Customers />
      <div>
        <AgentNative />
        <Blog />
      </div>
    </>
  )
}
