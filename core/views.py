from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ContactMessageSerializer

def index(request):
    """
    Renders the main portfolio page.
    """
    return render(request, 'index.html')

@api_view(['POST'])
def contact_api(request):
    """
    Handles contact form submissions via AJAX.
    """
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Thank you for your message! I will get back to you soon."},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
