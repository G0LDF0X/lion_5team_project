// RegisterModal.jsx
import React, { useEffect, useState } from 'react';
import { register } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';
import { mainAxiosInstance } from "../api/axiosInstances";
import { useFetch } from '../hook/useFetch';

const RegisterModal = ({ isOpen, onClose }) => {

  console.log('RegisterModal rendered');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  

  // Pet details
  const [pet, setPet] = useState(false); 
  const [petName, setPetName] = useState('');
  const [petGender, setPetGender] = useState({pet_gender: ''});
  const [petAge, setPetAge] = useState('');
  const [petSpecies, setPetSpecies] = useState({pet_kind: ''});
  // const [petBreedId, setPetBreedId] = useState('');
  const [petBreed, setPetBreed] = useState('')
  const [pet_kind_id, setPet_kind_id] = useState('');

  // Options for pet details
  const [breeds, setBreeds] = useState([]);

  const dispatch = useDispatch();
  const {genders, species}=useFetch();
 
  
  useEffect(() => {
    const fetchBreeds = async () => {
      if (petSpecies) {
        const res = await mainAxiosInstance.get(`/pet/breed/${petSpecies.pet_kind}`);
        setBreeds(res.data);
        // console.log("BREED:", res.data);
        console.log("PET BREED:", breeds);
      }
    };
  
    fetchBreeds();
  }, [petSpecies]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const pet = petName ? { 'name': petName, 'gender':petGender, 'age': petAge, 'species':petSpecies, 'breed': {'pet_breed':petBreed,'pet_kind_id':pet_kind_id }} : null;
    dispatch(register({ username, email, password, nickname, address, phone, pet}));
    // Handle registration logic here
    console.log('User registered:', { username, email, password, nickname, address, phone, pet});
    onClose();
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
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              required
            />
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
              onChange={(e) => setPetGender({pet_gender:e.target.value})}
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
              onChange={(e) => {setPetSpecies({pet_kind:e.target.value}); setPet_kind_id(e.target.value)}}
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
              {breeds
              .sort((a, b) => a.pet_breed.localeCompare(b.pet_breed))
              .map((breed) => (
                <option key={breed.id} value={breed}>
                  {breed.pet_breed}
                </option>
              ))}
            </select>
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