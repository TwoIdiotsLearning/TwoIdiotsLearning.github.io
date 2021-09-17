import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, getProjectTutorial, ProjectDescriptor, ProjectTutorial as ProjectTutorialInterface } from "../api";
import { Link, useLocation } from "react-router-dom"

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export const ProjectTutorial = (): JSX.Element => {
	const query = useQuery();
	const highlightedStepIndex = Number(query.get("step") ?? "-1");
	const { projectId, chapter = 0 } = useParams();
	const [project, setProject] = useState<ProjectDescriptor | null>(null);
	const [tutorial, setTutorial] = useState<ProjectTutorialInterface | null>(null);

	useEffect(() => {
		getProject(projectId).then(setProject);
		getProjectTutorial(projectId).then(setTutorial);
	}, []);

	const currentChapter = tutorial?.chapters[chapter];

	return (project && tutorial) ? (
		<>
			<h1>{project.name} - Tutorial</h1>
			<div style={{ display: "flex" }}>
				<div>
					<ul>
						{
							tutorial.chapters.map(({ title, steps }, idx) => (
								<li>
									<Link to={`${idx}`}><h4>{title}</h4></Link>
									<ul>
										{
											steps.map(({ title }, stepIdx) => (
												<Link key={title} to={`${idx}?step=${stepIdx}`}>
													<li>{title}</li>
												</Link>
											))
										}
									</ul>
								</li>
							))
						}
					</ul>
				</div>
				{currentChapter && <div>
					<h4>{currentChapter.title}</h4>
					<h5>{currentChapter.description}</h5>
					<ul>
						{
							currentChapter.steps.map(({ instructions, title }, stepIdx) => (
								<li>
									<h5 style={{textDecoration: highlightedStepIndex == stepIdx ?"underline": undefined}}>{title}</h5>
									<ul>
										{
											instructions.map((instruction) => (
												<li>
													{"string" === typeof instruction ? instruction : instruction.content}
												</li>
											))
										}
									</ul>
								</li>
							))
						}
					</ul>
				</div>}
			</div>
		</>
	) : <div>Loading...</div>;
}