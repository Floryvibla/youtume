import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackButton } from "@/components/ui/back-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { env } from "@/config/env";

async function getChannelData(channelId: string) {
  const res = await fetch(`${env.apiUrl}/api/youtube/channel/${channelId}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch channel");
  }
  return res.json();
}

function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const data = await getChannelData((await params).id);

  if (!data) {
    notFound();
  }

  console.log("data", data);

  return null;

  const channel = data.items[0];
  const { snippet, statistics, brandingSettings } = channel;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner */}
        <div className="relative h-32 sm:h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary/5">
          {brandingSettings?.image?.bannerExternalUrl && (
            <Image
              src={brandingSettings.image.bannerExternalUrl}
              alt=""
              fill
              className="object-cover"
            />
          )}
          <div className="absolute top-4 left-4">
            <BackButton />
          </div>
        </div>

        {/* Channel Info */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20 mb-8 relative">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <Image
                src={
                  snippet.thumbnails.high?.url || snippet.thumbnails.default.url
                }
                alt={snippet.title}
                width={160}
                height={160}
                className="rounded-full border-4 border-background"
              />
            </div>

            {/* Channel Info */}
            <div className="flex-1 pt-4">
              <h1 className="text-3xl font-bold mb-2">{snippet.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-foreground/70 mb-4">
                <span>{snippet.customUrl}</span>
                <span>
                  {formatNumber(parseInt(statistics.subscriberCount))}{" "}
                  subscribers
                </span>
                <span>
                  {formatNumber(parseInt(statistics.videoCount))} videos
                </span>
                <span>
                  {formatNumber(parseInt(statistics.viewCount))} views
                </span>
              </div>
              <p className="text-sm line-clamp-2 mb-4">{snippet.description}</p>
              <div className="flex gap-4">
                <Link
                  href={`https://youtube.com/channel/${channel.id}`}
                  target="_blank"
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Visit Channel
                </Link>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="home" className="mb-8">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
              <TabsTrigger
                value="home"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                value="videos"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger
                value="playlists"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Playlists
              </TabsTrigger>
              <TabsTrigger
                value="about"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                About
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="mt-6">
              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-4">Featured Video</h3>
                  {/* Featured video placeholder */}
                  <div className="aspect-video bg-muted rounded-lg"></div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-4">
                    Popular Uploads
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Video cards placeholders */}
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="space-y-2">
                        <div className="aspect-video bg-muted rounded-lg"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Video grid placeholders */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-video bg-muted rounded-lg"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="playlists" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {/* Playlist grid placeholders */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="aspect-video bg-muted rounded-lg"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <div className="max-w-3xl space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <p className="whitespace-pre-wrap">{snippet.description}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-4">Stats</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-foreground/70">Joined</p>
                      <p>
                        {new Date(snippet.publishedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Total Views</p>
                      <p>{formatNumber(parseInt(statistics.viewCount))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/70">Location</p>
                      <p>
                        {brandingSettings?.channel?.country || "Not specified"}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
