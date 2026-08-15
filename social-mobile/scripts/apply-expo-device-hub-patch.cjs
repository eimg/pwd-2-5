const fs = require('node:fs');
const path = require('node:path');

const projectRoot = path.resolve(__dirname, '..');
const expoPackageRoot = path.join(projectRoot, 'node_modules', 'expo');

let cliPackageJsonPath;
try {
  cliPackageJsonPath = require.resolve('@expo/cli/package.json', {
    paths: [expoPackageRoot],
  });
} catch {
  console.error('Expo CLI is not installed. Run `npm install` before starting the project.');
  process.exit(1);
}

const cliPackage = require(cliPackageJsonPath);
const cliRoot = path.dirname(cliPackageJsonPath);

if (!cliPackage.version.startsWith('54.')) {
  console.error(
    `The Device Hub compatibility patch targets Expo CLI 54, but found ${cliPackage.version}. ` +
      'Review or remove scripts/apply-expo-device-hub-patch.cjs before continuing.'
  );
  process.exit(1);
}

function patchFile(relativePath, marker, replacements) {
  const filePath = path.join(cliRoot, relativePath);
  const original = fs.readFileSync(filePath, 'utf8');

  if (original.includes(marker)) {
    return false;
  }

  let patched = original;
  for (const [before, after] of replacements) {
    if (!patched.includes(before)) {
      throw new Error(
        `Expo CLI ${cliPackage.version} changed unexpectedly; could not patch ${relativePath}.`
      );
    }
    patched = patched.replace(before, after);
  }

  fs.writeFileSync(filePath, patched);
  return true;
}

try {
  const changed = [
    patchFile(
      'build/src/start/doctor/apple/SimulatorAppPrerequisite.js',
      "result !== 'com.apple.dt.Devices'",
      [
        [
          `async function getSimulatorAppIdViaAppleScriptAsync() {
    try {
        return (await (0, _osascript().execAsync)('id of app "Simulator"')).trim();
    } catch  {
    // This error may occur in CI where the user intends to install just the simulators but no
    // Xcode, or when Simulator.app is not registered in LaunchServices (e.g. Xcode on an
    // external or renamed volume).
    }
    return null;
}`,
          `async function getSimulatorAppIdViaAppleScriptAsync() {
    for (const appName of [
        'Simulator',
        'DeviceHub'
    ]){
        try {
            return (await (0, _osascript().execAsync)(\`id of app "\${appName}"\`)).trim();
        } catch  {
        // Try the next Xcode device application name.
        }
    }
    return null;
}`,
        ],
        [
          `const simulatorInfoPlist = _path().default.join(developerDir.trim(), 'Applications', 'Simulator.app', 'Contents', 'Info.plist');
        const { stdout: bundleId } = await (0, _spawnasync().default)('defaults', [
            'read',
            simulatorInfoPlist,
            'CFBundleIdentifier'
        ]);
        return bundleId.trim() || null;`,
          `const appInfoPlists = [
            _path().default.join(developerDir.trim(), 'Applications', 'Simulator.app', 'Contents', 'Info.plist'),
            _path().default.join(developerDir.trim(), '..', 'Applications', 'DeviceHub.app', 'Contents', 'Info.plist')
        ];
        for (const appInfoPlist of appInfoPlists){
            try {
                const { stdout: bundleId } = await (0, _spawnasync().default)('defaults', [
                    'read',
                    appInfoPlist,
                    'CFBundleIdentifier'
                ]);
                if (bundleId.trim()) return bundleId.trim();
            } catch  {
            // Try the next Xcode layout.
            }
        }
        return null;`,
        ],
        [
          `throw new _Prerequisite.PrerequisiteCommandError('SIMULATOR_APP', "Can't determine id of Simulator app; the Simulator is most likely not installed on this machine. Run \`sudo xcode-select -s /Applications/Xcode.app\`");`,
          `throw new _Prerequisite.PrerequisiteCommandError('SIMULATOR_APP', "Can't determine id of Device Hub or Simulator app; verify that Xcode is selected with xcode-select.");`,
        ],
        [
          `if (result !== 'com.apple.iphonesimulator' && result !== 'com.apple.CoreSimulator.SimulatorTrampoline') {`,
          `if (result !== 'com.apple.dt.Devices' && result !== 'com.apple.iphonesimulator' && result !== 'com.apple.CoreSimulator.SimulatorTrampoline') {`,
        ],
      ]
    ),
    patchFile(
      'build/src/start/platforms/ios/ensureSimulatorAppRunning.js',
      'devices://device/open?id=',
      [
        [
          `'tell app "System Events" to count processes whose name is "Simulator"'`,
          `'tell app "System Events" to count processes whose name is "Simulator" or name is "DeviceHub"'`,
        ],
        [
          `async function openSimulatorAppAsync(device) {
    const args = [
        '-a',
        'Simulator'
    ];
    if (device.udid) {
        // This has no effect if the app is already running.
        args.push('--args', '-CurrentDeviceUDID', device.udid);
    }
    await (0, _spawnasync().default)('open', args);
}`,
          `async function openSimulatorAppAsync(device) {
    try {
        const args = [
            '-a',
            'Simulator'
        ];
        if (device.udid) {
            args.push('--args', '-CurrentDeviceUDID', device.udid);
        }
        await (0, _spawnasync().default)('open', args);
    } catch  {
        const deviceHubArgs = device.udid ? [
            \`devices://device/open?id=\${device.udid}\`
        ] : [
            '-a',
            'DeviceHub'
        ];
        await (0, _spawnasync().default)('open', deviceHubArgs);
    }
}`,
        ],
      ]
    ),
    patchFile(
      'build/src/start/platforms/ios/AppleDeviceManager.js',
      'application "DeviceHub" is running',
      [
        [
          'await _osascript().execAsync(`tell application "Simulator" to activate`);',
          `await _osascript().execAsync(\`if application "Simulator" is running then
tell application "Simulator" to activate
else if application "DeviceHub" is running then
tell application "DeviceHub" to activate
end if\`);`,
        ],
      ]
    ),
  ].some(Boolean);

  if (changed) {
    console.log(`Applied Xcode Device Hub support to Expo CLI ${cliPackage.version}.`);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
