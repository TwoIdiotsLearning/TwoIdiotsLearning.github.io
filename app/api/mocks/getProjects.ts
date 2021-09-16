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
				path: ".til/project.json"
			},
			{
				path: ".til/tutorial/tutorial.json"
			}
		]
	});
}
fetchMock.get("https://api.github.com/repos/TwoIdiotsLearning/non-project-repo/git/trees/main?recursive=1", {
	tree: []
});

fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project1/.til/project.json", {
	enabled: true,
	name: "Project 1",
	shortDescription: "this is an <i>awesome</i> project",
	fullDescription: "Some more words about this really nice project"
});
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project2/.til/project.json", {
	enabled: true,
	name: "Project 2",
	shortDescription: "this is a <u>really</u> nice project",
	fullDescription: "Some more words about this really nice project, and this text also has html in it <ul><li>like this</li><li>and this</li><li>and obviously this</li></ul>"
});
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project3/.til/project.json", {
	enabled: false,
	name: "Project 3",
});
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project4/.til/project.json", {
	enabled: true,
});
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/non-project-repo/.til/project.json", 404);