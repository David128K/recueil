'use client';

import MuxPlayer from '@mux/mux-player-react';

type MuxVideoPlayerProps = {
  playbackId: string;
  thumbTime?: number;
  categoryName: string;
};

export default function MuxVideoPlayer({
  playbackId,
  thumbTime,
  categoryName,
}: MuxVideoPlayerProps) {
  return (
    <div className="relative w-full aspect-[16/9]">
      <MuxPlayer
        playbackId={playbackId}
        thumbnailTime={thumbTime || 0}
        streamType="on-demand"
        accentColor="#00ACA3"
        style={{ aspectRatio: '16/9', width: '100%' }}
      />
      <div className="absolute top-5 left-5 z-10">
        <span className="inline-block px-4 py-2 text-sm font-semibold text-white bg-[var(--color-accent)] rounded-full shadow-md">
          {categoryName}
        </span>
      </div>
    </div>
  );
}
