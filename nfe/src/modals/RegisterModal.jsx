// RegisterModal.jsx
import React, { useEffect, useState } from 'react';
import { register } from '../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useFetch } from '../hook/useFetch';
import AddressSearch from '../components/AddressSearch';

const RegisterModal = ({ isOpen, onClose }) => {

  console.log('RegisterModal rendered');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  

  // Pet details
  const [pet, setPet] = useState(false); 
  const [petName, setPetName] = useState('');
  const [petGender, setPetGender] = useState({pet_gender: ''});
  const [petAge, setPetAge] = useState('');
  const [petSpecies, setPetSpecies] = useState({pet_kind: ''});
  // const [petBreedId, setPetBreedId] = useState('');
  const [petBreed, setPetBreed] = useState({pet_breed: ''})
  const [pet_kind_id, setPet_kind_id] = useState('');

  // Options for pet details
  // const [breeds, setBreeds] = useState([]);

  const dispatch = useDispatch();
  const {genders, species, breeds}=useFetch();
  const { loading, registerError } = useSelector((state) => state.user); // 리덕스 상태에서 에러 가져오기
 
  const [filteredBreeds, setFilteredBreeds] = useState([]); 
  
  // useEffect(() => {
  //   const fetchBreeds = async () => {
  //     if (petSpecies) {
  //       const res = await mainAxiosInstance.get(`/pet/breed/${pet_kind_id}`);
  //       setBreeds(res.data);
  //     }
  //   };
  
  //   fetchBreeds();
  // }, [petSpecies]);

  useEffect(() => {
    console.log("PET KIND ID", pet_kind_id);
    const newBreeds = (breeds || []).filter((breed) => Number(breed.pet_kind_id) === Number(pet_kind_id));
    console.log("BEFORE BREEDS", breeds);
    setFilteredBreeds(newBreeds);
    console.log("FILTERED BREEDS", newBreeds);
  }, [breeds, pet_kind_id]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const pet = petName ? { 'name': petName, 'gender':{'pet_gender':petGender}, 'age': petAge, 'species':{'pet_kind': petSpecies}, 'breed': {'pet_breed': petBreed, 'pet_kind_id':petSpecies}} : null;
    // Handle registration logic here
    console.log('User registered:', { username, email, password, nickname, address, phone, pet});

    dispatch(register({ username, email, password, nickname, address, phone, pet}))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        setError(error);
      });
    };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-md overflow-y-auto" style={{ maxHeight: '80vh' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Register</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">ID:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password:</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nickname:</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            {/* <label className="block text-gray-700">Address:</label> */}
            <AddressSearch onAddressSelected={setAddress} />
            {/* <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            /> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
  <label style={{ marginRight: '0.5rem' }}>펫 등록하기</label>
  <input 
    type="checkbox"
    checked={pet}
    onChange={(e) => setPet(e.target.checked)}
  />
</div>
      
        {pet ? ( <>
          <div className="mb-4">
            <label className="block text-gray-700">Pet Name:</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Pet Gender:</label>
            <select
              value={petGender}
              onChange={(e) => setPetGender(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              {genders.map((gender) => (
                <option key={gender.id} value={gender.id}>
                  {gender.pet_gender}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Pet Age:</label>
            <input
              type="number"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Pet Species:</label>
            <select
              value={petSpecies}
              onChange={(e) => {setPetSpecies(e.target.value); setPet_kind_id(e.target.value)}}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Species</option>
              {species.map((kind) => (
                <option key={kind.id} value={kind.id}>
                  {kind.pet_kind}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Pet Breed:</label>
            <select
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Breed</option>
              {console.log()}
              {filteredBreeds
                .sort((a, b) => a.pet_breed.localeCompare(b.pet_breed))
                .map((breed) => (
                  <option key={breed.id} value={breed.id}>
                    {breed.pet_breed}
                  </option>
                ))}
            </select>
              {console.log("PETBREED", petBreed)}
          </div>
        </>) : (null
        )
        }

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;