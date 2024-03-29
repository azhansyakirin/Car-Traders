import { useState } from 'react'
import { car } from './dataset'
import { Cards } from './components/Cards';
import { Popover } from './components/Popover';
import './App.css'

function App() {

  const [searchValue, setSearchValue] = useState(''); /* input value */
  const [filterSearch, setFilterSearch] = useState(''); /* filtered search */
  const [carCategory, setCarCategory] = useState(''); /* category selected */
  const [arrCarSelectedCategory, setArrCarSelectedCategory] = useState([]);
  const [isShowDropdownCategory, setIsShowDropdownCategory] = useState(false);

  const category = ['All Category', 'SUV', 'Sport', 'Sedan', 'Compact', 'MPV'];

  console.log({ searchValue, filterSearch, carCategory, arrCarSelectedCategory })

  const handleClosePopover = () => { setIsShowDropdownCategory(!isShowDropdownCategory) }

  /* handle category selected */
  const handleDropdownClickData = (category) => {
    if (category === 'All Category') {
      setCarCategory('');
      setArrCarSelectedCategory([]);
    } else {
      setCarCategory(category);
      const mapCarByCategory = car.filter(options => options.category.toLowerCase().includes(category.toLowerCase()));
      setArrCarSelectedCategory(mapCarByCategory);
    };
    setFilterSearch([]);
  }

  /* handling user input */
  const searchCar = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchValue(inputValue);

    let filteredCars = car.filter(option =>
      (!carCategory || option.category.toLowerCase() === carCategory.toLowerCase()) &&
      option.name.toLowerCase().includes(inputValue)
    );

    setFilterSearch(filteredCars.length > 0 ? filteredCars : []);
  };


  /* final car array */
  let carResult = ((filterSearch.length > 0 ? filterSearch : arrCarSelectedCategory.length > 0 ? arrCarSelectedCategory : car)
    .filter(vehicle => !carCategory || vehicle.category.toLowerCase() === carCategory.toLowerCase())) || [];

  return (
    <>
      <section id="Title" className="p-[2rem]">
        <h1 className="text-gold text-center font-extrabold text-lg tablet:text-8xl tracking-tight">CarTraders<span className="text-white">.com</span></h1>
      </section>
      <section id="SearchCar" className="min-h-[100vh] px-4 tablet:px-[5rem] py-4">
        <div className="flex flex-col tablet:flex-row items-center bg-[#fdfdfd] rounded-lg shadow-lg mb-4">
          <div className="relative w-full tablet:w-[30%]">
            <button
              className="flex justify-center items-center py-4 w-full bg-[#FFC800] hover:bg-[#e7b708] outline-none rounded-lg tablet:!rounded-l-lg font-[10pt]"
              onClick={() => { setIsShowDropdownCategory(!isShowDropdownCategory) }}
            >
              <span className="text-black inline-flex">
                {carCategory || 'All Category'}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </span>
            </button>
            {
              isShowDropdownCategory &&
              <div className="absolute z-50 w-[100%] outline-none">
                <Popover
                  onSelectCategory={handleDropdownClickData}
                  closePopover={handleClosePopover}
                  list={category}
                />
              </div>
            }
          </div>
          <div className="w-full">
            <input
              id="SearchBox"
              type="search"
              className="px-8 py-4 outline-none text-black text-center tablet:text-left w-[100%] rounded-lg tablet:rounded-r-lg"
              value={searchValue}
              onChange={e => searchCar(e)}
              placeholder="What car you are looking for?"
            />
          </div>
        </div>
        <div className="min-w-screen min-h-screen bg-white rounded-lg shadow-lg">
          <div className="flex flex-wrap justify-center py-8 px-4 tablet:px-0 gap-4">
            {carResult.map((vehicle, index) => (
              <Cards key={index} img={vehicle.img} >
                {vehicle.recommended && <div className="absolute top-0 left-0 z-10 bg-red-500 rounded-br-lg px-2 py-1">RECOMMENDED</div>}
                <p className="text-2xl font-normal tracking-tighter text-white text-shadow-lg">
                  {vehicle.name}
                </p>
                <p className="text-md text-white tracking-tight text-shadow-md ">
                  {vehicle.engineCapacity} litre
                </p>
                <p className="text-md text-white tracking-tight text-shadow-md ">
                  {vehicle.category}
                </p>
                <p className="text-2xl font-normal tracking-tighter text-white text-shadow-lg">
                  RM {(vehicle.price).toLocaleString('en-US')}
                </p>
              </Cards>
            ))}
          </div>
        </div>
      </section>
      <footer id="Footer" className="static bottom-0">
        <p className="text-center py-4">Made with &hearts; by CarTraders.com</p>
      </footer>
    </>
  )
}

export default App
