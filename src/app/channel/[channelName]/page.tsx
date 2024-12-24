import Call from "@/components/Call";

type Params = Promise<{ channelName: string }>;

async function ChannelPage({ params }: { params: Params }) {
    const { channelName } = await params;

    return (
        <>
            <main className="flex w-full flex-col">
                <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
                    {channelName}
                </p>
                <Call
                    appId={process.env.PUBLIC_AGORA_APP_ID!}
                    channelName={channelName}
                ></Call>
            </main>
        </>
    );
}

export default ChannelPage;
