import { MirrorlandProvider } from '../mirrorland.provider';
import { Provider } from '../provider';

describe('MirrorlandProvider', () => {
  let provider: Provider;

  beforeEach(() => {
    provider = new MirrorlandProvider();
  });

  it('should get dances list', async () => {
    const list = await provider.getLinks();
    // console.log(list);
    expect(Array.isArray(list)).toBe(true);
  });

  it('should find polonaise', async () => {
    const results = await provider.find('Полонез');
    console.log(results);
    expect(results.length).toBeGreaterThan(0);
  });

  it('should get a dance', async () => {
    const list = await provider.getLinks();
    const result = await provider.getDance(list[0]);
    console.log(result);
    expect(typeof result.title).toBe('string');
  });
});
