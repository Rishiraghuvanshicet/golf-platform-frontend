import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { charityApi } from "../api/charityApi";

const emptyEvent = () => ({
  title: "",
  date: "",
  type: "golf_day",
  description: "",
});

const EVENT_TYPES = [
  { value: "golf_day", label: "Charity golf day" },
  { value: "fundraiser", label: "Fundraiser / gala" },
  { value: "community", label: "Community event" },
  { value: "event", label: "Other" },
];

export function useCharityAdminForm(onSuccess) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    category: "general",
  });
  const [events, setEvents] = useState([emptyEvent()]);

  const addEventRow = useCallback(() => {
    setEvents((rows) => [...rows, emptyEvent()]);
  }, []);

  const removeEventRow = useCallback((index) => {
    setEvents((rows) => (rows.length <= 1 ? rows : rows.filter((_, i) => i !== index)));
  }, []);

  const updateEvent = useCallback((index, patch) => {
    setEvents((rows) => rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }, []);

  const reset = useCallback(() => {
    setForm({ name: "", description: "", image: "", category: "general" });
    setEvents([emptyEvent()]);
  }, []);

  const buildEventsPayload = useCallback(() => {
    return events
      .map((ev) => ({
        title: String(ev.title || "").trim(),
        date: ev.date ? new Date(ev.date) : undefined,
        description: String(ev.description || "").trim() || undefined,
        type: ev.type || "event",
      }))
      .filter((ev) => ev.title.length > 0);
  }, [events]);

  const createCharity = useCallback(async () => {
    if (!form.name.trim()) {
      toast.error("Charity name is required");
      return;
    }
    const payloadEvents = buildEventsPayload();
    for (const ev of events) {
      const t = String(ev.title || "").trim();
      if (t && !ev.date) {
        toast.error(`Add a date for “${t.slice(0, 40)}…” or clear the title`);
        return;
      }
    }
    try {
      await charityApi.create({
        name: form.name.trim(),
        description: form.description,
        image: form.image || undefined,
        category: form.category,
        events: payloadEvents,
      });
      toast.success("Charity created");
      reset();
      onSuccess?.();
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Create charity failed");
    }
  }, [form, events, buildEventsPayload, reset, onSuccess]);

  return {
    form,
    setForm,
    events,
    EVENT_TYPES,
    addEventRow,
    removeEventRow,
    updateEvent,
    createCharity,
    reset,
  };
}
