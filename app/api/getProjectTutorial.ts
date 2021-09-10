import { ProjectTutorial, TutorialDifficulty } from "./types";

export async function getProjectTutorial(_projectId: string): Promise<ProjectTutorial> {
	return {
		chapters: [],
		difficulty: TutorialDifficulty.Easy,
		estimatedHoursToComplete: 10,
	};
}