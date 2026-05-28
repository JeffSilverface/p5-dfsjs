"use client";

import { UserForm } from "@/components/molecules/forms/userForm";
import { TopicCard } from "@/components/molecules/cards/topicCard";
import { useTopics, useUnsubscribe } from "@/hooks/useTopics";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  const { data: topics } = useTopics();
  const unsubscribe = useUnsubscribe();

  const subscribedTopics = topics?.filter((t) => t.isSubscribed) ?? [];

  return (
    <>
      <div className="mx-auto max-w-md">
        <h1 className="mb-6 text-xl font-bold">Mon profil</h1>
        <UserForm />
      </div>
      {subscribedTopics.length > 0 && (
        <section className="mt-10">
          <Separator className="m-4" />
          <h2 className="mb-4 text-xl font-semibold text-center">
            Mes abonnements
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {subscribedTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onUnsubscribe={(id) => unsubscribe.mutate(id)}
                isUnsubscribing={
                  unsubscribe.isPending && unsubscribe.variables === topic.id
                }
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
