import { Instagram, Youtube } from "lucide-react";

export const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.87a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.3z" />
  </svg>
);

export const SpotifyIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.224.366-.706.48-1.072.256-2.94-1.797-6.64-2.203-10.995-1.207a.78.78 0 01-.939-.587.78.78 0 01.587-.939c4.762-1.088 8.852-.624 12.149 1.392.367.224.481.706.27 1.085zm1.474-3.272c-.282.456-.879.6-1.335.318-3.366-2.07-8.498-2.668-12.481-1.458-.513.156-1.054-.135-1.21-.648a.97.97 0 01.648-1.21c4.553-1.382 10.213-.717 14.082 1.665.456.282.6.879.296 1.333zm.127-3.403C15.078 8.27 8.36 8.04 4.687 9.158a1.166 1.166 0 11-.674-2.232c4.215-1.281 11.622-1.013 16.196 1.71a1.166 1.166 0 11-1.187 2.005z" />
  </svg>
);

export const AppleMusicIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.703.143 19.179.034 18.648 0 18.115 0H5.882c-.529 0-1.058.034-1.581.143-1.207.249-2.272.789-3.114 1.713C.55 2.621.144 3.62.039 4.732.013 5.001 0 5.27 0 5.539v12.927c0 .538.039 1.072.18 1.595.337 1.276 1.062 2.252 2.146 2.961.66.43 1.385.673 2.155.79.355.052.715.067 1.075.067h12.49c.516 0 1.024-.05 1.526-.183.99-.262 1.847-.747 2.566-1.466.847-.847 1.345-1.86 1.708-3.013.21-.679.252-1.382.252-2.085V6.123zm-7.96 4.747l-5.06 1.087c-.205.044-.4.124-.547.298-.197.235-.21.51-.21.79v5.473c0 .227.018.452-.057.674-.183.534-.595.832-1.117.926-.357.064-.722.068-1.082-.005-1.21-.247-1.97-1.41-1.65-2.621.213-.811.84-1.355 1.692-1.512.55-.102 1.108-.13 1.667-.183.32-.03.64-.07.96-.13a.59.59 0 00.51-.59l.005-9.39c0-.262.064-.439.349-.51 4.1-.86 8.2-1.72 12.3-2.58.4-.084.748.17.748.585v6.583c0 .218-.014.435-.067.648-.184.74-.7 1.182-1.435 1.343-.474.103-.954.183-1.435.255-.554.084-1.118.117-1.667.213-.93.165-1.567.838-1.617 1.728-.05.85.51 1.6 1.345 1.787.51.115 1.027.122 1.547.054.92-.117 1.62-.62 1.957-1.495.13-.336.198-.69.198-1.054l.003-7.297c0-.13.013-.262.034-.39.06-.392.32-.62.71-.69.5-.09 1-.183 1.5-.275.45-.084.74-.39.79-.84z" />
  </svg>
);

export type SocialPlatform = "Instagram" | "YouTube" | "TikTok" | "Spotify" | "Apple Music";

export interface SocialLink {
  name: SocialPlatform;
  url: string;
  Icon: (props: { size?: number }) => JSX.Element;
  /** Tailwind text color class for hover branding */
  hoverColorClass: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/nachmencohen",
    Icon: ({ size = 18 }) => <Instagram size={size} />,
    hoverColorClass: "hover:text-primary",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@nachman_cohen",
    Icon: ({ size = 18 }) => <Youtube size={size} />,
    hoverColorClass: "hover:text-primary",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@nachman_cohen_music?_r=1&_t=ZN-94co99vL1bK",
    Icon: ({ size = 18 }) => <TikTokIcon size={size} />,
    hoverColorClass: "hover:text-primary",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/3FW9FTp7VhD1x4B9TMN2iF?si=2mE9t461R7eG3GJfMyOELQ",
    Icon: ({ size = 18 }) => <SpotifyIcon size={size} />,
    hoverColorClass: "hover:text-[#1DB954]",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/artist/6817063247",
    Icon: ({ size = 18 }) => <AppleMusicIcon size={size} />,
    hoverColorClass: "hover:text-primary",
  },
];