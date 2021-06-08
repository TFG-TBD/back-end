const { gql } = require('apollo-server');

const serieType = gql`
	type SerieSearch {
		id: Int
		backdrop_path: String
		first_air_date: String
		genre_ids: [Int]
		genres: [Genre]
		name: String
		origin_country: [String]
		original_language: String
		original_name: String
		overview: String
		popularity: Float
		poster_path: String
		vote_average: Float
		vote_count: Int
	}

	type Serie {
		id: Int
		backdrop_path: String
		first_air_date: String
		genre_ids: [Int]
		name: String
		origin_country: [String]
		original_language: String
		original_name: String
		overview: String
		popularity: Float
		poster_path: String
		vote_average: Float
		vote_count: Int
		created_by: [CreatedBy]
		episode_run_time: [Int]
		genres: [Genre]
		homepage: String
		in_production: Boolean
		languages: [String]
		last_air_date: String
		networks: [Network]
		number_of_episodes: Int
		number_of_seasons: Int
		production_companies: [ProductionCompany]
		production_countries: [ProductionCountry]
		seasons: [Season]
		spoken_languages: [SpokenLanguage]
		status: String
		tagline: String
		type: String
		lists: [List]
	}

	type CreatedBy {
		id: Int
		credit_id: String
		name: String
		profile_path: String
	}

	type Genre {
		id: Int
		name: String
	}

	type Network {
		id: Int
		name: String
		logo_path: String
		origin_country: String
	}

	type ProductionCompany {
		id: Int
		logo_path: String
		name: String
		origin_country: String
	}

	type ProductionCountry {
		iso_3166_1: String
		name: String
	}

	type Season {
		air_date: String
		episode_count: Int
		id: Int
		name: String
		overview: String
		poster_path: String
		season_number: Int
	}

	type SpokenLanguage {
		english_name: String
		iso_639_1: String
		name: String
	}

	type Person {
		adult: Boolean
		gender: Int
		id: String
		known_for_department: String
		name: String
		original_name: String
		popularity: Float
		profile_path: String
		character: String
		credit_id: String
		order: Int
	}
`;

module.exports = {
	serieType,
};
