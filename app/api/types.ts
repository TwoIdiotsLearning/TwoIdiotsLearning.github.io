export interface ProjectDescriptor {
	id: string;
	name: string;
	description?: string;
}

export enum TutorialDifficulty {
	Easy = "easy",
	Medium = "medium",
	Hard = "hard",
}

export type TutorialStepImageURL = string;
export type TutorialStepInstructionContent = string;

export type TutorialStepImage = {
	url: TutorialStepImageURL;
	caption?: string;
} | TutorialStepImageURL;

export type TutorialStepInstruction = {
	content: TutorialStepInstructionContent;
	icon?: string; // MUI Built-in icon
	textColor?: string;
} | TutorialStepInstructionContent;

export interface TutorialStep {
	gallery?: TutorialStepImage[]; // image urls
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