import { useNavigate } from 'react-router-dom';

const Card = ({ card}: any) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`${card.redirect}`);
    };

    return (
        <div
            className={`card-container border 'border-gray-300' rounded-lg overflow-hidden shadow-md m-2 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`}
            onClick={handleCardClick}
            style={{ width: '200px', height: '300px' }}
        >
            <img src={card.imageUrl} alt={`Card ${card.id}`} className="w-full h-full" />
        </div>
    );
};

export default Card;
