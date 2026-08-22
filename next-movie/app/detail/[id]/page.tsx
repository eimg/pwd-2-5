import type { MovieType, PersonType } from "@/types/global";

async function fetchMovie(id: string): Promise<MovieType> {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	return await res.json();
}

async function fetchCast(id: string): Promise<PersonType[]> {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
			},
		},
	);

	const data = await res.json();
	return data.cast;
}

const backdrop = "http://image.tmdb.org/t/p/w1280";
const profile = "http://image.tmdb.org/t/p/w185";

export default async function MovieDetail({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const movie = await fetchMovie(id);
	const cast = await fetchCast(id);

	return (
		<div>
			<h2 className="py-2 border-b mb-4 text-lg font-bold">
				{movie.title} ({movie.release_date.split("-")[0]})
			</h2>
			<img
				className="w-full"
				src={backdrop + movie.backdrop_path}
				alt=""
			/>
			<p className="my-4">{movie.overview}</p>

			<h2 className="py-2 border-b mb-4 text-lg mt-8">Cast</h2>

			<div className="flex flex-wrap gap-2">
				{cast?.map(person => {
					return (
						<div className="w-46 mb-4">
							{person.profile_path ? (
								<img
									src={profile + person.profile_path}
									alt=""
								/>
							) : (
								<div className="h-69 bg-gray-200"></div>
							)}
							<b>{person.name}</b>
							<div className="text-gray-600">
								{person.character}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
