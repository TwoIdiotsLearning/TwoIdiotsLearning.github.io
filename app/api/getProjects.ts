import { ProjectDescriptor } from "./types";
import mainDebug from "../debug";
import { ghRequest, ghJsonContent } from "./githubRequest";

const debug = mainDebug.extend("api:getProjects");

interface GithubRepoDescriptor {
	name: string;
	default_branch: string;
}

interface GithubTreeDescriptor {
	tree: Array<{
		path: string;
	}>;
}

type TILProjectJson = Omit<ProjectDescriptor, "id"> & {
	enabled: boolean;
}

let projectsCache: Promise<ProjectDescriptor[]> | null = null; //in-me,pry cache

const validateTILProjectJson = (json: TILProjectJson): boolean => {
	if (!json.name) {
		return false;
	}
	// more validations to come
	return true;
}

export function getProjects(): Promise<ProjectDescriptor[]> {
	if (projectsCache) {
		return projectsCache;
	}
	projectsCache = (async () => {
		const tilRepos = await ghRequest("orgs/TwoIdiotsLearning/repos") as GithubRepoDescriptor[];
		debug(`Found ${tilRepos.length} TIL repositories. Checking which are project repos...`);
		const projectReposPromises = tilRepos.map(repo => {
			return (async () => {
				const { tree } = await ghRequest(`repos/TwoIdiotsLearning/${repo.name}/git/trees/${repo.default_branch}?recursive=1`) as GithubTreeDescriptor;
				if (!tree.find(({ path }) => ".til/project.json" === path)) {
					debug(`Repo ${repo.name} has no .til/project.json. Filtering out`);
					return null;
				}
				const projectJson = await ghJsonContent(`${repo.name}/.til/project.json`) as TILProjectJson;
				if (!projectJson.enabled) {
					debug(`Repo ${repo.name} is a project, but isn't enabled. Filtering out`);
					return null;
				}
				if (!validateTILProjectJson(projectJson)) {
					debug(`Repo ${repo.name} is an enabled project, but json isn't valid. Filtering out`);
					return null;
				}
				debug(`Found project ${projectJson.name} (repo: ${repo.name})`);
				return {
					repo,
					projectJson,
				};
			})();
		});
		return (await Promise.all(projectReposPromises))
			.filter(r => !!r)
			.map(({ repo: { name: id }, projectJson }): ProjectDescriptor => ({
				id,
				...projectJson,
			}));
	})();
	return projectsCache;
}

export async function getProject(id: string): Promise<ProjectDescriptor> {
	const projects = await getProjects();
	return projects.find(p => id === p.id);
}