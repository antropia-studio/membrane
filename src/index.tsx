import { PagerSwipe, Tap } from './commands/index.js';
import { launch } from './detox/launch';

export { type PagerSwipeProps, type TapProps } from './commands/index.js';
export { type LaunchProps } from './detox/launch.js';

export const Membrane = {
  commands: { PagerSwipe, Tap },
  launch,
};

export default Membrane;
