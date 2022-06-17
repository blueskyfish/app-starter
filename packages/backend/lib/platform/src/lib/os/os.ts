import * as path from 'path';
import * as os from 'os';

export class OS {

  static get homePath() {
    return os.homedir();
  }

  static getHomePathWith(pathname: string): string {
    return path.join(os.homedir(), pathname);
  }
}
