import type { SegmentFile } from "./SegmentFile";

export class SegmentFiles {
  constructor(private readonly files: SegmentFile[]) {}

  public getSegmentFiles(): SegmentFile[] {
    return this.files;
  }
}
