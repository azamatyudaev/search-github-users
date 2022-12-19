import { IRepo } from '../../models/models'
import React, {useState} from 'react'
import { useActions } from '../../hooks/actions'
import {useAppSelector} from "../../hooks/redux";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavorite, removeFavorite } = useActions()
  const { favorites } = useAppSelector(state => state.github)

  const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavorite(repo.html_url)
    setIsFav(true)
  }

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeFavorite(repo.html_url)
    setIsFav(false)
  }

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="text-bold mr-2">{repo.forks}</span>
          Watchers: <span className="text-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin mb-4">{repo?.description}</p>

        {!isFav && (
          <button
            className="py-2 px-4 bg-indigo-500 text-white mr-2 rounded hover:shadow-md transition-all"
            onClick={addToFavorite}
          >
            Add
          </button>
        )}
        {isFav &&
          <button
            className="py-2 px-4 bg-red-500 rounded text-white hover:shadow-md transition-all"
            onClick={removeFromFavorite}
          >
            Remove
          </button>
        }
      </a>
    </div>
  )
}

export default RepoCard
