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

    const updateFirmware = () => {
        if (device) {
            device.update_firmware('2.0.0');
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
