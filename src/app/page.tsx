import { Header, Hero, HowItWorks, Features, Gallery, Faq, Founder, Support, Download, Footer } from '@/components';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Gallery />
        <Faq />
        <Founder />
        <Support />
        <Download />
      </main>
      <Footer />
    </>
  );
}
