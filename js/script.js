/**
 * @function
 * @name getOffsetTop calculer la position de l'élément par rapport au haut de la page
 * @param {HTMLElement} element
 * @returns {number}
 */
function getOffsetTop(element, acc = 0) {
  if (element.offsetParent) {
    return getOffsetTop(element.offsetParent, acc + element.offsetTop);
  }

  return acc + element.offsetTop;
}

/**
 * @property {HTMLElement} element
 * @property {{ratio: number, variable: boolean}} options
 */
class Parallax {
  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    this.element = element;

    this.options = this.parseAttribute();
    this.elementY = getOffsetTop(this.element) + this.element.offsetHeight / 2;
    this.onScroll = this.onScroll.bind(this);
    this.onIntersection = this.onIntersection.bind(this);
    const observer = new IntersectionObserver(this.onIntersection);
    observer.observe(element);
    this.onScroll();
  }

  parseAttribute() {
    const defaultOptions = {
      ratio: 0.2,
      variable: false,
    };

    if (this.element.dataset.parallax.startsWith('{')) {
      return {
        ...defaultOptions,
        ...JSON.parse(this.element.dataset.parallax),
      };
    }

    // parseFloat pour avoir un nombre a lien d'une chaine de caractéres
    return {
      ...defaultOptions,
      ratio: parseFloat(this.element.dataset.parallax),
    };
  }

  /**
   * @function
   * @name onIntersection
   * @param {IntersectionObserverEntry[]} entries
   */
  onIntersection(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        document.addEventListener('scroll', this.onScroll);
        this.elementY =
          getOffsetTop(this.element) + this.element.offsetHeight / 2;
      } else {
        document.removeEventListener('scroll', this.onScroll);
      }
    }
  }

  onScroll() {
    window.requestAnimationFrame(() => {
      // calculer la position du milieux de l'ecran
      const screenY = window.scrollY + window.innerHeight / 2;
      const diffY = this.elementY - screenY;
      const translateY = diffY * this.options.ratio;
      if (this.options.variable) {
        this.element.style.setProperty('--parallaxY', `${translateY}px`);
      } else {
        this.element.style.setProperty(
          'transform',
          `translateY(${translateY}px)`
        );
      }
    });
  }

  /**
   * @function
   * @name init pour ajouter le comportement
   * @returns {Parallax[]}
   */
  static init() {
    return Array.from(document.querySelectorAll('[data-parallax]')).map(
      (element) => {
        return new Parallax(element);
      }
    );
  }
}

Parallax.init();
