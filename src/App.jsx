import React from 'react'
import Hero from './components/Hero'
import TechSection from './components/TechSection'
import SocialLinks from './components/SocialLinks'


function App() {
    const web3Stack = [
        { name: 'Wagmi', slug: 'wagmi' },
        { name: 'WalletConnect', slug: 'walletconnect' },
        { name: 'Web3.js', slug: 'web3dotjs' },
        { name: 'Viem', url: 'https://viem.sh/icon-light.png' },
        { name: 'RainbowKit', url: 'https://rainbowkit.com/rainbow.svg' },
        { name: 'Ethereum', slug: 'ethereum' }
    ]

    const frontendStack = [
        { name: 'Next.js', slug: 'nextdotjs' },
        { name: 'React', slug: 'react' },
        { name: 'Vite', slug: 'vite' },
        { name: 'JavaScript', slug: 'javascript' },
        { name: 'TypeScript', slug: 'typescript' },
        { name: 'Angular', slug: 'angular' },
        { name: 'React Query', slug: 'reactquery' },
        { name: 'Tailwind', slug: 'tailwindcss' },
        { name: 'Styled Components', slug: 'styledcomponents' },
        { name: 'ShadcnUI', slug: 'shadcnui' },
        { name: 'Radix UI', slug: 'radixui' },
        { name: 'Framer Motion', slug: 'framer' }
    ]

    const mobileStack = [
        { name: 'React Native', slug: 'react' },
        { name: 'Flutter', slug: 'flutter' },
        { name: 'Swift', slug: 'swift' },
        { name: 'Expo', slug: 'expo' }
    ]

    const backendStack = [
        { name: 'Node.js', slug: 'nodedotjs' },
        { name: 'Python', slug: 'python' },
        { name: 'Express', slug: 'express' }
    ]

    return (
        <main>
            <div className="bento-grid">
                {/* Header Area */}
                <div className="grid-item hero-span">
                    <Hero />
                </div>

                {/* Tech Stacks */}
                {/* Tech Stacks */}
                <div className="grid-item hero-span" style={{
                    textAlign: 'center',
                    gap: '0.5rem',
                    // alignItems: 'center', // Removed to allow full width
                    maxWidth: '600px', // Fixed narrow width
                    margin: '0 auto', // Center in grid
                    width: '100%'
                }}>
                    <TechSection title="FRONTEND" badges={frontendStack} />
                    <TechSection title="BLOCKCHAIN" badges={web3Stack} />
                    <TechSection title="MOBILE" badges={mobileStack} />
                    <TechSection title="BACKEND" badges={backendStack} />
                </div>

                {/* Footer Area */}
                <div className="grid-item footer-span">
                    <SocialLinks />
                    <footer>
                        <p>© {new Date().getFullYear()} LUIS CASTILLO.</p>
                    </footer>
                </div>
            </div>
        </main>
    )
}

export default App
