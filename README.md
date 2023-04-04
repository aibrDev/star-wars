# Star wars

## Description

Landing page avec parallaxe

### Installation

Intégrer le fichier `script.js` dans votre page

### Configuration

- Ajouter l'attribute `data-parallax` sur l'élément.
- Si `data-parallax`

  - Est un simpler entier il sera cosiderer comme un ratio (vitesse) de l'animation
  - Est un objet de format `{"ratio": 0.2, "variable": false}`

  |   Paramètre   |       Type       |         valeur par défaut         |
  | :-----------: | :--------------: | :-------------------------------: |
  | data-parallax | integer / object | {"ratio": 0.2, "variable": false} |
  |     ratio     |      number      |                0.2                |
  |   variable    |     boolean      |               false               |

  - si **_ratio > 0_** l'animation est vers le haut si non vers le bas
