import { transformTranscript } from "@/lib/youtube";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Video ID is required" },
      { status: 400 }
    );
  }

  const videoParams = new URLSearchParams(query);
  const videoId = videoParams.get("https://www.youtube.com/watch?v");

  const response = await axios.get(
    `https://youtubetranscript.com/?server_vid2=${videoId}`
  );

  const html = response.data;

  const transcript = transformTranscript(html);

  try {
    // const transcription = await YoutubeTranscript.fetchTranscript(query);
    // if (!transcription) {
    //   return NextResponse.json(
    //     { error: "transcription not found" },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({ transcript });
  } catch (error) {
    console.error("Video fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch transcription", message: error },
      { status: 500 }
    );
  }
}
