import React from 'react';

const Documentation = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-2 flex flex-col gap-6">{children}</div>;
};

export default Documentation;
