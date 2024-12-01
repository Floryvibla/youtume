// @ts-ignore
import YoutubeSearchAPI from "youtube-search-api";

export interface SearchResult {
  items: any[];
  nextPage?: {
    nextPageToken: string;
    nextPageContext: any;
  };
}

export const youtubeService = {
  async searchAll(query: string, limit: number = 10): Promise<SearchResult> {
    try {
      const results = await YoutubeSearchAPI.GetListByKeyword(
        query,
        false,
        limit
      );
      return results;
    } catch (error) {
      console.error("Error searching:", error);
      return { items: [] };
    }
  },

  async searchAllNextPage(
    nextPage: any,
    limit: number = 10
  ): Promise<SearchResult> {
    try {
      const results = await YoutubeSearchAPI.NextPage(nextPage, true, 30);
      return results;
    } catch (error) {
      console.error("Error getting next page:", error);
      return { items: [] };
    }
  },

  async searchChannels(
    query: string,
    limit: number = 10
  ): Promise<SearchResult> {
    try {
      const results = await YoutubeSearchAPI.GetListByKeyword(
        query,
        false,
        limit,
        [{ type: "channel" }]
      );
      return results;
    } catch (error) {
      console.error("Error searching channels:", error);
      return { items: [] };
    }
  },

  async searchChannelsNextPage(
    nextPage: any,
    limit: number = 10
  ): Promise<SearchResult> {
    try {
      const results = await YoutubeSearchAPI.NextPage(nextPage, false, limit, [
        { type: "channel" },
      ]);
      return results;
    } catch (error) {
      console.error("Error getting next page for channels:", error);
      return { items: [] };
    }
  },

  async getChannelById(channelId: string): Promise<any> {
    try {
      const result = await YoutubeSearchAPI.GetChannelById(channelId);
      return result;
    } catch (error) {
      console.error("Error getting channel:", error);
      return null;
    }
  },

  async getPlaylistData(playlistId: string, limit: number = 10): Promise<any> {
    try {
      const result = await YoutubeSearchAPI.GetPlaylistData(playlistId, limit);
      return result;
    } catch (error) {
      console.error("Error getting playlist:", error);
      return null;
    }
  },

  async getVideoDetails(videoId: string): Promise<any> {
    try {
      const result = await YoutubeSearchAPI.GetVideoDetails(videoId);
      return result;
    } catch (error) {
      console.error("Error getting video details:", error);
      return null;
    }
  },
};

export function transformTranscript(transcript: string) {
  if (!transcript) {
    return [];
  }
  const regex = /<text start="([\d.]+)" dur="([\d.]+)">(.*?)<\/text>/g;
  const result = [];
  let match;

  while ((match = regex.exec(transcript)) !== null) {
    const [, start, duration, text] = match;
    result.push({
      text: text.trim(),
      duration: parseFloat(duration),
      offset: parseFloat(start),
    });
  }

  return result;
}
