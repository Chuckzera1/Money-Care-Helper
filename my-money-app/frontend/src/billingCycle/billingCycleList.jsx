import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete, showCreate } from './billingCycleActions'

class BillingCycleList extends Component {

    componentWillMount() {
        this.props.getList()
    }

    somaOfCredits(credits, debts){
        const sum = (t, v) => t + v
        const sumOfCredits = credits.map(c => +c.value || 0).reduce(sum, 0)
        const sumOfDebts = debts.map(d => +d.value || 0).reduce(sum, 0)
        return sumOfCredits - sumOfDebts
    }

    copyItem(item){
        this.props.list.push(item)
        this.props.getList()
    }

    renderRows() {
        const list = this.props.list || []
        return list.map(bc => (
            <tr key={bc._id}>
                <td style={{color : `${this.somaOfCredits(bc.credits, bc.debts) >= 0 ? 'blue' : 'red' }`}}>{bc.name}</td>
                <td>{bc.month}</td>
                <td>{bc.year}</td>
                <td style={{color : `${this.somaOfCredits(bc.credits, bc.debts) >= 0 ? 'blue' : 'red' }`}}>{this.somaOfCredits(bc.credits, bc.debts)}</td>
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-info' onClick={() => this.props.showCreate(bc)}><i className="fa fa-copy"></i></button>
                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                    
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th>Valor Consolidado</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({list: state.billingCycle.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete, showCreate}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)