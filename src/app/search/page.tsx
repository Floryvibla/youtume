import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/config/env";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface Length {
  accessibility: {
    accessibilityData: {
      label: string;
    };
  };
  simpleText: string;
}

interface SearchItem {
  id: string;
  type: "video" | "channel" | "playlist";
  thumbnail: {
    thumbnails: Thumbnail[];
  };
  title: string;
  channelTitle: string;
  shortBylineText?: {
    runs: {
      text: string;
      navigationEndpoint: {
        browseEndpoint: {
          browseId: string;
          canonicalBaseUrl: string;
        };
      };
    }[];
  };
  length?: Length;
  isLive: boolean;
}

interface SearchResponse {
  items: SearchItem[];
  nextPage?: {
    nextPageToken: string;
    nextPageContext: any;
  };
}

async function searchContent(
  query: string,
  nextPageContext?: string
): Promise<SearchResponse> {
  try {
    const params = new URLSearchParams();
    if (query) params.append("q", query);
    if (nextPageContext) params.append("nextPageContext", nextPageContext);

    const res = await fetch(
      `${env.apiUrl}/api/youtube/search?${params.toString()}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch channels");
    }
    return res.json();
  } catch (error) {
    console.error("Search error:", error);
    return { items: [] };
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page?: string }>;
}) {
  const params = await searchParams;
  const query = params.q;
  const nextPageContext = params.page;

  const data = await searchContent(query, nextPageContext);
  const items = data?.items || [];
  const nextPage = data?.nextPage;

  const videos = items.filter((item) => item.type === "video");
  const channels = items.filter((item) => item.type === "channel");
  const playlists = items.filter((item) => item.type === "playlist");

  const buildNextPageUrl = () => {
    const params = new URLSearchParams();
    params.append("q", query);
    if (nextPage?.nextPageContext) {
      params.append(
        "nextPageContext",
        encodeURIComponent(JSON.stringify(nextPage.nextPageContext))
      );
    }
    return `/search?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
          <h1 className="text-2xl font-bold">Search results for: {query}</h1>
        </div>

        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="videos">Videos ({videos.length})</TabsTrigger>
            <TabsTrigger value="channels">
              Channels ({channels.length})
            </TabsTrigger>
            <TabsTrigger value="playlists">
              Playlists ({playlists.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <Link
                    href={`https://youtube.com/watch?v=${video.id}`}
                    key={video.id}
                    target="_blank"
                    className="group"
                  >
                    <div className="aspect-video relative rounded-lg overflow-hidden mb-2">
                      <Image
                        src={
                          video.thumbnail.thumbnails[1]?.url ||
                          video.thumbnail.thumbnails[0].url
                        }
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="font-medium group-hover:text-primary line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {video.channelTitle}
                    </p>
                  </Link>
                ))}
              </div>

              {nextPage && (
                <div className="flex justify-center">
                  <Link href={buildNextPageUrl()}>
                    <Button variant="outline">Load More</Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {channels.map((channel) => (
                <Link
                  href={channel.id ? `/channel/${channel.id}` : "#"}
                  key={channel.id}
                  className="block p-4 border rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  <div className="flex gap-4 items-center">
                    <div className="relative w-16 h-16">
                      <Image
                        src={channel.thumbnail.thumbnails[0].url.replace(
                          /^\/\//,
                          "https://"
                        )}
                        alt={channel.title}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{channel.title}</h2>
                      <p className="text-sm mt-1">{channel.channelTitle}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {playlists.map((playlist) => (
                <Link
                  href={`https://youtube.com/playlist?list=${playlist.id}`}
                  key={playlist.id}
                  target="_blank"
                  className="group"
                >
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-2">
                    <Image
                      src={
                        playlist.thumbnail.thumbnails[1]?.url ||
                        playlist.thumbnail.thumbnails[0].url
                      }
                      alt={playlist.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-medium group-hover:text-primary line-clamp-2">
                    {playlist.title}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {playlist.channelTitle}
                  </p>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
