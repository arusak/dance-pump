import { JSDOM } from 'jsdom';
import { SearchDance } from '../search/search-dance';
import { BaseProvider } from './base.provider';
import { Dance, DanceLink, Provider } from './provider';

const LIST_URL = 'http://mirrorland.rpg.ru/book_of_dances';

export class MirrorlandProvider extends BaseProvider implements Provider {
  private linksCache: DanceLink[] | undefined;

  public async getDance(link: DanceLink): Promise<Dance> {
    const doc = (await JSDOM.fromURL(link.href)).window.document;
    const contentEl = doc.querySelector('.storycontent') as HTMLElement;
    const metaEl = doc.querySelector('.meta_article .meta') as HTMLElement;
    const titleEl = doc.querySelector('.meta_article .storytitle') as HTMLElement;

    const instruction = contentEl ? contentEl.innerHTML : '';
    const meta = metaEl ? metaEl.innerHTML : '';
    const title = titleEl ? titleEl.innerHTML : link.title;

    return { instruction, meta, title };
  }

  public async getLinks(): Promise<DanceLink[]> {
    if (!this.linksCache) {
      const doc = (await JSDOM.fromURL(LIST_URL)).window.document;
      const linksNodes: NodeListOf<HTMLAnchorElement> = doc.querySelectorAll('.storycontent .dances-title-box a');
      const links = Array.from(linksNodes).map(link => ({ href: link.href, title: link.innerHTML }));
      this.linksCache = this.dedupe(links);
    }
    return this.linksCache;
  }

  public async find(term: string): Promise<DanceLink[]> {
    const links = await this.getLinks();
    return SearchDance.search(links, ['title'], term);
  }


}
