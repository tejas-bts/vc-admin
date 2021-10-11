import React, { useEffect } from "react";
import { LocalVideoStream, VideoStreamRenderer} from '@azure/communication-calling';

const createVideoRenderer = async (props) => {
    const deviceManager = props.deviceManager;
    const selectedCameraDeviceId = props.selectedCameraDeviceId;

    try {
        const cameras = await deviceManager.getCameras();
        const cameraDeviceInfo = cameras.find(cameraDevice => cameraDevice.id === selectedCameraDeviceId );
        const localVideoStream = new LocalVideoStream(cameraDeviceInfo);
        const renderer = new VideoStreamRenderer(localVideoStream);
        const view = await renderer.createView();
        const targetContainer = document.getElementById('localVideoRenderer');
        targetContainer.appendChild(view.target);
    } catch (error) {
        console.error(error);
    }
}

const LocalVideoPreviewCard = (props) => {

    useEffect(() => {
        createVideoRenderer();
    }, [])

    return (
        <div>
            <div style={{ marginBottom: "0.5em", padding: "0.5em" }}>
                <div id="localVideoRenderer"></div>
            </div>
        </div>
    );
}

export default LocalVideoPreviewCard;