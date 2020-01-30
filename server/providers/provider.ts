export interface Provider {
  getLinks(): Promise<DanceLink[]>;

  getDance(link: DanceLink): Promise<Dance>;

  find(term: string): Promise<DanceLink[]>
}

export interface DanceLink {
  href: string;
  title: string;
}

export interface Dance {
  title: string;
  instruction: string;
  meta: string;
}
