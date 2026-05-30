"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { TopicWithSubscription } from "@/types/topic.types";
import { useSubscribe } from "@/hooks/useTopics";

type TopicCardProps = {
  topic: TopicWithSubscription;
  onUnsubscribe?: (topicId: string) => void;
  isUnsubscribing?: boolean;
};

export function TopicCard({ topic, onUnsubscribe, isUnsubscribing }: TopicCardProps) {
  const subscribe = useSubscribe();

  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <h2 className="text-lg font-bold">{topic.name}</h2>
      </CardHeader>
      <CardContent>
        <p className="text-md">{topic.description}</p>
      </CardContent>
      <CardFooter className="justify-center">
        {onUnsubscribe ? (
          <Button
            variant="destructive"
            data-testid={`unsubscribe-${topic.id}`}
            disabled={isUnsubscribing}
            onClick={() => onUnsubscribe(topic.id)}
          >
            {isUnsubscribing ? "Désabonnement..." : "Se désabonner"}
          </Button>
        ) : (
          <Button
            data-testid={`subscribe-${topic.id}`}
            disabled={topic.isSubscribed || subscribe.isPending}
            className={topic.isSubscribed ? "bg-gray-400 hover:bg-gray-400" : ""}
            onClick={() => subscribe.mutate(topic.id)}
          >
            {topic.isSubscribed ? "Déjà abonné" : "S'abonner"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
