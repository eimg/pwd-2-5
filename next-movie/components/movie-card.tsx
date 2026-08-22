import { MovieType } from "@/types/global";
import Link from "next/link";

const poster = "http://image.tmdb.org/t/p/w185";

export default async function MovieCard({ movie }: { movie: MovieType }) {
	return (
		<div className="w-45 text-center mb-3 hover:scale-105 transition-all">
			<Link href={`/detail/${movie.id}`}>
				<img
					src={poster + movie.poster_path}
					alt=""
				/>
			</Link>
			<b>{movie.title}</b>
			<div>{movie.release_date.split("-")[0]}</div>
		</div>
	);
}
