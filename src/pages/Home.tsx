import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery
} from '../store/github/github.api'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/debounce'
import RepoCard from "../components/RepoCard/RepoCard";

const Home = () => {
  const [search, setSearch] = useState('azamatyudaev')
  const [dropdown, setDropdown] = useState(false)

  const debounced = useDebounce(search)

  const {
    data: users,
    isLoading,
    isError
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  // console.log(data)

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery()

  useEffect(() => {
    console.log(debounced)
    setDropdown(debounced.length > 3 && users?.length! > 0)
  }, [debounced, users?.length])

  const clickHandler = (username: string) => {
    console.log(username)
    fetchRepos(username)
    setDropdown(false)
  }

  return (
    <div className="home pt-10">
      <div className="container">
        <div className="flex flex-col items-center">
          {isError && (
            <p className="text-center text-red-600 mb-4">
              Something went wrong...
            </p>
          )}

          <div className="relative w-full max-w-[560px]">
            <form>
              <input
                className="border py-2 px-4 w-full h-[42px] mb-2"
                type="text"
                placeholder="GitHub username"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </form>
            {dropdown && (
              <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
                {isLoading && <p className="text-center">Loading...</p>}
                {users?.map((user) => (
                  <li
                    className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                    key={user.id}
                    onClick={() => clickHandler(user.login)}
                  >
                    {user.login}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-full max-w-[560px]">
            {areReposLoading && (
              <p className="text-center">Repos are loading...</p>
            )}
            {repos?.map((repo) => (
              <RepoCard repo={repo} key={repo.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
