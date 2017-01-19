
export const declarationList = [
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
  }
]


export const servicesList = [
  {
    idService: 0,
    type: 'Propose',
    service: 'Sortir mon chien',
    from: "userName",
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



export const servicesTypes = {
  0: "Tous",
  1: "Propose",
  2: "Recherche"
}

export const servicesChoice = {
  0: "Propose",
  1: "Recherche"
}

export const servicesCategory = {
  0: "Tous",
  1: "Sortir mon chien",
  2: "Faire ma vaiselle",
  3: "Laver la voiture",
  4: "Tondre pelouse",
}
