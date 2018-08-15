import React from 'react'

const CategoryChoices = props => {
  const { categories, chooseCategory } = props
  return (
    <div>
      {
        categories.map(category => (
          <button key={category.id} onClick={() => chooseCategory(category)} >{category.name}</button>
        ))
      }
    </div>
  )
}

export default CategoryChoices
