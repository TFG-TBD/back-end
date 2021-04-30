const populateGenre = (data, genres) => {
	data.results.forEach((serie) => {
		serie.genres = [];
		serie.genre_ids.forEach((gen) => {
			const genre = genres.find((g) => g.id === gen);
			if (genre) serie.genres.push(genres.find((g) => g.id === gen));
		});
	});
};

module.exports = {
	populateGenre,
};
