import { Loader as PixiLoader } from 'pixi.js-legacy'

export default class Loader {
  static load() {
    return new Promise<void>((resolve) => {
      const loader = PixiLoader.shared
      loader.add('assets/img/images.json')
      loader.add('assets/img/multipacked-0.json')
      loader.add('autumn', 'assets/img/backgrounds/autumn.jpg')
      loader.add('campFire', 'assets/img/backgrounds/campfire.jpg')
      loader.add('birds', 'assets/img/backgrounds/birds.jpg')
      loader.add('cigarette', 'assets/img/backgrounds/cigarette.jpg')
      loader.add('blackHole', 'assets/img/backgrounds/blackHole.jpg')
      loader.add('face', 'assets/img/backgrounds/face.jpeg')
      loader.add('office1', 'assets/img/backgrounds/office1.png')
      loader.add('office2', 'assets/img/backgrounds/office2.png')
      loader.load()
      loader.onComplete.once(() => resolve())
    })
  }
}
