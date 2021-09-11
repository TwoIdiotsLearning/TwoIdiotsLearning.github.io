import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, ProjectDescriptor } from "../api";

export const ProjectTutorial = (): JSX.Element => {
	const { projectId, chapter = 0 } = useParams();
	const [project, setProject] = useState<ProjectDescriptor | null>(null);

	useEffect(() => {
		getProject(projectId).then(setProject)
	}, [])

	return project ? (
		<>
			<h1>{project.name} - Tutorial</h1>
			<h2>Chapter: {chapter}</h2>
		</>
	) : <div>Loading...</div>;
}