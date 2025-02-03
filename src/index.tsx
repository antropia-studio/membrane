import { Swipe, Tap } from './commands/index.js';
import { launch } from './detox/launch';

export { type SwipeProps, type TapProps } from './commands/index.js';
export { type LaunchProps } from './detox/launch.js';

export const Membrane = {
  commands: { Swipe, Tap },
  launch,
};

export default Membrane;
