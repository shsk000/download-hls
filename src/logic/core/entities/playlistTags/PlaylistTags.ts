import type { Tag } from "./interfaces/Tag";

export class PlaylistTags {
  constructor(private readonly tags: Tag[]) {}

  public getTags(): Tag[] {
    return this.tags;
  }
}
