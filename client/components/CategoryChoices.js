import React from 'react'
import PropTypes from 'prop-types'

const CategoryChoices = props => {
  const {categories, chooseCategory} = props
  return (
    <div>
      {categories.map(category => (
        <button
          type="button"
          className="btn btn-primary"
          key={category.id}
          onClick={() => chooseCategory(category)}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryChoices

// PROP TYPES
CategoryChoices.propTypes = {
  categories: PropTypes.array,
  chooseCategory: PropTypes.func
}
