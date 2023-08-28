import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { Playlist as SpotifyPlaylist } from "@/lib/spotify";
import { formatDurationMMSS } from "@/utils/format";

import styles from "./playlist.module.scss";

type Props = {
  playlist: SpotifyPlaylist;
};

export const Playlist = component$<Props>(({ playlist }) => {
  useVisibleTask$(() => {
    console.log(playlist.tracks.items[16]);
  });

  return (
    <div class="flex flex-col gap-10 px-5">
      <div class="flex flex-col items-center">
        <img
          class="mb-4 w-32 h-32"
          width={128} // w-32
          height={128} // h-32
          src={playlist.images[1]?.url} // pick middle image
          alt={`${playlist.name} cover image`}
        />
        <h1 class="text-4xl">{playlist.name}</h1>
        <div class="text-sm">by {playlist.owner.display_name}</div>
      </div>
      <ol class="mx-auto flex flex-col gap-5 w-full sm:w-10/12 md:w-8/12 lg:w-6/12">
        <li class={[styles.item, "font-bold"]}>
          <div />
          <div>Song</div>
          <div>Duration</div>
          <div>Popularity</div>
        </li>
        {playlist.tracks.items.map(({ track }, i) => (
          <li key={track.id} class={styles.item}>
            <div>
              <img
                src={track.album.images[2].url}
                width={64}
                height={64}
                alt={`${track.name} thumbnail`}
              />
            </div>
            <div>{track.name}</div>
            <div class="text-right">
              {formatDurationMMSS(track.duration_ms)}
            </div>
            <div class="text-center">{track.popularity} / 100</div>
          </li>
        ))}
      </ol>
    </div>
  );
});
