import { BlogPostContent } from "./types";

export async function getBlogPostContent(_blogPostId: string): Promise<BlogPostContent> {
	return {
		id: "",
		date: Date.now(),
		title: "",
		content: "",
	};
}