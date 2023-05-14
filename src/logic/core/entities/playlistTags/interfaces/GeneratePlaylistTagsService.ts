import { type PlaylistTags } from "../PlaylistTags";

export interface GeneratePlaylistTagsService {
  generate: (fileString: string) => PlaylistTags;
}
