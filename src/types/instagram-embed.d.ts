
interface InstagramEmbed {
  Embeds: {
    process: () => void;
  };
}

declare interface Window {
  instgrm?: InstagramEmbed;
}
