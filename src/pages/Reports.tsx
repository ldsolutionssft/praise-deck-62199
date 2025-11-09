import { useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calendar, Users, TrendingUp } from "lucide-react";

export default function Reports() {
  const { events, members, userName } = useLocalStorage();

  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthEvents = events.filter((e) => {
      const eventDate = new Date(e.date);
      return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    const eventsByType = {
      Ensaio: events.filter((e) => e.type === "Ensaio").length,
      Agenda: events.filter((e) => e.type === "Agenda").length,
      Reunião: events.filter((e) => e.type === "Reunião").length,
      Outros: events.filter((e) => e.type === "Outros").length,
    };

    const memberActivity = members.map((member) => ({
      name: member.name,
      events: events.filter((e) => e.memberIds.includes(member.id)).length,
    })).sort((a, b) => b.events - a.events).slice(0, 5);

    return {
      totalEvents: events.length,
      thisMonthEvents: thisMonthEvents.length,
      activeMembers: members.filter(m => m.status === "Ativo").length,
      eventsByType,
      memberActivity,
      mostActiveMembers: memberActivity[0] || null,
    };
  }, [events, members]);

  const eventTypeData = Object.entries(stats.eventsByType).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  const COLORS = {
    Ensaio: "hsl(var(--event-rehearsal))",
    Agenda: "hsl(var(--event-schedule))",
    Reunião: "hsl(var(--event-meeting))",
    Outros: "hsl(var(--event-other))",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        userName={userName}
        title="Relatórios"
        subtitle="Estatísticas e análises"
      />

      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total de Eventos</p>
                <p className="text-2xl font-bold">{stats.totalEvents}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Este Mês</p>
                <p className="text-2xl font-bold">{stats.thisMonthEvents}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Membros Ativos</p>
                <p className="text-2xl font-bold">{stats.activeMembers}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Events by Type */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Eventos por Tipo</h2>
          {eventTypeData.some(d => d.value > 0) ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={eventTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => value > 0 ? `${name}: ${value}` : ""}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {eventTypeData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-12">Nenhum evento cadastrado ainda</p>
          )}
        </Card>

        {/* Most Active Members */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Membros Mais Ativos</h2>
          {stats.memberActivity.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.memberActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="events" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-muted-foreground py-12">Nenhum membro com eventos registrados</p>
          )}
        </Card>

        {/* Quick Stats */}
        {stats.mostActiveMembers && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-2">Destaques</h2>
            <p className="text-muted-foreground">
              🌟 Membro mais ativo: <span className="font-semibold text-foreground">{stats.mostActiveMembers.name}</span> ({stats.mostActiveMembers.events} eventos)
            </p>
          </Card>
        )}
      </main>
    </div>
  );
}
