import { Warp } from "@paper-design/shaders-react";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black font-sans">
            <Warp
                width={1280}
                height={720}
                colors={[
                    "#000000",
                    "#0a0a1a",
                    "#000014",
                    "#7a0047",
                    "#00001f",
                    "#000152",
                    "#7a0047",
                    "#000014",
                    "#ff1492",
                    "#000000",
                ]}
                proportion={0.5}
                softness={1}
                distortion={0.19}
                swirl={0.59}
                swirlIterations={20}
                shape="checks"
                shapeScale={1}
                speed={1.6}
                scale={1.45}
                rotation={152}
            />
        </div>
    );
}
