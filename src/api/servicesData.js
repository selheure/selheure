
export const servicesList = [
  { idService: 0, type: 'propose', service: 'jardinnage', from: 'moi' },
  { idService: 1, type: 'request', service: 'vaisselle', from: 'pasMoi' },
  { idService: 2, type: 'declaration', service: 'vaisselle', from: 'pasMoi', for: 'moi' }
]

export const servicesTypes = [
  { name: 'propose' },
  { name: 'request' },
  { name: 'declaration' }
]

export const servicesCategory = {
  0: "Choisissez un service",
  1: "Sortir mon chien",
  2: "Faire ma vaiselle",
  3: "Laver la voiture",
  4: "Tondre pelouse",
}
