import { env } from "@/config/env";

export function useYoutube() {
  const searchChannels = async (query: string) => {
    try {
      const res = await fetch(
        `${env.apiUrl}/api/youtube/search?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Failed to fetch channels");
      return res.json();
    } catch (error) {
      console.error("Error searching channels:", error);
      throw error;
    }
  };

  const getChannelDetails = async (channelId: string) => {
    try {
      const res = await fetch(`${env.apiUrl}/api/youtube/channel/${channelId}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch channel");
      }
      return res.json();
    } catch (error) {
      console.error("Error getting channel:", error);
      throw error;
    }
  };

  const getVideoDetails = async (videoId: string) => {
    try {
      const res = await fetch(`${env.apiUrl}/api/youtube/video/${videoId}`);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch video");
      }
      return res.json();
    } catch (error) {
      console.error("Error getting video:", error);
      throw error;
    }
  };

  return {
    searchChannels,
    getChannelDetails,
    getVideoDetails,
  };
}
