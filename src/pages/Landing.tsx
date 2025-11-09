import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Share2, Music, CheckCircle2, ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Gestão de Membros",
      description: "Organize todos os músicos e líderes da sua equipe em um só lugar com informações completas e status de cada membro."
    },
    {
      icon: Calendar,
      title: "Agenda de Eventos",
      description: "Gerencie ensaios, reuniões e apresentações com datas, horários e escalas de músicos de forma simples."
    },
    {
      icon: Music,
      title: "Repertório Organizado",
      description: "Adicione as músicas de cada evento e mantenha tudo documentado para seus ensaios e apresentações."
    },
    {
      icon: Share2,
      title: "Compartilhamento WhatsApp",
      description: "Envie todas as informações do evento formatadas diretamente pelo WhatsApp com apenas um clique."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Cadastre sua equipe",
      description: "Adicione os membros da banda com seus instrumentos e funções"
    },
    {
      number: "02",
      title: "Crie seus eventos",
      description: "Agende ensaios, reuniões e apresentações com todas as informações"
    },
    {
      number: "03",
      title: "Escale os músicos",
      description: "Defina quem vai tocar em cada evento e adicione o repertório"
    },
    {
      number: "04",
      title: "Compartilhe pelo WhatsApp",
      description: "Envie os detalhes formatados para toda a equipe instantaneamente"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 backdrop-blur-md bg-background/60 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="BandLy Logo" className="h-10 w-auto rounded-lg" />
            <span className="text-xl font-bold">BandLy</span>
          </div>
          <Button onClick={() => navigate("/")} variant="default">
            Começar Agora
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <Badge className="mb-6" variant="secondary">
            Gestão Musical Simplificada
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Organize sua banda de louvor com facilidade
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gerencie membros, eventos, escalas e repertório em um único lugar. 
            Compartilhe tudo pelo WhatsApp em segundos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => navigate("/")} size="lg" className="text-lg px-8">
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-3xl font-bold text-primary">R$ 29,90</span>
              <span className="text-sm text-muted-foreground">pagamento único</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa para sua banda
            </h2>
            <p className="text-muted-foreground text-lg">
              Recursos pensados especialmente para bandas e ministérios de louvor
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Como funciona?
            </h2>
            <p className="text-muted-foreground text-lg">
              Quatro passos simples para organizar toda sua banda
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Por que escolher o BandLy?
              </h2>
              <div className="space-y-4">
                {[
                  "Interface intuitiva e fácil de usar",
                  "Funciona em qualquer dispositivo",
                  "Compartilhamento rápido pelo WhatsApp",
                  "Organização profissional da sua equipe",
                  "Acompanhe o histórico de todos os eventos",
                  "Sem mensalidades, pagamento único"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8 text-center">
              <div className="mb-6">
                <div className="inline-block p-4 bg-background rounded-full mb-4">
                  <Music className="h-16 w-16 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Oferta Especial</h3>
                <p className="text-muted-foreground mb-6">
                  Acesso completo a todas as funcionalidades
                </p>
              </div>
              <div className="mb-6">
                <div className="text-5xl font-bold text-primary mb-2">
                  R$ 29,90
                </div>
                <p className="text-muted-foreground">pagamento único • sem mensalidades</p>
              </div>
              <Button onClick={() => navigate("/")} size="lg" className="w-full text-lg">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para organizar sua banda?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a centenas de bandas que já estão usando o BandLy para 
            gerenciar seus ensaios e apresentações.
          </p>
          <Button onClick={() => navigate("/")} size="lg" className="text-lg px-8">
            Começar Gratuitamente
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-4">
        <div className="max-w-screen-xl mx-auto text-center text-muted-foreground">
          <p>© 2024 BandLy. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
