export class SegmentFile {
  constructor(private readonly path: string) {}

  public getPath(): string {
    return this.path;
  }
}
