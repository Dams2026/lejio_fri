import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Car, Caravan, Truck, Scan, FileCheck, Shield, Wrench, RefreshCw, Leaf, Star, CreditCard, Zap } from 'lucide-react';
import rasmusImage from '@/assets/rasmus-damsgaard-small.jpg';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        {/* Hero Section - Bold geometric style */}
        <section className="relative overflow-hidden">
          {/* Bold geometric background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-background to-mint/20" />
            <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary rounded-full blur-[100px] opacity-20 animate-float-slow" />
            <div className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-accent rounded-full blur-[80px] opacity-25 animate-float" />
            <div className="absolute -bottom-32 left-1/4 w-[600px] h-[600px] bg-mint rounded-full blur-[120px] opacity-15 animate-float-slow" style={{ animationDelay: '2s' }} />
            
            {/* Decorative elements */}
            <div className="absolute top-32 left-[15%] w-4 h-4 bg-secondary rounded-full animate-bounce-soft" />
            <div className="absolute top-48 right-[20%] w-6 h-6 bg-accent rounded-lg rotate-45 animate-float" />
            <div className="absolute bottom-40 left-[10%] w-3 h-3 bg-mint rounded-full animate-bounce-soft" style={{ animationDelay: '1s' }} />
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }} />
          </div>
          
          <div className="container mx-auto px-6 py-16 relative z-10">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tilbage
            </Button>
            
            <div className="max-w-4xl animate-slide-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/40 text-sm font-bold text-foreground mb-6">
                <Zap className="w-4 h-4 text-secondary" />
                <span>Vores historie</span>
              </div>
              
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] mb-6">
                <span className="block text-foreground">Om</span>
                <span className="block bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent py-2">
                  AUTOFIQ.dk
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
                Danmarks Nye Hub for Intelligent Mobilitet
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Intro */}
            <div className="prose prose-lg max-w-none animate-fade-in">
              <p className="text-lg text-muted-foreground leading-relaxed">
                AUTOFIQ.dk er ikke blot en hjemmeside; det er fremtidens infrastruktur for udlejning og deling af transportmidler. Vi opererer som en dansk, hybrid markedsplads, der nedbryder barriererne mellem den private deleøkonomi og forhandlere. Ved at samle alle typer transport – fra personbiler til trailere og campingvogne – skaber vi et økosystem, hvor tilgængelighed altid vinder over ejerskab.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Vores fundament hviler på principperne om <strong className="text-foreground">Minileasing</strong> og <strong className="text-foreground">Radikal Fleksibilitet</strong>. Vi tror på, at den traditionelle 3-årige leasingkontrakt er en forældet model i en verden, hvor behov ændrer sig hurtigere end nogensinde før.
              </p>
            </div>

            {/* Leadership Section */}
            <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 sm:p-12 border-2 border-primary/20 animate-scale-in">
              <h2 className="font-display text-3xl font-black mb-8 text-center">
                Ledelsen bag platformen
              </h2>
              <p className="text-muted-foreground text-center mb-10">
                Bag AUTOFIQ.dk står et dedikeret team med en passion for teknologi og mobilitet.
              </p>

              <div className="max-w-2xl mx-auto">
                <div className="bg-card rounded-3xl p-8 border-2 border-border shadow-xl">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden shrink-0 ring-4 ring-primary/20">
                      <img 
                        src={rasmusImage} 
                        alt="Rasmus Damsgaard - Daglig Leder" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="font-display text-2xl font-black mb-1">Rasmus Damsgaard</h3>
                      <p className="text-primary font-bold mb-4">Medstifter & Partner</p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        Rasmus er medstifter af AUTOFIQ og står i spidsen for den daglige drift. Med en baggrund inden for teknologi og en passion for mobilitet har han været drivkraften bag platformens udvikling fra idé til virkelighed.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        Han er garant for, at teknologien altid fungerer fejlfrit, og brænder for at levere fremragende kundeservice. Med fokus på innovation og brugeroplevelse sikrer Rasmus, at AUTOFIQ konstant udvikler sig for at møde brugernes behov.
                      </p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Rasmus tror på, at deleøkonomi er fremtiden – og arbejder hver dag på at gøre det nemt og trygt for danskerne at udleje og leje køretøjer. Hos AUTOFIQ er hjælpen aldrig mere end et opkald væk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Unique Concept */}
            <div className="animate-fade-in">
              <h2 className="font-display text-3xl font-black mb-8">
                Det unikke AUTOFIQ-koncept: Mere end bare biler
              </h2>
              <p className="text-muted-foreground mb-8">
                Hvor andre platforme ofte begrænser sig til én kategori, er AUTOFIQ designet til at håndtere alt, hvad der ruller. Vi har skabt en platform, der favner bredden af den danske transportkultur:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Personbiler */}
                <div className="group bg-card rounded-3xl p-6 border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <Car className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-black mb-3">🚗 Personbiler & Minileasing</h3>
                  <p className="text-muted-foreground text-sm">
                    Vi har specialiseret os i lejeperioder på 30+ dage. Det er den perfekte løsning til dig, der står mellem to biler, har fået nyt job, eller som ønsker at teste elbil-livet af uden at binde dig økonomisk i årevis. 0 kr. i udbetaling, ingen lang binding – bare en bil, når du har brug for den.
                  </p>
                </div>

                {/* Campingvogne */}
                <div className="group bg-card rounded-3xl p-6 border-2 border-accent/20 hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-accent/30">
                    <Caravan className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-black mb-3">🚐 Campingvogne – Frihed på landevejen</h3>
                  <p className="text-muted-foreground text-sm">
                    Vi gør drømmen om den frie ferie tilgængelig. Gennem AUTOFIQ kan ejere af campingvogne få dækket deres årlige omkostninger ved at udleje vognen i de uger, de ikke selv bruger den, mens lejerne får adgang til kvalitetsvogne uden de store investeringsomkostninger.
                  </p>
                </div>

                {/* Trailere */}
                <div className="group bg-card rounded-3xl p-6 border-2 border-mint/20 hover:border-mint/50 transition-all hover:shadow-2xl hover:shadow-mint/10 hover:-translate-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mint to-mint/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-mint/30">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display text-xl font-black mb-3">🛒 Trailere til ethvert behov</h3>
                  <p className="text-muted-foreground text-sm">
                    Fra den lille havetrailer til den store flyttetrailer eller den specialiserede hestetrailer. Vi gør det muligt at finde en trailer i nabolaget med få klik, fremfor at skulle køre langt til en tankstation.
                  </p>
                </div>
              </div>
            </div>

            {/* Technology Section */}
            <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 sm:p-12 border-2 border-primary/20">
              <h2 className="font-display text-3xl font-black mb-4">
                Teknologien bag: AUTOFIQ Vision (AI-drevet tryghed)
              </h2>
              <p className="text-muted-foreground mb-8">
                Vi ved, at den største bekymring ved udlejning er spørgsmålet om tillid og dokumentation. Derfor har vi udviklet <strong className="text-foreground">AUTOFIQ Vision</strong>, en teknologisk løsning, der fjerner det manuelle besvær og de juridiske gråzoner.
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="group space-y-3 p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Scan className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold">Intelligent Nummerplade-scanning</h4>
                  <p className="text-sm text-muted-foreground">
                    Vores app verificerer automatisk køretøjet ved hjælp af OCR-teknologi. Dette sikrer, at lejekontrakten altid er bundet til det korrekte stelnummer og de korrekte forsikringsdata.
                  </p>
                </div>

                <div className="group space-y-3 p-6 rounded-2xl bg-card/50 border border-border hover:border-accent/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileCheck className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold">AI Dashboard-analyse</h4>
                  <p className="text-sm text-muted-foreground">
                    Dette er hjertet i vores check-in/out proces. Ved at tage et enkelt billede af instrumentbrættet kan vores kunstige intelligens øjeblikkeligt aflæse kilometerstand og brændstofniveau (eller batteristatus). Dataene overføres direkte til lejekontrakten, hvilket eliminerer menneskelige fejl, tastefejl og diskussioner ved aflevering.
                  </p>
                </div>

                <div className="group space-y-3 p-6 rounded-2xl bg-card/50 border border-border hover:border-mint/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-mint to-mint/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold">Digital Bevissikring</h4>
                  <p className="text-sm text-muted-foreground">
                    Alle billeder gemmes med tidsstempel og GPS-koordinater, hvilket fungerer som en uomtvistelig dokumentation for begge parter.
                  </p>
                </div>
              </div>
            </div>

            {/* For Dealers */}
            <div className="animate-fade-in">
              <h2 className="font-display text-3xl font-black mb-4">
                Professionel Flådestyring for Forhandlere
              </h2>
              <p className="text-muted-foreground mb-8">
                For forhandlere fungerer AUTOFIQ som et komplet Operating System. Vi leverer de værktøjer, der kræves for at skalere en moderne udlejningsforretning:
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="group flex gap-4 p-6 rounded-2xl bg-card border-2 border-border hover:border-secondary/50 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FileCheck className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Automatiseret Jura</h4>
                    <p className="text-sm text-muted-foreground">
                      Vi genererer dynamiske, juridisk validerede lejekontrakter, der underskrives digitalt direkte i platformen med vores integrerede signaturløsning.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-4 p-6 rounded-2xl bg-card border-2 border-border hover:border-secondary/50 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Wrench className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Service- & Vedligeholdelsesmodul</h4>
                    <p className="text-sm text-muted-foreground">
                      Systemet holder automatisk styr på køretøjernes sundhed. Det inkluderer påmindelser om syn, serviceintervaller og den logistiske styring af sommer- og vinterdæk.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-4 p-6 rounded-2xl bg-card border-2 border-border hover:border-secondary/50 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Smart Byttebil-funktion</h4>
                    <p className="text-sm text-muted-foreground">
                      Hvis et køretøj skal til service eller får et nedbrud, kan forhandleren med ét klik overføre alle lejerens data, depositum og kontraktdetaljer til et nyt køretøj. Det minimerer nedetid og maksimerer kundetilfredshed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="rounded-[2rem] bg-card p-8 sm:p-12 border-2 border-border">
              <h2 className="font-display text-3xl font-black mb-4 text-center">
                Sikkerhed og Tillid i Højsædet
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                På AUTOFIQ.dk er sikkerhed ikke et tilvalg, men en integreret del af platformen. Vi benytter avanceret brugerverificering for at sikre, at alle parter kan føle sig trygge.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="group flex gap-4 items-start p-6 rounded-2xl bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Star className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Bruger-rating</h4>
                    <p className="text-sm text-muted-foreground">
                      Gennemsigtighed gennem ratings sikrer, at kun de bedste lejere og udlejere benytter platformen.
                    </p>
                  </div>
                </div>

                <div className="group flex gap-4 items-start p-6 rounded-2xl bg-accent/5 border border-accent/20 hover:border-accent/40 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Enkel Afregning</h4>
                    <p className="text-sm text-muted-foreground">
                      Du modtager betaling for leje og depositum direkte fra lejeren (f.eks. via MobilePay, bankoverførsel eller kontant). Vi sørger for alt det administrative omkring bookingen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="rounded-[2rem] bg-gradient-to-br from-mint/10 via-card to-accent/10 p-8 sm:p-12 border-2 border-mint/30 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-mint flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h2 className="font-display text-3xl font-black mb-4">
                Vores Vision for Fremtiden
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                Hos AUTOFIQ.dk ser vi ind i en fremtid, hvor mobilitet er en service fremfor et aktiv. Vi ønsker at reducere antallet af biler, der holder stille i de danske indkørsler, ved at gøre det attraktivt og sikkert at dele dem.
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Hver gang en trailer eller en bil bliver delt på AUTOFIQ, optimerer vi udnyttelsen af planetens ressourcer. Vi skaber økonomisk værdi for ejeren og mobilitetsfrihed for lejeren.
              </p>
              <p className="text-2xl font-display font-black bg-gradient-to-r from-primary via-accent to-mint bg-clip-text text-transparent">
                AUTOFIQ.dk – Frihed uden binding, drevet af intelligent teknologi.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/search')}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-lg font-bold px-10 py-6 rounded-2xl shadow-lg shadow-primary/30"
              >
                Udforsk køretøjer
              </Button>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;