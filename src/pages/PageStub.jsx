import { useLocation } from 'react-router-dom'
import { Container } from '../components/ui'

// Temporary page for routes whose template is not built yet.
export default function PageStub({ template }) {
  const { pathname } = useLocation()
  return (
    <section className="bg-cream border-t-2 border-ink py-24">
      <Container>
        <p className="text-label uppercase">{template} template</p>
        <h1 className="font-fono text-h1-sm md:text-h1-md lg:text-h1-lg xl:text-h1 mt-4">{pathname}</h1>
      </Container>
    </section>
  )
}
