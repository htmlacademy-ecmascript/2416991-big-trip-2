import { getMockOffers } from '../mocks';

const mockOffers = getMockOffers();

export default class OffersModel {
  offers = [...mockOffers];

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.offers.find((offer) => offer.type === type).offers;
  }

  getSelectedOffers(type, idList) {
    return this.offers.find((offer) => offer.type === type).offers.filter((offer) => idList.includes(offer.id));
  }
}
