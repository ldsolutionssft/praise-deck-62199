export type MemberType = "Líder de equipe" | "Músico";

export type MemberRole =
  | "Voz"
  | "Guitarra"
  | "Bateria"
  | "Baixo"
  | "Teclado"
  | "Som"
  | "Outros";

export type MemberStatus = "Ativo" | "Afastado";

export interface Member {
  id: string;
  name: string;
  type: MemberType;
  role: MemberRole;
  status: MemberStatus;
  photo?: string;
}

export type EventType = "Ensaio" | "Agenda" | "Reunião" | "Outros";

export type EventStatus = "Confirmado" | "A Confirmar";

export interface Event {
  id: string;
  title: string;
  type: EventType;
  date: string;
  local: string;
  description?: string;
  memberIds: string[];
  songs?: string[];
  status: EventStatus;
}

export interface AppData {
  members: Member[];
  events: Event[];
}
