import React, {PropTypes} from 'react'
import FilteredList from '../../../components/FilteredList'

export default class ExchangeHistoryComponent extends React.Component {
  static propTypes = {
    exchanges: PropTypes.array.isRequired
  }

  render() {
    const columns = [
      {
        header:   'Catégorie',
        accessor: 'category',
      },
      {
        header:   'Fournisseur',
        accessor: 'supplier',
      },
      {
        header:   'Bénéficiaire',
        accessor: 'beneficiary',
      },
      {
        header:   'Montant',
        accessor: 'amount',
      },
      {
        header:   'Description',
        accessor: 'description',
      },
      {
        header:   'Déclaré par',
        accessor: 'validatedBy',
      },
      {
        header:   'Validé par',
        accessor: 'validatedBy',
      },
      {
        header:   'Statut',
        accessor: 'state',
      },
    ]
    const {exchanges} = this.props
    return (
      <FilteredList columns={columns} list={exchanges} />
    )
  }
}
