import Link from "next/link";
import { SearchBar } from "@/components/search-bar";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full p-4 border-b sticky top-0 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">YouTume</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Discover Amazing YouTube Channels
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Find your next favorite content creators. Search by name, category,
            or content type.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <SearchBar />
        </div>

        {/* Categories Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Popular Categories</h2>
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Gaming",
              "Education",
              "Music",
              "Tech",
              "Cooking",
              "Fitness",
              "Art",
              "Travel",
            ].map((category) => (
              <Link
                href={`/category/${category.toLowerCase()}`}
                key={category}
                className="p-6 border rounded-lg hover:bg-foreground/5 transition-colors text-left group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category}
                </h3>
                <p className="text-sm text-foreground/70">
                  Discover top {category.toLowerCase()} channels
                </p>
              </Link>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
