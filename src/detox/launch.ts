import { device } from 'detox';

import { setDemoMode } from '../device/demo.js';
import { type DetoxMatcher, getElement } from './matcher.js';

interface LaunchProps {
  waitForMatcher?: DetoxMatcher;
}

/**
 * Launches the application and performs necessary initializations.
 *
 * This function initializes the application by launching it, setting
 * the demo mode, and reloading the React Native environment. If a
 * specific UI element needs to be awaited, it ensures the element with
 * the provided identifier is visible within a specified timeout period.
 *
 * @param {Object} options - Configuration options for the launch process.
 * @param {string} [options.waitForMatcher] - The identifier of the UI element
 *        to wait for visibility.
 * @returns Resolves when the application has finished launching and the
 *          optional wait condition has been satisfied.
 */
export const launch = async ({ waitForMatcher }: LaunchProps) => {
  await device.launchApp();
  await setDemoMode();
  await device.reloadReactNative();

  if (waitForMatcher) {
    await waitFor(getElement(waitForMatcher)).toBeVisible().withTimeout(5000);
  }
};
