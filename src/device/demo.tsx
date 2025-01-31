import { execSync } from 'child_process';

/**
 * Asynchronously sets the device into demo mode.
 *
 * - For iOS devices, it overrides the status bar settings (e.g., time, battery, Wi-Fi, and cellular signal parameters) on the simulator.
 * - For Android devices, it enables the system UI demo mode and adjusts several device parameters including time, battery, network connectivity, and notification visibility.
 *
 * This function is useful for ensuring consistent device appearance during tests.
 */
export const setDemoMode = async () => {
  if (device.getPlatform() === 'ios') {
    // TODO iPhone 13? Pick whatever simulator is running or let the user decide

    execSync(
      'xcrun simctl status_bar "iPhone 13" override --time "12:00" --batteryState charged --batteryLevel 100 --wifiBars 3 --cellularMode active --cellularBars 4'
    );
  } else {
    // enter demo mode
    execSync('adb shell settings put global sysui_demo_allowed 1');
    // display time 12:00
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200'
    );
    // Display full mobile data with 4g type and no wifi
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command network -e mobile show -e level 4 -e datatype 4g -e wifi false'
    );
    // Hide notifications
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false'
    );
    // Show full battery but not in charging state
    execSync(
      'adb shell am broadcast -a com.android.systemui.demo -e command battery -e plugged false -e level 100'
    );
  }
};
