export const productSpecs = {
  dpi: 300, // the dpi to display the template at
  bleedInches: 0.25,
  safeInches: 0.125,
}

export const productSizes = {
  '9x6': {
    name: 'Postcard',
    width: 6,
    height: 9,
    product: 'postcard'
  },
  '11.5x6': {
    name: 'Postcard',
    width: 6,
    height: 11.5,
    product: 'postcard'
  },
  '8.5x11': {
    name: 'Flyer',
    width: 8.5,
    height: 11,
    product: 'postcard'
  },
  '11x8.5': {
    name: 'Flyer',
    width: 11,
    height: 8.5,
    product: 'postcard'
  },
  '3.5x8.5': {
    name: 'Door Hanger',
    width: 3.5,
    height: 8.5,
  }
};

export const productTypes = {
  postcard_small: {
    type: 'postcard',
    width: 9,
    height: 6,
    size: '9x6'
  },
  postcard_large: {
    type: 'postcard',
    width: 11.5,
    height: 6,
    size: '11.5x6'
  },
  flyer_portrait: {
    type: 'flyer',
    width: 8.5,
    height: 11,
    size: '8.5x11'
  },
  flyer_landscape: {
    type: 'flyer',
    width: 11,
    height: 8.5,
    size: '11x8.5'
  },
  door_hanger: {
    type: 'doorhanger',
    width: 3.5,
    height: 8.5,
    size: '3.5x8.5'
  }
};

export const thumbnailSizes = {
  '9x6': {
    width: 129,
    height: 86
  },
  '11.5x6': {
    width: 138,
    height: 72
  },
  '8.5x11': {
    width: 102,
    height: 132
  },
  '11x8.5': {
    width: 132,
    height: 102
  },
  '3.5x8.5': {
    width: 56,
    height: 136
  }
}