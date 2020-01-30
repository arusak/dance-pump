import { Dance, DanceLink, Provider } from './provider';

export class HdaProvider implements Provider {
  public async find(term: string): Promise<DanceLink[]> {
    return [];
  }

  public async getDance(link: DanceLink): Promise<Dance> {
    return {title:'',instruction:'',meta:''};
  }

  public async  getLinks(): Promise<DanceLink[]> {
    return [];
  }

}
