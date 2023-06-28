import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => {
              if (column.content) {
                return (
                  <td key={item._id + column.key}>{column.content(item)}</td>
                );
              } else {
                return (
                  <td key={item._id + column.path}>
                    {_.get(item, column.path)}
                  </td>
                );
              }
            })}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
