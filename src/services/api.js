import axios from 'axios';

// We'll use the TVMaze API which has Korean dramas
const API_BASE_URL = 'https://api.tvmaze.com';

// Get popular K-dramas (using search with "Korean" keyword)
export const getPopularKdramas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/shows?q=korean`);
    return response.data.map(item => item.show);
  } catch (error) {
    console.error('Error fetching popular K-dramas:', error);
    return [];
  }
};

// Get curated iconic K-dramas
export const getCuratedKdramas = async () => {
  const titles = [
    'Crash Landing on You',
    'The Heirs',
    'Legend of the Blue Sea',
    'True Beauty',
    'King the Land',
    'The Penthouse',
    'Descendants of the Sun',
    'Vincenzo',
    'Goblin',
    'Signal'
  ];

  try {
    const promises = titles.map(title =>
      axios.get(`${API_BASE_URL}/singlesearch/shows?q=${encodeURIComponent(title)}`)
    );
    const responses = await Promise.allSettled(promises);
    return responses
      .filter(res => res.status === 'fulfilled' && res.value.data)
      .map(res => res.value.data);
  } catch (error) {
    console.error('Error fetching curated K-dramas:', error);
    return [];
  }
};

// Search K-dramas by title
export const searchKdramas = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/shows?q=${query}%20korean`);
    return response.data.map(item => item.show);
  } catch (error) {
    console.error('Error searching K-dramas:', error);
    return [];
  }
};

// Get K-drama details by ID
export const getDramaDetails = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shows/${id}`);
    // Also fetch cast information
    const castResponse = await axios.get(`${API_BASE_URL}/shows/${id}/cast`);
    return {
      ...response.data,
      cast: castResponse.data
    };
  } catch (error) {
    console.error('Error fetching K-drama details:', error);
    return null;
  }
};

// Get K-dramas by genre
export const getKdramasByGenre = async (genre) => {
  try {
    // First get a list of Korean dramas
    const response = await axios.get(`${API_BASE_URL}/search/shows?q=korean`);
    // Then filter by genre
    const dramas = response.data
      .map(item => item.show)
      .filter(show =>
        show.genres &&
        show.genres.some(g => g.toLowerCase() === genre.toLowerCase())
      );
    return dramas;
  } catch (error) {
    console.error('Error fetching K-dramas by genre:', error);
    return [];
  }
};

// Get K-dramas by year
export const getKdramasByYear = async (year) => {
  try {
    // We'll search for "korean" and filter by year
    const response = await axios.get(`${API_BASE_URL}/search/shows?q=korean`);
    return response.data
      .map(item => item.show)
      .filter(show => {
        if (!show.premiered) return false;
        const showYear = new Date(show.premiered).getFullYear();
        return showYear === parseInt(year);
      });
  } catch (error) {
    console.error(`Error fetching K-dramas for year ${year}:`, error);
    return [];
  }
};

// Get a list of all genres from the available K-dramas
export const getAllGenres = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/shows?q=korean`);
    const shows = response.data.map(item => item.show);

    // Extract all genres and remove duplicates
    const allGenres = shows.reduce((genres, show) => {
      if (show.genres && Array.isArray(show.genres)) {
        show.genres.forEach(genre => {
          if (!genres.includes(genre)) {
            genres.push(genre);
          }
        });
      }
      return genres;
    }, []);

    return allGenres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};