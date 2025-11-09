import { Event, Member } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Music, Edit, Trash2, Share2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  members: Member[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
  onShare: (event: Event) => void;
}

const eventTypeColors = {
  Ensaio: "bg-event-rehearsal/20 text-event-rehearsal border-event-rehearsal/30",
  Agenda: "bg-event-schedule/20 text-event-schedule border-event-schedule/30",
  Reunião: "bg-event-meeting/20 text-event-meeting border-event-meeting/30",
  Outros: "bg-event-other/20 text-event-other border-event-other/30",
};

export function EventCard({ event, members, onEdit, onDelete, onShare }: EventCardProps) {
  const eventMembers = members.filter((m) => event.memberIds.includes(m.id));
  const eventDate = new Date(event.date);

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={cn("border", eventTypeColors[event.type])}>
              {event.type}
            </Badge>
            <Badge variant={event.status === "Confirmado" ? "default" : "secondary"}>
              {event.status}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg">{event.title}</h3>
        </div>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={() => onShare(event)}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onEdit(event)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onDelete(event.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {format(eventDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{event.local}</span>
        </div>
        {event.description && (
          <p className="text-muted-foreground">{event.description}</p>
        )}
        {eventMembers.length > 0 && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <Users className="h-4 w-4 mt-0.5" />
            <span className="flex-1">{eventMembers.map((m) => m.name).join(", ")}</span>
          </div>
        )}
        {event.songs && event.songs.length > 0 && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <Music className="h-4 w-4 mt-0.5" />
            <span className="flex-1">{event.songs.join(", ")}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
