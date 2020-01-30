import { ProviderType } from '../types';
import { GoogleProvider } from './google.provider';
import { HdaProvider } from './hda.provider';
import { MirrorlandProvider } from './mirrorland.provider';
import { Provider } from './provider';

export function providerFactory(type: ProviderType): Provider {
  switch (type) {
    case 'mirrorland':
      return new MirrorlandProvider();
    case 'hda':
      return new HdaProvider();
    default:
      return new GoogleProvider();
  }
}
