from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from app.models import Pet_Gender, Pet_Species, Pet_Breed, Pet
from app.serializer import PetGenderSerializer, PetSpeciesSerializer, PetBreedSerializer, PetSerializer

@api_view(['GET'])
def get_pet_gender(request):
    pet_gender = Pet_Gender.objects.all()
    serializer = PetGenderSerializer(pet_gender, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_pet_species(request):
    pet_species = Pet_Species.objects.all()
    serializer = PetSpeciesSerializer(pet_species, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_pet_breed(request):
    pet_breed = Pet_Breed.objects.all()
    serializer = PetBreedSerializer(pet_breed, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_kind_breed(request, pk):
    pet_breed = Pet_Breed.objects.filter(pet_kind_id_id=pk)
    serializer = PetBreedSerializer(pet_breed, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_user_pet(request, pk):
    pet = Pet.objects.filter(user_id=pk)
    serializer = PetSerializer(pet, many=True)
    return Response(serializer.data)