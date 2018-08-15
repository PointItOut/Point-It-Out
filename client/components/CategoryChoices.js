import React from 'react'

const CategoryChoices = props => {
  const {categories, chooseCategory} = props
  return (
    <div>
      {categories.map(category => (
        <button
          type="button"
          className="btn btn-info"
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
