"use client";

import dynamic from "next/dynamic";

import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react";
const Videos = dynamic(() => import("./Videos"), { ssr: false });

function Call({ channelName, appId }: { channelName: string; appId: string }) {
    const client = useRTCClient(
        AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
    );

    // for screen sharing and naming, use channel functionality (realized) at 3 hours!!

    return (
        <>
            <AgoraRTCProvider client={client}>
                <Videos channelName={channelName} appId={appId} />
                <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                    <a
                        className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
                        href="/"
                    >
                        End Call
                    </a>
                </div>
            </AgoraRTCProvider>
        </>
    );
}

export default Call;
