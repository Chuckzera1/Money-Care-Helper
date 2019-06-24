import React, { Component } from 'react'

import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

class Summary extends Component {
    render() {
        const {credit, debt} = this.props
        const color = credit - debt > 0 ? 'blue' : 'red'
        const icon = credit - debt > 0 ? 'money' : 'exclamation-circle'
        return (
            <Grid cols='12'>
                <fieldset>
                    <legend>Resumo</legend>
                    <Row>
                        <ValueBox cols='12 4' color='green' icon='bank'
                            value={`R$ ${credit}`} text='Total de Créditos' />
                        <ValueBox cols='12 4' color='yellow' icon='credit-card'
                            value={`R$ ${debt}`} text='Total de Débitos' />
                        <ValueBox cols='12 4' color={color} icon={icon}
                            value={`R$ ${credit - debt}`} text='Valor Consolidado' />
                    </Row>
                </fieldset>
            </Grid>
        )
    }
}

export default Summary