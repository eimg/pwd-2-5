import { MovieType } from "@/types/global";

import MovieCard from "@/components/movie-card";

async function fetchGenre(id: string): Promise<MovieType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${id}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		},
	);

	const data = await res.json();
	return data.results;
}

export default async function Genre({
	params,
}: {
	params: Promise<{ name: string; id: string }>;
}) {
	const { id, name } = await params;

	const movies = await fetchGenre(id);

	return (
		<div>
			<h2 className="py-2 border-b mb-4 text-lg">{name}</h2>
			<div className="flex gap-2 flex-wrap">
				{movies?.map(movie => {
					return (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					);
				})}
			</div>
		</div>
	);
}
