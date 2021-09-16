import fetchMock from "fetch-mock";

fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project1/.til/tutorial/tutorial.json", {
	estimatedHoursToComplete: 10,
	difficulty: "easy",
	chapters: [
		"intro.json",
		"prep.json",
		"mechanical.json",
		"electronics.json",
	],
});
["intro.json", "prep.json", "mechanical.json", "electronics.json"].forEach(chapter => {
	fetchMock.get(`https://raw.githubusercontent.com/TwoIdiotsLearning/project1/.til/tutorial/${chapter}`, {
		title: `Chapter Name ${chapter}`,
		description: `Chapter Description ${chapter}`,
		steps: [
			{
				gallery: [],
				instructions: [
					"Instruction 1",
					"Instruction 2",
					"Instruction 3",
					{
						content: "Instruction 4",
						icon: "error",
						color: "red",
					},
				]
			},
			{
				gallery: [],
				instructions: [
					"Instruction 5",
					"Instruction 6",
					{
						content: "Instruction 7",
						icon: "error",
						color: "red",
					},
					"Instruction 8",
				]
			}
		]
	});
})
fetchMock.get("https://raw.githubusercontent.com/TwoIdiotsLearning/project2/.til/tutorial/tutorial.json", {
	estimatedHoursToComplete: 20,
	difficulty: "hard",
	chapters: [
		"intro.json",
		"prep.json",
		"mechanical.json",
		"electronics.json",
		"programming.json"
	],
});
["intro.json", "prep.json", "mechanical.json", "electronics.json", "programming.json"].forEach(chapter => {
	fetchMock.get(`https://raw.githubusercontent.com/TwoIdiotsLearning/project2/.til/tutorial/${chapter}`, {
		title: `Chapter Name ${chapter}`,
		description: `Chapter Description ${chapter}`,
		steps: [
			{
				gallery: [],
				instructions: [
					"Instruction 1",
					"Instruction 2",
					"Instruction 3",
					{
						content: "Instruction 4",
						icon: "error",
						color: "red",
					},
				]
			},
			{
				gallery: [],
				instructions: [
					"Instruction 5",
					"Instruction 6",
					{
						content: "Instruction 7",
						icon: "error",
						color: "red",
					},
					"Instruction 8",
				]
			}
		]
	});
})