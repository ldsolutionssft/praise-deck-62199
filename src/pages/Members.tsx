import { useState, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Header } from "@/components/Header";
import { Member, MemberType, MemberRole, MemberStatus } from "@/types";
import { MemberCard } from "@/components/MemberCard";
import { Button } from "@/components/ui/button";
import { Plus, Guitar, Mic } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function Members() {
  const { members, events, userName, addMember, updateMember, deleteMember } = useLocalStorage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "Músico" as MemberType,
    role: "Voz" as MemberRole,
    status: "Ativo" as MemberStatus,
  });

  const stats = useMemo(() => {
    const musicians = members.filter(m => m.type === "Músico" && m.status === "Ativo").length;
    const leaders = members.filter(m => m.type === "Líder de equipe" && m.status === "Ativo").length;
    return { musicians, leaders };
  }, [members]);

  const getMemberEventCount = (memberId: string) => {
    return events.filter(e => e.memberIds.includes(memberId)).length;
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      type: member.type,
      role: member.role,
      status: member.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingMember) {
      updateMember(editingMember.id, formData);
      toast.success("Membro atualizado!");
    } else {
      addMember({
        id: crypto.randomUUID(),
        ...formData,
      });
      toast.success("Membro adicionado!");
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      type: "Músico",
      role: "Voz",
      status: "Ativo",
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este membro?")) {
      deleteMember(id);
      toast.success("Membro excluído!");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        userName={userName}
        title="Membros"
        subtitle={`${members.length} membros cadastrados`}
      />
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Guitar className="h-4 w-4 text-primary" />
              <span className="font-medium">{stats.musicians} músicos</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mic className="h-4 w-4 text-primary" />
              <span className="font-medium">{stats.leaders} líderes</span>
            </div>
          </div>
          <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Membro
          </Button>
        </div>
      </div>

      <main className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {members.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Nenhum membro cadastrado</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Primeiro Membro
            </Button>
          </div>
        ) : (
          members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              eventCount={getMemberEventCount(member.id)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? "Editar Membro" : "Novo Membro"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <Select value={formData.type} onValueChange={(value: MemberType) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Músico">Músico</SelectItem>
                  <SelectItem value="Líder de equipe">Líder de equipe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="role">Função</Label>
              <Select value={formData.role} onValueChange={(value: MemberRole) => setFormData({ ...formData, role: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Voz">Voz</SelectItem>
                  <SelectItem value="Guitarra">Guitarra</SelectItem>
                  <SelectItem value="Bateria">Bateria</SelectItem>
                  <SelectItem value="Baixo">Baixo</SelectItem>
                  <SelectItem value="Teclado">Teclado</SelectItem>
                  <SelectItem value="Som">Som</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: MemberStatus) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Afastado">Afastado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                {editingMember ? "Salvar" : "Adicionar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
