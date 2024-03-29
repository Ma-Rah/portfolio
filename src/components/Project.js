import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";

export default function Project() {
	const [projectData, setProjectData] = useState(null);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "project"]{
			title,
			date,
			place,
			description,
			projectType,
			link,
			tags
		}`
			)
			.then((data) => setProjectData(data))
			.catch(console.error);
	}, []);

	return (
		<main className="bg-gray-100 min-h-screen p-12">
			<section className="container mx-auto">
				<h1 className="text-3xl md:text-5xl flex justify-center cursive mb-12">My Projects</h1>

				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projectData &&
						projectData.map((project, index) => (
							<article className="relative rounded-lg shadow-xl bg-white p-16">
								<h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-red-700">
									<a
										href={project.link}
										alt={project.title}
										target="_blank"
										rel="noopener noreferrer"
									>
										{project.title}
									</a>
								</h3>
								<div className="text-gray-500 text-lg ">
									<div>
										<strong className="font-bold">Finished on</strong>:{" "}
										{new Date(project.date).toLocaleDateString()}
									</div>

									<div>
										<strong className="font-bold">Type</strong>: {project.projectType}
									</div>
									<p className="my-6 text-lg text-gray-700 leading-relaxed">
										{project.description}
									</p>

									<strong className="font-bold">Tags:</strong>
									<div className="text-sm text-gray-700 grid grid-cols-1">
										{project.tags.map((tag) => {
											return <p>{tag}</p>;
										})}
									</div>

									<a
										href={project.link}
										rel="noopener noreferrer"
										target="_blank"
										className="text-red-500 font-bold hover:underline hover:text-red-400"
									>
										View The Project{" "}
										<span role="img" aria-label="right pointer">
											👉
										</span>
									</a>
								</div>
							</article>
						))}
				</section>
			</section>
		</main>
	);
}
