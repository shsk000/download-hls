import { type Tag } from "./interfaces/Tag";

enum PlaylistType {
  VOD,
  EVENT,
}

export class PlaylistTypeTags implements Tag {
  constructor(private readonly type: PlaylistType) {}

  public getType(): PlaylistType {
    return this.type;
  }

  public valid(): boolean {
    if (this.type === PlaylistType.EVENT) {
      throw new Error("EVENT format video download is not supported");
    }
    return true;
  }
}
