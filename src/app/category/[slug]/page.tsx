import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackButton } from "@/components/ui/back-button";
import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - seria substituído por dados reais da API
const mockChannels = [
  {
    id: "1",
    title: "Gaming Master",
    description: "Pro gaming tips and gameplay",
    subscribers: "2.1M",
    thumbnailUrl: "https://picsum.photos/seed/3/64",
    views: "10M",
    joined: "2019",
  },
  // ... mais canais
];

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const categoryName =
    (await params).slug.charAt(0).toUpperCase() + (await params).slug.slice(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <div>
            <h1 className="text-3xl font-bold mb-2">{categoryName} Channels</h1>
            <p className="text-foreground/70">
              Discover the best {categoryName.toLowerCase()} content creators on
              YouTube
            </p>
          </div>
        </div>

        <Tabs defaultValue="popular" className="mb-8">
          <TabsList>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New Channels</TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <div className="space-y-4">
              {mockChannels.map((channel) => (
                <Link
                  href={`/channel/${channel.id}`}
                  key={channel.id}
                  className="block p-4 border rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      src={channel.thumbnailUrl}
                      alt={channel.title}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">
                          {channel.title}
                        </h2>
                        <span className="text-sm text-foreground/70">
                          Joined {channel.joined}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/70">
                        {channel.subscribers} subscribers • {channel.views}{" "}
                        views
                      </p>
                      <p className="text-sm mt-1">{channel.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="trending">
            <div className="text-center py-8 text-foreground/70">
              Coming soon...
            </div>
          </TabsContent>
          <TabsContent value="new">
            <div className="text-center py-8 text-foreground/70">
              Coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
