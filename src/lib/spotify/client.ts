import axios, { AxiosInstance } from "axios";
import { RequestEventLoader } from "@builder.io/qwik-city";

import { Playlist, PlaylistWithFeatures, TracksFeaturesResponse } from "./types";
import { indexByProp } from "@/utils/array";
import { Camelot, musicalKeyFromPitchClass } from "~/lib/analyzer";

const MS_SECOND = 1000;
const MS_MINUTE = 1000 * 60;

const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

type AccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number; // seconds
};

function spotifyAuthManager(clientID: string, clientSecret: string) {
  const client_id = clientID;
  const client_secret = clientSecret;
  let expiresAt = Date.now() - MS_MINUTE; // 1 minute ago, expired
  let accessToken: string | null = null;

  return {
    expired: () => Date.now() >= expiresAt || !accessToken,
    refreshToken: () =>
      axios
        .request<AccessTokenResponse>({
          method: "POST",
          url: SPOTIFY_TOKEN_URL,
          data: {
            grant_type: "client_credentials",
            client_id,
            client_secret,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then(({ data: { access_token, expires_in } }) => {
          accessToken = access_token;
          expiresAt = Date.now() + expires_in * MS_SECOND;
        }),
    getAccessToken: () => accessToken,
  };
}

class SpotifyAPI {
  private authManager: ReturnType<typeof spotifyAuthManager>;
  private client: AxiosInstance;

  constructor(clientId: string, clientSecret: string) {
    this.authManager = spotifyAuthManager(clientId, clientSecret);
    this.client = axios.create({
      baseURL: SPOTIFY_BASE_URL,
    });

    this.client.interceptors.request.use(async (req) => {
      if (this.authManager.expired()) {
        await this.authManager.refreshToken();
      }

      req.headers["Authorization"] = `Bearer ${this.authManager.getAccessToken()}`;
      return req;
    });
  }

  async getPlaylist(playlistId: string) {
    const { data } = await this.client.get<Playlist>(`/playlists/${playlistId}`);
    return data;
  }

  async getTracksFeatures(trackIds: string[]) {
    if (trackIds.length > 100) {
      throw new Error("Track ids must be less than 100"); // TODO: support more than 100 tracks
    }

    const { data } = await this.client.get<TracksFeaturesResponse>(`/audio-features`, {
      params: {
        ids: trackIds.join(","),
      },
    });
    return data;
  }

  async getPlaylistWithAudioFeatures(playlistId: string): Promise<PlaylistWithFeatures> {
    const playlist = await this.getPlaylist(playlistId);
    const trackIds = playlist.tracks.items.map((item) => item.track.id);
    const tracksFeatures = await this.getTracksFeatures(trackIds);
    tracksFeatures.audio_features = tracksFeatures.audio_features.filter(Boolean);
    const indexedFeatures = indexByProp(tracksFeatures.audio_features, "id");

    let cumulativeTimeMs = 0;
    return {
      ...playlist,
      tracks: playlist.tracks.items
        .map(({ track }) => {
          const features = indexedFeatures[track.id];
          if (!features) {
            return null;
          }

          const musicalKey = musicalKeyFromPitchClass(features.key, features.mode);
          const camelot = Camelot.FromMusicalKey(musicalKey).key;

          cumulativeTimeMs += features.duration_ms;

          return {
            track,
            features: {
              ...features,
              musicalKey,
              camelot,
              cumulativeTimeMs,
            },
          };
        })
        .filter(Boolean) as PlaylistWithFeatures["tracks"],
    };
  }
}

// SpotifyAPI factory, returns a function that gets the spotifyAPI from Qwik's request event loader
function spotifyAPIFactory() {
  let api: SpotifyAPI | null = null;
  return function (loader: RequestEventLoader): SpotifyAPI {
    if (!api) {
      const clientId = loader.env.get("SPOTIFY_CLIENT_ID") ?? "";
      const clientSecret = loader.env.get("SPOTIFY_CLIENT_SECRET") ?? "";

      api = new SpotifyAPI(clientId, clientSecret);
    }

    return api;
  };
}

export const spotifyAPI = spotifyAPIFactory();
