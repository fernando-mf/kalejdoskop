import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { Playlist } from "@/components/playlist";

import { spotifyAPI } from "~/lib/spotify";

export const useSpotifyPlaylist = routeLoader$(async (requestEvent) => {
  const playlistId = requestEvent.params.playlistId;
  return spotifyAPI(requestEvent).getPlaylistWithAudioFeatures(playlistId);
});

export default component$(() => {
  const playlistSignal = useSpotifyPlaylist();

  return (
    <div>
      <Playlist playlist={playlistSignal.value} />
    </div>
  );
});
