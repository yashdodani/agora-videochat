"use client";

import {
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";
import { redirect } from "next/navigation";
import { useState } from "react";

function Videos({
    channelName,
    appId,
}: {
    channelName: string;
    appId: string;
}) {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);

    const { isLoading: isLoadingMic, localMicrophoneTrack } =
        useLocalMicrophoneTrack(micOn);
    const { isLoading: isLoadingCam, localCameraTrack } =
        useLocalCameraTrack(cameraOn);

    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack, localCameraTrack]);

    useJoin({
        appid: appId,
        channel: channelName,
        token: null, // why?
    });

    audioTracks.map((track) => track.play());

    const deviceLoading = isLoadingCam || isLoadingMic;

    if (deviceLoading) {
        return (
            <div className="flex flex-col items-center pt-40">
                Loading devices...
            </div>
        );
    }

    const unit = "minmax(0, 1fr) ";

    return (
        <>
            <div className="flex flex-col justify-between w-full h-screen p-1">
                <div
                    // className="w-100 h-100"
                    className={`grid  gap-1 flex-1`}
                    // style={{
                    //     gridTemplateColumns:
                    //         remoteUsers.length > 9
                    //             ? unit.repeat(4)
                    //             : remoteUsers.length > 4
                    //             ? unit.repeat(3)
                    //             : remoteUsers.length > 1
                    //             ? unit.repeat(2)
                    //             : unit,
                    // }}
                >
                    {/* render the local user */}
                    <LocalUser
                        videoTrack={localCameraTrack}
                        audioTrack={localMicrophoneTrack}
                        micOn={micOn}
                        cameraOn={cameraOn}
                        playAudio={micOn}
                        playVideo={cameraOn}
                        className="w-full h-full"
                    >
                        <samp>You</samp>
                    </LocalUser>

                    {/* render other users who join the vc */}
                    {remoteUsers.map((user) => (
                        <div key={user.uid}>
                            <RemoteUser>
                                <samp>{user.uid}</samp>
                            </RemoteUser>
                        </div>
                    ))}

                    {/* buttons for mic off/on and camera off/on */}
                    <div className="bottom-0">
                        <button
                            onClick={() => setMicOn((a) => !a)}
                            className=" p-2 border-2 border-slate-700 cursor-pointer"
                        >
                            {micOn ? "Turn Mic Off" : "Turn Mic On"}
                        </button>
                        <button
                            onClick={() => setCameraOn((a) => !a)}
                            className=" p-2 border-2 border-slate-700 cursor-pointer"
                        >
                            {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Videos;
