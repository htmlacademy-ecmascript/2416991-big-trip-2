import { getRandomArrayElement, getRandomInteger } from './mock-utils.js';

const DESCRIPTIONS = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.split('. ');

const CITIES = ['Amsterdam', 'Geneva', 'Chamonix', 'Saint-Petersburg', 'Moscow', 'Barcelona', 'Rome', 'Prague', 'Vienna', 'Berlin'];

const createDestination = (cityName, id) => {
  const numberOfSentences = getRandomInteger(1, 2);
  const temporaryDescriptions = [...DESCRIPTIONS];
  let description = '';
  for (let i = 0; i < numberOfSentences; i++) {
    const sentence = temporaryDescriptions.splice(getRandomInteger(0, temporaryDescriptions.length - 1), 1)[0];
    description += description.length ? ` ${sentence}.` : `${sentence}.`;
  }
  const numberOfPictures = getRandomInteger(0, 5);

  return {
    id: id,
    description,
    name: cityName,
    pictures: Array.from({ length: numberOfPictures }, (_, index) => ({
      src: `https://picsum.photos/248/152?random=${index + 1}`,
      description: `${cityName} is ${getRandomArrayElement(DESCRIPTIONS)}`
    }))
  };
};

const generateDestinations = (idStart) => {
  let currentId = idStart;
  const destinations = [];
  CITIES.forEach((city) => {
    destinations.push(createDestination(city, currentId++));
  });
  return destinations;
};

export { generateDestinations };
