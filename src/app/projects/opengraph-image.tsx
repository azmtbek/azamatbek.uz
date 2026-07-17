import { ImageResponse } from "next/og";
import { OgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Projects — Azamatbek";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
	return new ImageResponse(
		<OgImage title="Projects" subtitle="Things I've built." />,
		size,
	);
}
