import { useCallback } from 'react'
import Particles from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'

const particlesOptions: ISourceOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'repulse' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      repulse: { distance: 140, duration: 0.4 },
      push: { quantity: 3 },
    },
  },
  particles: {
    color: { value: ['#7F77DD', '#5DCAA5', '#AFA9EC'] },
    links: {
      color: '#3C3489',
      distance: 180,
      enable: true,
      opacity: 0.5,
      width: 1.2,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      random: true,
      speed: 0.8,
      straight: false,
    },
    number: {
      density: { enable: true },
      value: 120,
    },
    opacity: {
      value: { min: 0.3, max: 0.8 },
      animation: { enable: true, speed: 0.8, sync: false },
    },
    shape: { type: 'circle' },
    size: {
      value: { min: 2, max: 5 },
      animation: { enable: true, speed: 2, sync: false },
    },
  },
  detectRetina: true,
}

interface GlobalParticlesProps {
  visible: boolean
}

export default function GlobalParticles({ visible }: GlobalParticlesProps) {
  const particlesLoaded = useCallback(async () => {}, [])

  return (
    <Particles
      id="global-particles"
      particlesLoaded={particlesLoaded}
      options={particlesOptions}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
      }}
    />
  )
}
