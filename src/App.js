import React, { useEffect, useState } from 'react';
import init, { create_device, Device } from './pkg/refresh_device';

function App() {
    const [device, setDevice] = useState(null);
    const [firmwareVersion, setFirmwareVersion] = useState('');
    const [serialNumber, setSerialNumber] = useState('');

    useEffect(() => {
        const run = async () => {
            await init();
            const deviceInstance = create_device('12345', '1.0.0');
            setDevice(deviceInstance);
            setFirmwareVersion(deviceInstance.get_firmware_version());
            setSerialNumber(deviceInstance.get_serial_number());
        };
        run();
    }, []);

    const incrementVersion = (version) => {
        const parts = version.split('.');
        let major = parseInt(parts[0], 10);
        let minor = parseInt(parts[1], 10);
        let patch = parseInt(parts[2], 10);

        patch += 1;
        if (patch >= 10) {
            patch = 0;
            minor += 1;
            if (minor >= 10) {
                minor = 0;
                major += 1;
            }
        }

        return `${major}.${minor}.${patch}`;
    };

    const updateFirmware = () => {
        if (device) {
            const newVersion = incrementVersion(firmwareVersion);
            device.update_firmware(newVersion);
            setFirmwareVersion(device.get_firmware_version());
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <p>Serial Number: {serialNumber}</p>
                <p>Firmware Version: {firmwareVersion}</p>
                <button onClick={updateFirmware}>Update Firmware</button>
            </header>
        </div>
    );
}

export default App;
