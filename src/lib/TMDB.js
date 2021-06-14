const fetch = require('isomorphic-unfetch');
const querystring = require('querystring');

class TMDB {
	constructor(config) {
		this.api_key = config.api_key;
		this.basePath = 'https://api.themoviedb.org/3';
	}

	request(endpoint, options) {
		let url = `${this.basePath}${endpoint}&api_key=${this.api_key}`;

		let headers = {
			'Content-type': 'application/json',
		};

		let config = {
			...options,
			...headers,
		};

		return fetch(url, config)
			.then((res) => {
				if (res.status === 200) return res.json();
			})
			.catch((err) => console.error(err));
	}

	/** Search for TV shows */
	search(options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = '/search/tv' + query;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return a list of genres */
	getGenres(options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/genre/tv/list${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return all information about a TV show */
	getSerie(id, options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/tv/${id}${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return network information by id */
	getNetwork(id, options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/network/${id}${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Discover by genre, last air episode and more */
	discover(options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/discover/tv${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return trending series for the last 24h
	 *
	 * @param time 'day' or 'week'
	 */
	trending(time, options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/trending/tv/${time}${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return popular series for the last 24h */
	popular(options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/tv/popular/${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return top rated series for the last 24h */
	topRated(options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/tv/top_rated/${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return airing today series */
	airingToday(options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/tv/airing_today/${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return cast information of serie by id */
	getCast(id, options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/tv/${id}/aggregate_credits${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}

	/** Return recomendations based on serie by id */
	getRecomendations(id, options) {
		let query = options ? `?${querystring.stringify(options)}` : '';

		let url = `/tv/${id}/recommendations${query}`;
		let config = {
			method: 'GET',
		};

		return this.request(url, config);
	}
}

module.exports = TMDB;
