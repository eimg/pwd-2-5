import MovieCard from "@/components/movie-card";
import { MovieType } from "@/types/global";

async function fetchPopular(): Promise<MovieType[]> {
	const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	const data = await res.json();
	return data.results;
}

async function fetchUpcoming(): Promise<MovieType[]> {
	const res = await fetch("https://api.themoviedb.org/3/movie/upcoming", {
		headers: {
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	});

	const data = await res.json();
	return data.results;
}

export default async function Home() {
	const popular = await fetchPopular();
	const upcoming = await fetchUpcoming();

	return (
		<div>
			<h2 className="py-2 border-b mb-4 text-lg">Popular</h2>
			<div className="flex gap-2 flex-wrap">
				{popular?.map(movie => {
					return (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					);
				})}
			</div>

			<h2 className="mt-8 py-2 border-b mb-4 text-lg">Upcoming</h2>
			<div className="flex gap-2 flex-wrap">
				{upcoming?.map(movie => {
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
