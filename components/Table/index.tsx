import React from 'react';

interface IProps {
  columnNames: string[];
  rows: any[];
  RowComponent: React.FC<{ item: any }>;
}

function Table({ columnNames, rows, RowComponent }: IProps) {
  return (
    <div className="relative overflow-x-auto rounded-md border-2 border-primary-300">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-primary-300">
          <tr>
            {columnNames.map((name) => (
              <th className="px-3 py-1.5">{name}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-primary-300">
          {rows.map((rowItem) => (
            <RowComponent item={rowItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
