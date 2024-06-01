import React, { ChangeEvent } from 'react';

// Define the possible options
type Option = 'Low' | 'Medium' | 'High';

// Define the props for the Selector component
interface SelectorProps {
    selectedOption: Option;
    setSelectedOption: (option: Option) => void;
}

const Selector: React.FC<SelectorProps> = ({ selectedOption, setSelectedOption }) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value as Option);
    };

    return (
        <div className='mt-2'>
            <label>
               
                <select className='w-full border-gray-700 border-2 bg-zinc-800 text-lg font-semibold' value={selectedOption} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </label>
            
        </div>
    );
};

export default Selector;
