

export const fakeHistorical = [
  { idService: 0, type: 'Propose', service: 2, from: 'moi' },
  { idService: 1, type: 'Recherche', service: 1, from: 'moi' },
  { idService: 2, type: 'Declaration', service: 3, from: 'moi', for: 'pasMoi' }
]

export const userData = {
  idUser: 0
}

export const userList = [
  { idUser: 0, userName: 'nicolas', eMail: 'aaaa@aaa.aa', solde: 10, phone: '0000000000', historical: fakeHistorical },
  { idUser: 1, userName: 'nicolas2', eMail: 'aaaa@aaa.aa', solde: 0, phone: '1111111111', historical: fakeHistorical }
]


export const servicesTypes = {
  0: "Tous",
  1: "Propose",
  2: "Recherche",
  3: "Declaration"
}
