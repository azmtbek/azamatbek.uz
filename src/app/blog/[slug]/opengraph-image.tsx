import { ImageResponse } from "next/og";
import { OgImage, ogContentType, ogSize } from "@/lib/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

interface Props {
	params: Promise<{ slug: string }>;
}

export const alt = "Blog post — Azamatbek";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
	return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: Props) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);
	return new ImageResponse(
		<OgImage
			title={post?.title ?? "Post not found"}
			subtitle={post?.description}
		/>,
		size,
	);
}
