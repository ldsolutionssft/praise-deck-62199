import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Header } from "@/components/Header";
import { Event, EventType, EventStatus } from "@/types";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Events({ onEditName }: { onEditName: () => void }) {
  const { events, members, userName, addEvent, updateEvent, deleteEvent } = useLocalStorage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "Ensaio" as EventType,
    date: "",
    local: "",
    description: "",
    memberIds: [] as string[],
    songs: "",
    status: "A Confirmar" as EventStatus,
  });

  const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleShare = async (event: Event) => {
    const eventMembers = members.filter((m) => event.memberIds.includes(m.id));
    const eventDate = format(new Date(event.date), "dd/MM 'às' HH:mm");
    
    const text = `🎶 ${event.title} - ${event.type}
📅 ${eventDate}
📍 Local: ${event.local}
${event.songs && event.songs.length > 0 ? `🎵 Músicas: ${event.songs.join(", ")}\n` : ""}${eventMembers.length > 0 ? `👥 Membros: ${eventMembers.map(m => m.name).join(", ")}` : ""}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Agenda de Louvor", text });
        toast.success("Compartilhado com sucesso!");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Texto copiado para a área de transferência!");
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      type: event.type,
      date: event.date,
      local: event.local,
      description: event.description || "",
      memberIds: event.memberIds,
      songs: event.songs?.join(", ") || "",
      status: event.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData = {
      ...formData,
      songs: formData.songs ? formData.songs.split(",").map(s => s.trim()).filter(Boolean) : [],
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      toast.success("Evento atualizado!");
    } else {
      addEvent({
        id: crypto.randomUUID(),
        ...eventData,
      });
      toast.success("Evento criado!");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      type: "Ensaio",
      date: "",
      local: "",
      description: "",
      memberIds: [],
      songs: "",
      status: "A Confirmar",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      deleteEvent(id);
      toast.success("Evento excluído!");
    }
  };

  const handleDuplicate = (event: Event) => {
    addEvent({
      ...event,
      id: crypto.randomUUID(),
      title: `${event.title} (Cópia)`,
    });
    toast.success("Evento duplicado!");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        userName={userName}
        title="Eventos"
        subtitle={`${events.length} eventos cadastrados`}
        action={
          <Button size="icon" onClick={() => { resetForm(); setIsDialogOpen(true); }}>
            <Plus className="h-4 w-4" />
          </Button>
        }
        onEditName={onEditName}
      />

      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {sortedEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Nenhum evento cadastrado</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeiro Evento
            </Button>
          </div>
        ) : (
          sortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              members={members}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
              onDuplicate={handleDuplicate}
            />
          ))
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? "Editar Evento" : "Novo Evento"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select value={formData.type} onValueChange={(value: EventType) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ensaio">Ensaio</SelectItem>
                  <SelectItem value="Agenda">Agenda</SelectItem>
                  <SelectItem value="Reunião">Reunião</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Data e Hora</Label>
              <Input
                id="date"
                type="datetime-local"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="local">Local</Label>
              <Input
                id="local"
                value={formData.local}
                onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="songs">Músicas (separadas por vírgula)</Label>
              <Input
                id="songs"
                value={formData.songs}
                onChange={(e) => setFormData({ ...formData, songs: e.target.value })}
                placeholder="Graça, Tu és Santo, Bondade de Deus"
              />
            </div>
            <div>
              <Label>Membros Participantes</Label>
              <div className="border rounded-lg p-3 max-h-48 overflow-y-auto space-y-2 bg-background">
                {members.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum membro cadastrado</p>
                ) : (
                  members.map((member) => (
                    <label key={member.id} className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={formData.memberIds.includes(member.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, memberIds: [...formData.memberIds, member.id] });
                          } else {
                            setFormData({ ...formData, memberIds: formData.memberIds.filter(id => id !== member.id) });
                          }
                        }}
                        className="h-4 w-4 rounded border-input"
                      />
                      <span className="text-sm flex-1">{member.name}</span>
                      <span className="text-xs text-muted-foreground">{member.role}</span>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: EventStatus) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Confirmado">Confirmado</SelectItem>
                  <SelectItem value="A Confirmar">A Confirmar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                {editingEvent ? "Salvar" : "Criar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
