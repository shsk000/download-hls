import { type Tag } from "./interfaces/Tag";

export class VersionTags implements Tag {
  constructor(private readonly version: number) {}

  public getVersion(): number {
    return this.version;
  }

  public valid(): boolean {
    if (this.version !== 3) {
      throw new Error("Only version 3 format is available for download");
    }

    return true;
  }
}
