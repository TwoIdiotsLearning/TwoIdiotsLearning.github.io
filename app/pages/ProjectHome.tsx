import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, Link } from "react-router-dom";
import { getProject, ProjectDescriptor } from "../api";

export const ProjectHome = (): JSX.Element => {
	const match = useRouteMatch();
	const { projectId } = useParams();
	const [project, setProject] = useState<ProjectDescriptor | null>(null);

	useEffect(() => {
		getProject(projectId).then(setProject)
	}, [])

	return project ? (
		<>
			<h1>{project.name}</h1>
			<h2 dangerouslySetInnerHTML={{ __html: project.shortDescription }} />
			<h5 dangerouslySetInnerHTML={{ __html: project.fullDescription }} />
			<Link to={`${match.url}/tutorial`}>Tutorial</Link>
		</>
	) : <div>Loading...</div>;
}