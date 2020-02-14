import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class TableHeader extends Component {

    constructor(props) {
        super(props);
        this.headerList = props.headers;
        this.createHeader = this.createHeader.bind(this);
    }

    render() {
        return (
            <thead>
                <tr>
                    {
                        this.createHeader(this.headerList)
                    }
                </tr>
            </thead>
        )
    }

    createHeader(headerList) {
        let table = [];
        headerList.map((header, i) => {
            table.push(
                <th key={i}>{header}</th>
            );
        })
        return table;
    }
}

TableHeader.propTypes = {
    headers: PropTypes.array.isRequired
}