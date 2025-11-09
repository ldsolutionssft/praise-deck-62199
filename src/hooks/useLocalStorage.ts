import { useState, useEffect } from "react";
import { AppData, Event, Member } from "@/types";

const STORAGE_KEY = "louvorapp-data";

const defaultData: AppData = {
  members: [],
  events: [],
};

export function useLocalStorage() {
  const [data, setData] = useState<AppData>(defaultData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, isLoaded]);

  const addMember = (member: Member) => {
    setData((prev) => ({ ...prev, members: [...prev.members, member] }));
  };

  const updateMember = (id: string, updated: Partial<Member>) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.map((m) => (m.id === id ? { ...m, ...updated } : m)),
    }));
  };

  const deleteMember = (id: string) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
      events: prev.events.map((e) => ({
        ...e,
        memberIds: e.memberIds.filter((mid) => mid !== id),
      })),
    }));
  };

  const addEvent = (event: Event) => {
    setData((prev) => ({ ...prev, events: [...prev.events, event] }));
  };

  const updateEvent = (id: string, updated: Partial<Event>) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.map((e) => (e.id === id ? { ...e, ...updated } : e)),
    }));
  };

  const deleteEvent = (id: string) => {
    setData((prev) => ({
      ...prev,
      events: prev.events.filter((e) => e.id !== id),
    }));
  };

  return {
    members: data.members,
    events: data.events,
    addMember,
    updateMember,
    deleteMember,
    addEvent,
    updateEvent,
    deleteEvent,
    isLoaded,
  };
}
