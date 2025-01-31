import { PagerSwipe } from './commands/index.js';
import { launch } from './detox/launch';

export const Membrane = {
  commands: { PagerSwipe },
  launch,
};

export default Membrane;
