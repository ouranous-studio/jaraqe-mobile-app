import Ionicons from 'react-native-vector-icons/Ionicons'

// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g
const icons = {
  // "ios-home": [30, "#bbb"],
  "ios-home": [30, "#bbb"],
  // "md-mail": [30, "#bbb"],
  "ios-color-filter-outline": [30, "#bbb"],

  "ios-basket": [30, "#bbb"],
}

const defaultIconProvider = Ionicons

let iconsMap = {}
let loadIcons = () => {
  return new Promise((resolve, reject) => {
    new Promise.all(
      Object.keys(icons).map(iconName => {
        const Provider = icons[iconName][2] || defaultIconProvider // Ionicons
        return Provider.getImageSource(
          iconName.replace(replaceSuffixPattern, ''),
          icons[iconName][0],
          icons[iconName][1]
        )
      })
    ).then(sources => {
      Object.keys(icons)
        .forEach((iconName, idx) => iconsMap[iconName] = sources[idx])

      // Call resolve (and we are done)
      resolve(true)
    })
  })
}

export {
  iconsMap,
  loadIcons
}