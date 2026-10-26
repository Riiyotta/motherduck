// Generic fallback photos in public/assets/photos (Unsplash License via Lorem Picsum; authors + sources in CREDITS.json).
export const PHOTOS = {
  work: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 20, 42, 48, 60, 119, 180, 201, 370, 445, 513, 534],
  people: [64, 91, 447, 454, 628, 669, 786, 823, 838, 1027],
  events: [342, 453],
  scenic: [381, 579, 682, 744, 870, 903, 916, 960],
}

export const photoSrc = (id) => `/assets/photos/${id}.jpg`
