import { component$, useVisibleTask$, $ } from "@builder.io/qwik";
import type { PlaylistWithFeatures } from "@/lib/spotify";
import { formatMusicalKey, formatCamelotTransitionEmoji, formatDurationHHMMSS } from "@/utils/format";

import styles from "./playlist.module.scss";
import type { CamelotKey } from "@/lib/analyzer";
import { analyze, calculateTransition } from "@/lib/analyzer";

type Props = {
  playlist: PlaylistWithFeatures;
};

export const Playlist = component$<Props>(({ playlist }) => {
  useVisibleTask$(() => {
    console.log(playlist.tracks);
  });

  const printSuggestions = $((id: string, camelot: CamelotKey) => {
    const suggestions = analyze(camelot);

    const perfect: string[] = [];
    const moodChange: string[] = [];
    const energyBoost: Record<string, string[]> = {
      low: [],
      moderate: [],
      high: [],
    };
    const energyDrop: Record<string, string[]> = {
      low: [],
      moderate: [],
      high: [],
    };

    for (const { track, features } of playlist.tracks) {
      if (track.id === id) {
        continue;
      }

      const name = `${track.name} | ${Math.round(features.tempo)}`;

      if (suggestions.perfectMatch.includes(features.camelot)) {
        perfect.push(name);
      }
      if (features.camelot === suggestions.moodChange) {
        moodChange.push(name);
      }

      if (suggestions.energyBoost.low.includes(features.camelot)) {
        energyBoost.low.push(name);
      }
      if (suggestions.energyBoost.moderate.includes(features.camelot)) {
        energyBoost.moderate.push(name);
      }
      if (suggestions.energyBoost.high.includes(features.camelot)) {
        energyBoost.high.push(name);
      }

      if (suggestions.energyDrop.low.includes(features.camelot)) {
        energyDrop.low.push(name);
      }
      if (suggestions.energyDrop.moderate.includes(features.camelot)) {
        energyDrop.moderate.push(name);
      }
      if (suggestions.energyDrop.high.includes(features.camelot)) {
        energyDrop.high.push(name);
      }
    }

    console.log({
      perfect,
      moodChange,
      energyBoost,
      energyDrop,
    });
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
          {/*<div>Duration</div>*/}
          <div>Duration</div>
          <div class="text-center">Key</div>
          <div class="text-center">Camelot</div>
          <div class="text-center">BPM</div>
        </li>
        {playlist.tracks.map(({ track, features }, i) => {
          return (
            <li key={track.id} class={styles.item} onClick$={() => printSuggestions(track.id, features.camelot)}>
              <div>
                <img src={track.album.images[2].url} width={64} height={64} alt={`${track.name} thumbnail`} />
              </div>
              <div>{track.name}</div>
              {/*<div class="text-right">{formatDurationMMSS(track.duration_ms)}</div>*/}
              <div class="text-right">{formatDurationHHMMSS(features.cumulativeTimeMs)}</div>
              <div class="text-center">{formatMusicalKey(features.musicalKey)}</div>
              <div class="text-center">{features.camelot}</div>
              <div class="text-center">{Math.round(features.tempo)}</div>
              {playlist.tracks[i + 1] && (
                <div class={styles.transition}>
                  {formatCamelotTransitionEmoji(
                    calculateTransition(features.camelot, playlist.tracks[i + 1].features.camelot),
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
});
