
export type ShellBarConfig = {
  actionUrl: string;
};

export class ShellBarConfigService {

  constructor(public readonly actionUrl: string) {
  }
}
