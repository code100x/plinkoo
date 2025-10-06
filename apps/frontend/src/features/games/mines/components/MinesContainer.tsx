import React from 'react';

const MinesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-grid grid-cols-5 mx-auto justify-items-center gap-2 md:gap-2.5">
      {children}
    </div>
  );
};

export default MinesContainer;
