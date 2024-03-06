import { useState } from 'react'
import { car } from './dataset'
import { Cards } from './components/Cards';
import './App.css'
import { Popover } from './components/Popover';

function App() {

  const [searchValue, setSearchValue] = useState('');
  const [filterSearch, setFilterSearch] = useState('');
  const [carCategory, setCarCategory] = useState('');
  const [isShowDropdownCategory, setIsShowDropdownCategory] = useState(false);

  const category = ['sedan', 'suv', 'compact', 'mpv'];

  console.log({ searchValue, filterSearch, carCategory })

  const handleDropdownClickData = (cat) => { setCarCategory(cat) }

  const searchCar = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    const mapCarByCategory = car.filter(options => options.category.toLowerCase().includes(carCategory.toLowerCase()))

    console.log(mapCarByCategory)
    let resultCar = mapCarByCategory.filter(options => (options.name).toLowerCase().includes(inputValue.toLowerCase()))
    setFilterSearch(resultCar);
  }

  return (
    <>
      <section id="Hero" className="p-[2rem]">
        <h1 className="text-center font-extrabold text-3xl tracking-tight">CarTraders</h1>
      </section>
      <section id="SearchCar" className="min-h-[100vh] p-[10rem]">
        <div className="p-4">
          <div className="flex flex-row items-center bg-[#fdfdfd] rounded-lg shadow-lg">
            <div className="relative left-0 justify-start w-[20%]">
              <button className="px-12 py-4 bg-[#FFC800] hover:bg-[#e7b708] outline-none rounded-l-lg flex flex-row items-center align-center font-[10pt]" onClick={() => { setIsShowDropdownCategory(!isShowDropdownCategory) }}>
                <span className="text-black inline-flex">{carCategory}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                  </svg>
                </span>
              </button>
              {
                isShowDropdownCategory &&
                <div className="absolute z-10 w-[100%] outline-none">
                  <Popover onSelectCategory={handleDropdownClickData} list={category} />
                </div>
              }

            </div>
            <div className="w-full">
              <input
                id="SearchBox"
                type="search"
                className="px-8 py-4 outline-none text-black text-center w-[100%] rounded-r-lg"
                value={searchValue}
                onChange={e => searchCar(e)}
                placeholder="Search your desired car"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap rounded-lg justify-center shadow-md bg-white p-8 gap-4 min-w-[100%]">
          {
            ((searchValue.length && filterSearch) || car).map((vehicle, index) => (
              <Cards key={index} img={vehicle.img} >
                <p className="text-2xl font-normal tracking-tighter text-white text-shadow-lg">
                  {vehicle.name}
                </p>
                <p className="text-md text-white tracking-tight text-shadow-md ">
                  {vehicle.engineCapacity} l
                </p>
                <p className="text-md text-white tracking-tight text-shadow-md ">
                  {vehicle.category}
                </p>
                <p className="text-2xl font-normal tracking-tighter text-white text-shadow-lg">
                  RM {vehicle.price}
                </p>
              </Cards>
            ))
          }
        </div>
      </section>
    </>
  )
}

export default App
