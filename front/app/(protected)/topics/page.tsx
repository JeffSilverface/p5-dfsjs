"use client";

import { TopicCard } from "@/components/molecules/cards/topicCard";
import { useTopics } from "@/hooks/useTopics";

export default function Topics() {
  const { data: topics, isLoading, isError } = useTopics();

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement des thèmes.</p>;
  if (topics?.length === 0) return <p>Aucun thème disponible.</p>;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {topics?.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
