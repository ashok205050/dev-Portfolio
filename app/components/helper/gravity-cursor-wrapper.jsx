"use client";

import dynamic from "next/dynamic";

const GravityCursor = dynamic(() => import("./gravity-cursor"), { ssr: false });

export default function GravityCursorWrapper() {
    return <GravityCursor />;
}
