export type GalleryItemURL = string;
export enum GalleryItemType {
	Image = "image",
	Video = "video",
}
export interface GalleryItem {
	url: GalleryItemURL;
	type: GalleryItemType,
	caption?: string;
}

export enum TutorialDifficulty {
	Easy = "easy",
	Medium = "medium",
	Hard = "hard",
}

export type TutorialStepInstructionContent = string;
export interface ProjectDescriptor {
	id: string;
	name: string;
	shortDescription: string;
	fullDescription: string;
	gallery?: GalleryItem[];
}

export type TutorialStepInstruction = {
	content: TutorialStepInstructionContent;
	icon?: string; // MUI Built-in icon
	textColor?: string;
} | TutorialStepInstructionContent;

export interface TutorialStep {
	title: string;
	gallery?: GalleryItem[];
	instructions: TutorialStepInstruction[]
}

export interface TutorialChapter {
	title: string;
	description: string;
	steps: TutorialStep[];
}

export interface ProjectTutorial {
	estimatedHoursToComplete: number;
	difficulty: TutorialDifficulty
	chapters: TutorialChapter[];
}

export interface BlogPostDescriptor {
	id: string;
	date: number;
	title: string;
}

export interface BlogPostContent extends BlogPostDescriptor {
	content: string;
}