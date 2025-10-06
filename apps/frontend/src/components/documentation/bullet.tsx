import React from 'react';

const BulletPoints = ({
  bulletPoints,
}: {
  bulletPoints: React.ReactNode[];
}) => {
  return (
    <ul className="list-disc pl-8">
      {bulletPoints.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ul>
  );
};

export default BulletPoints;
