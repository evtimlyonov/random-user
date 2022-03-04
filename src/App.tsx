import { useEffect, useState } from 'react';
import {
  FaUserAlt,
  FaEnvelopeOpen,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';

const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

interface IPerson {
  image: string;
  phone: string;
  email: string;
  password: string;
  age: number;
  street: string;
  name: string;
}

const initialPerson = {
  image: defaultImage,
  phone: '0',
  email: '@',
  password: 'password',
  age: 0,
  street: 'empty',
  name: '',
};

export const App = () => {
  const [person, setPerson] = useState<IPerson>(initialPerson);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('random person');

  const getPerson = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const rawPerson = data.results[0];
      const newPerson = {
        image: rawPerson.picture.large,
        phone: rawPerson.cell,
        email: rawPerson.email,
        password: rawPerson.login.password,
        age: rawPerson.dob.age,
        street: `${rawPerson.location.street.number} ${rawPerson.location.street.name}`,
        name: `${rawPerson.name.first} ${rawPerson.name.last}`,
      };
      setPerson(newPerson);
      setValue(`${rawPerson.name.first} ${rawPerson.name.last}`);
      setLoading(false);
    } catch (err) {
      console.log('Error: ', err);
    }
  };
  useEffect(() => {
    getPerson();
  }, []);

  return (
    <main>
      <div className='bg-[#2c2e31] min-h-[50vh]'></div>
      <div className='min-h-[50vh]'>
        <div className='relative text-center w-[90vw] max-w-3xl bg-white -mt-52 mx-auto rounded p-6 shadow-md'>
          <div className='absolute top-0 left-0 w-full h-32 bg-[#f1f5f8] rounded-tl rounded-tr border-b border-[rgba(0,0,0,.25)]'></div>
          <img
            src={(person && person.image) || defaultImage}
            alt='random user'
            className='relative bg-white mx-auto w-36 h-36s rounded-full border border-[rgba(0,0,0,.25)] shadow-md mb-8 p-1'
          />
          <p className='text-sm sm:text-lg text-[#324d67]'>My {title} is</p>
          <p className='text-xl sm:text-4xl text-[#324d67] mb-5'>{value}</p>
          <div className='flex justify-around text-xl sm:text-4xl'>
            <FaUserAlt
              className='text-[#617d98] hover:text-[#49a6e9] cursor-pointer transition duration-500'
              onMouseOver={() => {
                setTitle('name');
                setValue(person.name);
              }}
            />
            <FaEnvelopeOpen
              className='text-[#617d98] hover:text-[#49a6e9] cursor-pointer transition duration-500'
              onMouseOver={() => {
                setTitle('email');
                setValue(person.email);
              }}
            />
            <FaCalendarTimes
              className='text-[#617d98] hover:text-[#49a6e9] cursor-pointer transition duration-500'
              onMouseOver={() => {
                setTitle('age');
                setValue(person.age.toString());
              }}
            />
            <FaMap
              className='text-[#617d98] hover:text-[#49a6e9] cursor-pointer transition duration-500'
              onMouseOver={() => {
                setTitle('street');
                setValue(person.street);
              }}
            />
            <FaPhone
              className='text-[#617d98] hover:text-[#49a6e9] cursor-pointer transition duration-500'
              onMouseOver={() => {
                setTitle('phone');
                setValue(person.phone);
              }}
            />
            <FaLock
              className='text-[#617d98] hover:text-[#49a6e9] cursor-pointer transition duration-500'
              onMouseOver={() => {
                setTitle('password');
                setValue(person.password);
              }}
            />
          </div>
          <button
            className='transition duration-500 block mt-6 mx-auto bg-[#49a6e9] text-white py-[0.375em] px-3 uppercase text-xs sm:text-[0.875rem] border-2 border-[#49a6e9] shadow-xl rounded hover:text-[#49a6e9] hover:bg-[#063251] hover:border-[#063251]'
            type='button'
            onClick={getPerson}>
            {loading ? 'loading...' : 'random user'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default App;
