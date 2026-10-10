import Hero from './components/Hero'
import ProofMarquee from './components/ProofMarquee'
import Services from './components/Services'
import ParticleCore from './components/ParticleCore'
import DeliverySystem from './components/DeliverySystem'
import Work from './components/Work'
import Close from './components/Close'

export default function App() {
  return (
    <main className="min-h-screen bg-ink text-chalk" style={{ overflowX: 'clip' }}>
      <Hero />
      <ProofMarquee />
      <Services />
      <ParticleCore />
      <DeliverySystem />
      <Work />
      <Close />
    </main>
  )
}
