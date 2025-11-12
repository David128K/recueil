import { Metadata } from 'next';
import { metadata as studioMetadata } from 'next-sanity/studio';

export const metadata: Metadata = {
  ...studioMetadata,
  title: 'Recueil Studio',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
