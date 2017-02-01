
export const declarations = [
  {
  idService: 0,
  type: 'Declaration a valider',
  service: 'Sortir mon chien',
  from: 'nicolas',
  for: 'justine',
  validByFrom: true,
  validByFor: false,
  time: 0
  },
  {
  idService: 1,
  type: 'Declaration a valider',
  service: 'Sortir mon chien',
  from: 'justine',
  for: 'nicolas',
  validByFrom: true,
  validByFor: false,
  time: 0
  },
  {
  idService: 2,
  type: 'Declaration a valider',
  service: 'Sortir mon chien',
  from: 'justine',
  for: 'nicolas',
  validByFrom: false,
  validByFor: true,
  time: 0
  },
  {
  idService: 3,
  type: 'Declaration a valider',
  service: 'Sortir mon chien',
  from: 'justine',
  for: 'ju',
  validByFrom: false,
  validByFor: true,
  time: 0
  },
  {
  idService: 4,
  type: 'Declaration a valider',
  service: 'Sortir mon chien',
  from: 'justine',
  for: 'ju',
  validByFrom: false,
  validByFor: true,
  time: 0
  }
]


export const declarationsTypes = {
  0: "Tous",
  1: "Declaration a valider",
  2: "Declaration"
}

export const announces = [
  {
    idService: 0,
    type: 'Propose',
    service: 'Sortir mon chien',
    from: "quelquun dautre",
    message: "hello"
  },
  {
    idService: 1,
    type: 'Recherche',
    service: 'Laver la voiture',
    from: "justine",
    message: "hello"
  },
  {
    idService: 2,
    type: 'Recherche',
    service: 'Laver la voiture',
    from: "nicolas",
    message: "hello"
  },
  {
    idService: 3,
    type: 'Propose',
    service: 'Laver la voiture',
    from: "justine",
    message: "hello"
  }
 ]



export const announcesTypes = {
  0: "Tous",
  1: "Propose",
  2: "Recherche"
}


export const announcesCategory = {
  0: "Tous",
  1: "Sortir mon chien",
  2: "Faire ma vaiselle",
  3: "Laver la voiture",
  4: "Tondre pelouse",
}

export const servicesChoice = {
  0: "Propose",
  1: "Recherche"
}
