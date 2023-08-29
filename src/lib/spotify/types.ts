import type { CamelotKey, MusicalKey, MusicalKeyMode } from "@/lib/analyzer";

type PlaylistImage = {
  height: number;
  width: number;
  url: string;
};

type PlaylistAlbum = {
  id: string;
  images: PlaylistImage[];
};

type PlaylistArtist = {
  id: string;
  name: string;
};

type PlaylistTrack = {
  id: string;
  duration_ms: number;
  name: string;
  album: PlaylistAlbum;
  artists: PlaylistArtist[];
  is_local: boolean;
  preview_url: string;
  popularity: number;
};

type PlaylistTrackItem = {
  track: PlaylistTrack;
  is_local: boolean;
};

type SpotifyUser = {
  id: string;
  display_name: string;
};

export type Playlist = {
  images: PlaylistImage[];
  name: string;
  public: boolean;
  collaborative: boolean;
  description: string;
  tracks: {
    items: PlaylistTrackItem[];
  };
  owner: SpotifyUser;
};

export type PlaylistWithFeatures = Omit<Playlist, "tracks"> & {
  tracks: {
    track: PlaylistTrack;
    features: TrackFeatures & {
      camelot: CamelotKey;
      musicalKey: MusicalKey;
    };
  }[];
};

export type TrackFeatures = {
  acousticness: number;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  // pitch class notation -> https://en.wikipedia.org/wiki/Pitch_class
  // -1 if no pitch detected
  key: number;
  liveness: number;
  loudness: number;
  mode: MusicalKeyMode;
  speechiness: number;
  tempo: number;
  time_signature: number;
  valence: number;
};

export type TracksFeaturesResponse = {
  audio_features: TrackFeatures[];
};
