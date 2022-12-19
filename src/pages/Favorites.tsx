import { useAppSelector } from '../hooks/redux'

const Favorites = () => {
  const { favorites } = useAppSelector((state) => state.github)

  if (favorites.length === 0)
    return <p className="text-center">Favorites are empty!</p>

  return (
    <div className="favorites pt-10">
      <div className="container">
        <div className="w-full max-w-[560px] mx-auto">
          <ul className="">
            {favorites.map((favorite, index) => (
              <li key={index}>
                <a href={favorite} target="_blank" rel="noreferrer">{favorite}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Favorites
