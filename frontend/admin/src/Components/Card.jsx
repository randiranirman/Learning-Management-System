

import PropTypes from 'prop-types';

const Card = ({title,description}) => {
  return (
    

    <>
                <div className="bg-white shadow-md rounded p-4">
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <br />
                    <p className="text-black">{description}</p>
                </div>
    </>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card

