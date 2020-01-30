import { uniqBy } from 'lodash';
import { DanceLink } from './provider';

export class BaseProvider {
  protected dedupe(links: DanceLink[]): DanceLink[] {
    return uniqBy(links, 'href');
  }
}
