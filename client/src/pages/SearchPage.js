import { Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DoctorList from '../components/DoctorList';
import axios from "axios";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'feesPerConsultation', // Corrected typo in sort default value
    specialization: 'uncategorized',
    firstName: '',
    lastName: '',
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('specialization');
    const fnameFromUrl = urlParams.get('firstName'); // Corrected typo in variable name
    const lnameFromUrl = urlParams.get('lastName'); // Corrected typo in variable name

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl || fnameFromUrl || lnameFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        specialization: categoryFromUrl,
        firstName: fnameFromUrl,
        lastName: lnameFromUrl
      });
    }

    const fetchDoct = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await axios.get(`/api/v1/user/getAllDoctor?${searchQuery}`);
        if (!res.data.success) {
          setLoading(false);
          return;
        }
        setDoctors(res.data.doctors); // Corrected setting doctors list
        setLoading(false);
        // setShowMore(res.data.doctors.length === 9);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };
    fetchDoct();
  }, [location.search, sidebarData]); // Added sidebarData to the dependency array

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData({ ...sidebarData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    for (const key in sidebarData) {
      urlParams.set(key, sidebarData[key]);
    }
    navigate(`/search?${urlParams.toString()}`);
  };

  // const handleShowMore = async () => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const startIndex = doctors.length;
  //   urlParams.set('startIndex', startIndex);
  //   try {
  //     const res = await axios.get(`/api/v1/user/getAllDoctor?${urlParams.toString()}`);
  //     if (res.data.success) {
  //       setDoctors([...doctors, ...res.data.doctors]);
  //       setShowMore(res.data.doctors.length === 9);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching more doctors:", error);
  //   }
  // };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>
              Search Term:
            </label>
            <TextInput
              placeholder='Search...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Descending order</option>
              <option value='asc'>Ascending Order</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Specialization:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.specialization}
              id='specialization'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='Neurosurgeon'>Neurosurgeon</option>
              <option value='dentist'>Dentist</option>
              <option value='heart specialist'>Heart Specialist</option>
            </Select>
          </div>
          <button type='submit' outline gradientDuoTone='purpleToPink'>
            Apply Filters
          </button>
        </form>
      </div>
      <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
          Doctors Result..
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && doctors.length === 0 && (
            <p className='text-xl text-gray-500'>No Doctor found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            doctors.map((doctor) => (
              <DoctorList key={doctor._id} doctor={doctor} />
            ))}
          {/* {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
}
