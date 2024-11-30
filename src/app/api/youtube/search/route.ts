import { youtubeService } from "@/lib/youtube";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const limit = searchParams.get("limit");
  const type = searchParams.get("type");
  const nextPageContext = searchParams.get("nextPageContext");

  if (!query && !nextPageContext) {
    return NextResponse.json(
      { error: "Query parameter 'q' or nextPageContext is required" },
      { status: 400 }
    );
  }

  const defaultLimit = 30;

  try {
    let results;

    if (nextPageContext) {
      // Handle pagination
      const nextPage = JSON.parse(nextPageContext);
      results =
        type === "channel"
          ? await youtubeService.searchChannelsNextPage(
              nextPage,
              limit ? parseInt(limit) : defaultLimit
            )
          : await youtubeService.searchAllNextPage(
              nextPage,
              limit ? parseInt(limit) : defaultLimit
            );
    } else {
      // Initial search
      results =
        type === "channel"
          ? await youtubeService.searchChannels(
              query!,
              limit ? parseInt(limit) : defaultLimit
            )
          : await youtubeService.searchAll(
              query!,
              limit ? parseInt(limit) : defaultLimit
            );
    }

    if (!results || !Array.isArray(results.items)) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}
