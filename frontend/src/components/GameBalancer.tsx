import {  useState } from "react";

type GameBalancerProps = {
  rows: number;
  setRows: (rows: number) => void;
};

export const GameBalancer:React.FC<GameBalancerProps> = ({rows, setRows}) => {
  const [selectedRows, setSelectedRows]= useState(rows);
  

  const handleRowChange = (event: React.ChangeEvent<HTMLSelectElement>)=> {
    const selectedValue = parseInt(event.target.value);
    setSelectedRows(selectedValue);
    setRows(selectedValue);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-slate-700">
      <div className="w-full ml-10 h-full">
        <label className="block text-lg font-semibold text-gray-300 ">
          Select Number of Rows
        </label>
        <div className="mt-1 relative w-24">
          <select
            id="number"
            name="number"
            value={selectedRows}
            onChange={handleRowChange}
            className="block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
          </select>
        </div>
        <div id="selected-number" className="mt-4 text-lg text-gray-700"></div>
      </div>
      
    </div>
  );
};
