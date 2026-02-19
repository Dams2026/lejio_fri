import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { 
  LayoutDashboard, 
  Bot, 
  FileText, 
  MapPin, 
  CreditCard, 
  Wrench, 
  Globe,
  Users,
  Building2,
  BarChart3,
  Camera,
  ScanLine,
  ShieldCheck,
  FileSignature,
  Archive,
  IdCard,
  Navigation2,
  AlertTriangle,
  Route,
  Lock,
  Smartphone,
  Repeat,
  Wallet,
  Shield,
  Receipt,
  Bell,
  RefreshCw,
  Snowflake,
  Filter,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
  Car,
  Calendar
} from 'lucide-react';

// Custom Calendar icon component for features
const CalendarIcon = ({ className }: { className?: string }) => (
  <Calendar className={className} />
);

const WhatIsAUTOFIQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'dashboard',
      icon: LayoutDashboard,
      emoji: '🏗️',
      title: 'Administrations-Dashboard',
      subtitle: 'B2B & Pro',
      description: 'For forhandlere og flådeejere fungerer AUTOFIQ som det interne "Operating System", der erstatter papir og Excel.',
      color: 'from-primary to-primary/60',
      features: [
        { icon: CalendarIcon, title: 'Direkte Bookinger', description: 'Opret bookinger manuelt til walk-in kunder eller telefoniske aftaler. Systemet sender automatisk kontrakt og betalingslink.' },
        { icon: Building2, title: 'Multi-lokations Styring', description: 'Administrer afdelinger i forskellige byer med unikke åbningstider, adresser og lokale telefonnumre.' },
        { icon: BarChart3, title: 'Status-overblik', description: 'Visuel kontrol over flåden (Udlejet, Ledig, Klargøring, Service, På Værksted).' },
        { icon: Users, title: 'Brugerstyring', description: 'Giv medarbejdere adgang med forskellige rettigheder (Fleet Manager, Bogholder, Salg).' },
        { icon: BarChart3, title: 'Udvidet Statistik', description: 'Få rapporter over omsætning, udnyttelsesgrad og dækningsbidrag pr. bil.' },
      ]
    },
    {
      id: 'vision',
      icon: Bot,
      emoji: '🤖',
      title: 'AUTOFIQ Vision',
      subtitle: 'AI-Teknologi',
      description: 'Vores egenudviklede AI-scanner fjerner menneskelige fejl og sikrer uomtvistelig dokumentation.',
      color: 'from-accent to-accent/60',
      features: [
        { icon: Camera, title: 'AI Dashboard Scanner', description: 'Appen tager et billede af instrumentbrættet og aflæser automatisk Kilometerstand og Brændstof/Batteri-niveau.' },
        { icon: ScanLine, title: 'Nummerplade-genkendelse', description: 'Sikrer at den korrekte bil udleveres ved at scanne pladen før nøgleudlevering.' },
        { icon: FileText, title: 'Digital Skadesrapport', description: 'Udlejer og lejer guideres gennem et fotoflow af bilen (8+ vinkler). Systemet gemmer disse med tidsstempel og GPS-data som bevis.' },
        { icon: ShieldCheck, title: 'Bevissikring', description: 'Ved aflevering sammenlignes stand, km og brændstof automatisk med udleveringsdata. Eventuelle overkørte kilometer faktureres øjeblikkeligt.' },
      ]
    },
    {
      id: 'legal',
      icon: FileText,
      emoji: '📝',
      title: 'Juridisk Automatisering & Jura',
      subtitle: 'Automatisering',
      description: 'AUTOFIQ fjerner behovet for fysiske dokumenter og advokatbistand til kontrakter.',
      color: 'from-mint to-mint/60',
      features: [
        { icon: FileText, title: 'Automatiske Lejekontrakter', description: 'Systemet genererer øjeblikkeligt en juridisk bindende kontrakt (B2B, B2C eller P2P) med alle relevante data.' },
        { icon: FileSignature, title: 'Digital Signering', description: 'Alt underskrives direkte på mobilen/tabletten af begge parter.' },
        { icon: Archive, title: 'Automatisk Arkivering', description: 'Kontrakten sendes som PDF til begge parter og gemmes sikkert i skyen i 5 år.' },
        { icon: IdCard, title: 'Verificering af Lejer', description: 'Systemet validerer automatisk kørekort, identitet og alder (f.eks. ved krav om 21+ år eller MC-kategori).' },
      ]
    },
    {
      id: 'gps',
      icon: MapPin,
      emoji: '📍',
      title: 'GPS, Tracking & Geofencing',
      subtitle: 'Fuld kontrol',
      description: 'Fuld kontrol over dine værdier, uanset hvor de befinder sig.',
      color: 'from-lavender to-lavender/60',
      features: [
        { icon: Navigation2, title: 'GPS-sikkerhed', description: 'Dokumentation for lokation og kilometerstand ved check-in/out. Få besked ved uautoriseret brug.' },
        { icon: AlertTriangle, title: 'Geofencing', description: 'Tegn en usynlig grænse på kortet (f.eks. Danmark). Hvis bilen krydser grænsen, får du en SMS/Push-advarsel med det samme.' },
        { icon: Route, title: 'Logbog', description: 'Se historiske ruter og kørselshistorik for hver bil.' },
        { icon: Lock, title: 'Tyverisikring', description: 'Mulighed for at spærre for genstart af bilen (afhængig af hardware).' },
      ]
    },
    {
      id: 'payment',
      icon: CreditCard,
      emoji: '💳',
      title: 'Betaling, Økonomi & Forsikring',
      subtitle: 'Pengeflow',
      description: 'Sikker håndtering af pengeflowet mellem alle parter.',
      color: 'from-yellow-500 to-yellow-500/60',
      features: [
        { icon: Smartphone, title: 'Betalingsmetoder', description: 'Integration med MobilePay, Kortbetaling (Visa/Mastercard) og bankoverførsel.' },
        { icon: Repeat, title: 'Automatisk Abonnementsbetaling', description: 'Ved Minileasing (30+ dage) trækker systemet automatisk lejen hver måned uden manuel indblanding.' },
        { icon: Wallet, title: 'Depositum-styring', description: 'Systemet reserverer og frigiver depositum automatisk baseret på bilens stand ved aflevering.' },
        { icon: Shield, title: 'Selvrisiko-forsikring', description: 'Lejere kan tilkøbe forsikring for 49 kr./dag (max 400 kr./md.), hvilket nedsætter deres selvrisiko til 0 kr.' },
        { icon: Receipt, title: 'Bødehåndtering', description: 'Upload p-bøder; systemet matcher dem med lejeren og sender fakturaen videre inkl. administrationsgebyr.' },
      ]
    },
    {
      id: 'fleet',
      icon: Wrench,
      emoji: '🛠️',
      title: 'Fleet Management & Service',
      subtitle: 'Optimering',
      description: 'Optimering af bilens levetid og daglige drift.',
      color: 'from-orange-500 to-orange-500/60',
      features: [
        { icon: Bell, title: 'Service-alarmer', description: 'Systemet giver besked ved behov for olie, dækskifte eller syn baseret på tid/km.' },
        { icon: RefreshCw, title: 'Byttebil-funktion', description: 'Udskift en bil midt i en lejeperiode (f.eks. ved nedbrud). Systemet flytter kontrakt og depositum til den nye bil med ét klik.' },
        { icon: Snowflake, title: 'Dækhotel-styring', description: 'Hold styr på om bilen kører på sommer- eller vinterdæk, og hvor det andet sæt er opbevaret.' },
      ]
    },
    {
      id: 'marketplace',
      icon: Globe,
      emoji: '🌍',
      title: 'Markedspladsen: Eksponering & Salg',
      subtitle: 'Synlighed',
      description: 'Når alt det administrative er på plads, sørger AUTOFIQ for at fylde din ordrebog.',
      color: 'from-cyan-500 to-cyan-500/60',
      features: [
        { icon: Car, title: 'Eksponering af Flåde', description: 'Dine ledige køretøjer (biler, trailere, campingvogne) vises til tusindvis af brugere på AUTOFIQ.dk.' },
        { icon: Filter, title: 'Avanceret Filtrering', description: 'Lejere kan søge specifikt på lokation, totalvægt (vigtigt for trailere), sovepladser og udstyr.' },
        { icon: MessageCircle, title: 'Kommunikation', description: 'Indbygget chat-modul så du kan tale med kunden uden at oplyse dit private nummer.' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-mint/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-4 h-4 mr-2" />
              Den Ultimative Guide
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black mb-6 leading-tight">
              Hvad er{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
                AUTOFIQ?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              AUTOFIQ er et teknologisk økosystem designet til at transformere måden, vi tænker udlejning på. Det er ikke bare en markedsplads; det er et avanceret administrationsværktøj (SaaS), en teknisk infrastruktur og en salgskanal samlet i ét.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border rounded-full px-4 py-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">SaaS Platform</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border rounded-full px-4 py-2">
                <CheckCircle2 className="w-5 h-5 text-mint" />
                <span className="text-sm font-medium">AI-teknologi</span>
              </div>
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border rounded-full px-4 py-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Markedsplads</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="font-bold text-lg px-8 shadow-xl shadow-primary/20" asChild>
                <Link to="/auth">
                  Kom i gang
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold text-lg px-8" asChild>
                <Link to="/funktioner">
                  Se alle funktioner
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 border-y bg-card/50 backdrop-blur-sm sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-background border hover:bg-muted transition-colors text-sm font-medium"
              >
                <span>{section.emoji}</span>
                <span className="hidden sm:inline">{section.title.split(':')[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <div className="py-16">
        {sections.map((section, sectionIndex) => (
          <section 
            key={section.id} 
            id={section.id}
            className={`py-16 ${sectionIndex % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}
          >
            <div className="container mx-auto px-4">
              {/* Section Header */}
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${section.color} flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                  <section.icon className="w-10 h-10 text-white" />
                </div>
                <Badge variant="secondary" className="mb-4">
                  {section.emoji} {section.subtitle}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  {section.title}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {section.description}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {section.features.map((feature, featureIndex) => (
                  <Card 
                    key={featureIndex}
                    className="bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all hover:shadow-lg group"
                  >
                    <CardHeader className="pb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Summary Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-mint/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary via-accent to-mint flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Zap className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              360-graders løsning til moderne udlejning
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Kort sagt: AUTOFIQ tager hånd om alt fra den første søgning på Google til den endelige fakturering og service af bilen. Det er en komplet løsning, der automatiserer alt det kedelige, så du kan fokusere på det vigtige – at drive din forretning.
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-6 text-center">
                <p className="font-display text-4xl font-black text-primary mb-2">7+</p>
                <p className="text-sm text-muted-foreground">Integrerede moduler</p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-6 text-center">
                <p className="font-display text-4xl font-black text-accent mb-2">100%</p>
                <p className="text-sm text-muted-foreground">Digital automatisering</p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm border rounded-2xl p-6 text-center">
                <p className="font-display text-4xl font-black text-mint mb-2">24/7</p>
                <p className="text-sm text-muted-foreground">Booking & tracking</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="font-bold text-lg px-8 shadow-xl shadow-primary/20" asChild>
                <Link to="/auth">
                  Kom i gang som udlejer
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="font-bold text-lg px-8" asChild>
                <Link to="/om-os">
                  Læs mere om os
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhatIsAUTOFIQ;
