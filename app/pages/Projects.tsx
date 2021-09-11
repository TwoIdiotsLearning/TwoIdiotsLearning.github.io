import React, { useEffect, useState } from "react";
import { getProjects, ProjectDescriptor } from "../api";

export const Projects = (): JSX.Element => {
	const [projects, setProjects] = useState<ProjectDescriptor[]>([]);
	useEffect(() => {
		getProjects().then(setProjects);
	}, []);
	return (
		<div>
			{
				projects.map(({ id, name, description }) => (
					<div key={id}>
						<h2>{name}</h2>
						{description && <h5 dangerouslySetInnerHTML={{ __html: description }} />}
					</div>
				))
			}
		</div>
	);
}