import * as Fuse from 'fuse.js';
import { FuseResultWithScore } from 'fuse.js';
import { DanceLink } from '../providers/provider';

export class SearchDance {
  private static SCORE_THRESHOLD = 0.2;
  private static options = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'title',
      'author.firstName',
    ],
  };

  // noinspection JSUnusedLocalSymbols
  private constructor() {
  }

  static search<T>(list: T[], fields: string[], term: string) {
    const fuse = new Fuse(list, { ...SearchDance.options, fields });
    let results = fuse.search(term) as FuseResultWithScore<DanceLink>[];
    return results.filter(fuseItem => fuseItem.score < SearchDance.SCORE_THRESHOLD).map(fuseItem => fuseItem.item);
  }

}
