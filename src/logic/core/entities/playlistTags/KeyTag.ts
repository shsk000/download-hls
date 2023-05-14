import { type Tag } from "./interfaces/Tag";

export class KeyTag implements Tag {
  constructor(private readonly key: string) {}

  public getKey(): string {
    return this.key;
  }

  public valid(): boolean {
    if (this.key !== "") {
      throw new Error("Encrypted file downloads are not supported");
    }

    return true;
  }
}
