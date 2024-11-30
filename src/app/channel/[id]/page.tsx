import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BackButton } from "@/components/ui/back-button";
import Image from "next/image";
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

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const data = await getChannelData((await params).id);

  if (!data) {
    notFound();
  }

  const channel = data.items[0];
  const { snippet, statistics } = channel;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Banner */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 to-primary/5">
          {snippet.brandingSettings?.image?.bannerExternalUrl && (
            <Image
              src={snippet.brandingSettings.image.bannerExternalUrl}
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
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-6 items-center mb-8">
            <Image
              src={snippet.thumbnails.default.url}
              alt={snippet.title}
              width={128}
              height={128}
              className="rounded-full"
            />
            <div>
              <h1 className="text-3xl font-bold">{snippet.title}</h1>
              <p className="text-foreground/70">
                {parseInt(statistics.subscriberCount).toLocaleString()}{" "}
                subscribers • {parseInt(statistics.videoCount).toLocaleString()}{" "}
                videos
              </p>
              <p className="mt-2">{snippet.description}</p>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Latest Videos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Videos serão adicionados em uma atualização futura */}
              <div className="text-center py-8 text-foreground/70 col-span-full">
                Videos coming soon...
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
