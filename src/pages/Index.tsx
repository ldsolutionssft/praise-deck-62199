import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Music, Users as UsersIcon, Plus } from "lucide-react";
import { format, isToday, isTomorrow, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const eventTypeColors = {
  Ensaio: "bg-event-rehearsal/20 text-event-rehearsal border-event-rehearsal/30",
  Agenda: "bg-event-schedule/20 text-event-schedule border-event-schedule/30",
  Reunião: "bg-event-meeting/20 text-event-meeting border-event-meeting/30",
  Outros: "bg-event-other/20 text-event-other border-event-other/30",
};

export default function Index() {
  const { events, members, userName } = useLocalStorage();
  const navigate = useNavigate();

  const todayEvents = useMemo(() => {
    const today = new Date();
    return events
      .filter((e) => {
        const eventDate = new Date(e.date);
        return eventDate >= startOfDay(today) && eventDate <= endOfDay(today);
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return events
      .filter((e) => new Date(e.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [events]);

  const monthlyStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthEvents = events.filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    return {
      rehearsals: thisMonthEvents.filter((e) => e.type === "Ensaio").length,
      schedules: thisMonthEvents.filter((e) => e.type === "Agenda").length,
      meetings: thisMonthEvents.filter((e) => e.type === "Reunião").length,
    };
  }, [events]);

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) return "Hoje";
    if (isTomorrow(date)) return "Amanhã";
    return format(date, "dd/MM", { locale: ptBR });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header userName={userName} />
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Olá, {userName}! 👋</h1>
              <p className="text-muted-foreground">Bem-vindo de volta</p>
            </div>
            <Button size="lg" onClick={() => navigate("/events")} className="rounded-full">
              <Plus className="h-5 w-5 mr-2" />
              Novo Evento
            </Button>
          </div>

          {/* Monthly Summary */}
          <Card className="p-4 bg-card/50 backdrop-blur">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <Music className="h-5 w-5 text-event-rehearsal" />
                <span className="font-semibold">{monthlyStats.rehearsals}</span>
                <span className="text-sm text-muted-foreground">ensaios</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-event-schedule" />
                <span className="font-semibold">{monthlyStats.schedules}</span>
                <span className="text-sm text-muted-foreground">agendas</span>
              </div>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-event-meeting" />
                <span className="font-semibold">{monthlyStats.meetings}</span>
                <span className="text-sm text-muted-foreground">reuniões</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Today's Events */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Agenda de Hoje
          </h2>
          {todayEvents.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">Nenhum evento agendado para hoje</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <Card key={event.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={cn("border", eventTypeColors[event.type])}>
                          {event.type}
                        </Badge>
                        <span className="text-sm font-medium">
                          {format(new Date(event.date), "HH:mm")}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-1">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">{event.local}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Events */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Próximos Eventos</h2>
          {upcomingEvents.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground mb-4">Nenhum evento futuro agendado</p>
              <Button onClick={() => navigate("/events")}>
                <Plus className="h-4 w-4 mr-2" />
                Criar Evento
              </Button>
            </Card>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const eventMembers = members.filter((m) => event.memberIds.includes(m.id));
                return (
                  <Card key={event.id} className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="text-center min-w-[60px]">
                        <div className="text-2xl font-bold">{format(new Date(event.date), "dd")}</div>
                        <div className="text-xs text-muted-foreground uppercase">
                          {format(new Date(event.date), "MMM", { locale: ptBR })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={cn("border", eventTypeColors[event.type])}>
                            {event.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(event.date), "HH:mm")}
                          </span>
                        </div>
                        <h3 className="font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{event.local}</p>
                        {eventMembers.length > 0 && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <UsersIcon className="h-3 w-3" />
                            <span>{eventMembers.length} membros</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="h-24 flex-col gap-2"
            onClick={() => navigate("/events")}
          >
            <CalendarIcon className="h-6 w-6" />
            <span>Ver Todos Eventos</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex-col gap-2"
            onClick={() => navigate("/members")}
          >
            <UsersIcon className="h-6 w-6" />
            <span>Gerenciar Membros</span>
          </Button>
        </section>
      </main>
    </div>
  );
}
