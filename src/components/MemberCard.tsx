import { Member } from "@/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash2 } from "lucide-react";

interface MemberCardProps {
  member: Member;
  eventCount?: number;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
}

export function MemberCard({ member, eventCount = 0, onEdit, onDelete }: MemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge variant="secondary">{member.type}</Badge>
            <Badge variant={member.status === "Ativo" ? "default" : "outline"}>
              {member.status}
            </Badge>
            {eventCount > 0 && (
              <Badge variant="outline" className="text-primary">
                {eventCount} eventos
              </Badge>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <Button size="icon" variant="ghost" onClick={() => onEdit(member)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => onDelete(member.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
