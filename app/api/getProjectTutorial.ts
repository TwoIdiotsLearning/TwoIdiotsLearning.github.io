import { getRepoTree, TutorialChapter } from ".";
import { ghJsonContent } from "./githubRequest";
import { ProjectTutorial } from "./types";
import mainDebug from "../debug";

const debug = mainDebug.extend("api:getProjectTutorial");

type TILTutorialJson = Omit<ProjectTutorial, "chapters"> & {
	chapters: string[];
};

export async function getProjectTutorial(projectId: string): Promise<ProjectTutorial> {
	const tree = await getRepoTree(projectId);
	if (!tree.find(({ path }) => ".til/tutorial/tutorial.json" === path)) {
		debug(`Repo ${projectId} has no .til/tutorial/tutorial.json`);
		return null;
	}
	const { chapters: chaptersIndex, ...tutorialSpec } = await ghJsonContent(`${projectId}/.til/tutorial/tutorial.json`) as TILTutorialJson;
	if (!chaptersIndex || 0 === chaptersIndex.length) {
		debug(`RepoChapters index for project ${projectId} is a empty`);
		return null;
	}
	let chapters: TutorialChapter[] = [];
	try {
		chapters = await Promise.all(chaptersIndex.map(chapterPath => ghJsonContent(`${projectId}/.til/tutorial/${chapterPath}`))) as TutorialChapter[];
	} catch (e) {
		debug(`Error while fetching tutorial chapters for ${projectId}`);
		return null;
	}
	return {
		...tutorialSpec,
		chapters,
	};
}