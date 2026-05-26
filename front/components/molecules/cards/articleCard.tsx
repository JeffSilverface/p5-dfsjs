import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function ArticleCard() {
  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <h2 className="text-lg font-bold">Titre de l&apos;article</h2>
      </CardHeader>
      <CardContent>
        <p className="text-md ">Contenu de l&apos;article</p>
      </CardContent>
      <CardFooter>
        <span className="flex-1 text-sm">Auteur</span>
        <span className="flex-1 text-sm">Today</span>
      </CardFooter>
    </Card>
  );
}
