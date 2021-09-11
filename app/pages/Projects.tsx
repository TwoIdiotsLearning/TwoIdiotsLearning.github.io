import React, { useEffect, useState } from "react";
import { getProjects, ProjectDescriptor } from "../api";
import { Link } from "react-router-dom"

export const Projects = (): JSX.Element => {
	const [projects, setProjects] = useState<ProjectDescriptor[]>([]);
	useEffect(() => {
		getProjects().then(setProjects);
	}, []);
	return (
		<div>
			{
				projects.map(({ id, name, shortDescription }) => (
					<Link key={id} to={`/projects/${id}`}>
						<h2>{name}</h2>
						<h5 dangerouslySetInnerHTML={{ __html: shortDescription }} />
					</Link>
				))
			}
		</div>
	);
}