import fetchMock from "fetch-mock";

fetchMock.get("https://api.github.com/orgs/TwoIdiotsLearning/repos", [
	{
		name: "project1",
		default_branch: "main",
	},
	{
		name: "project2",
		default_branch: "main",
	},
	{
		name: "project3",
		default_branch: "main",
	},
	{
		name: "project4",
		default_branch: "main",
	},
	{
		name: "non-project-repo",
		default_branch: "main",
	}
]);


for (let i = 1; i <= 4; i++) {
	fetchMock.get(`https://api.github.com/repos/TwoIdiotsLearning/project${i}/git/trees/main?recursive=1`, {
		tree: [
			{
				path: "tilproject.json"
			}
		]
	});
}
fetchMock.get("https://api.github.com/repos/TwoIdiotsLearning/non-project-repo/git/trees/main?recursive=1", {
	tree: []
});

fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project1/tilproject.json", {
	enabled: true,
	name: "Project 1",
});
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project2/tilproject.json", {
	enabled: true,
	name: "Project 2",
	description: "this is a <u>really</u> nice project"
});
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project3/tilproject.json", {
	enabled: false,
	name: "Project 3",
});
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project4/tilproject.json", {
	enabled: true,
});
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/non-project-repo/tilproject.json", 404);