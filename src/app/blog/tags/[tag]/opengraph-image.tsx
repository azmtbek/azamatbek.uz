import { ImageResponse } from "next/og";
import { OgImage, ogContentType, ogSize } from "@/lib/og";

interface Props {
	params: Promise<{ tag: string }>;
}

export const alt = "Tagged posts — Azamatbek";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: Props) {
	const { tag } = await params;
	return new ImageResponse(
		<OgImage title={`#${tag}`} subtitle="azamatbek.uz" />,
		size,
	);
}
