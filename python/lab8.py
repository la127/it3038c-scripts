# Levi Huff
# Lab 8

# Print headers from a Wikipedia Article

import requests
from bs4 import BeautifulSoup

# Import your desired Wikipedia article in the url string
url = 'https://en.wikipedia.org/wiki/Team_Fortress_2'

# GET request / check
response = requests.get(url)
if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all headlines via div then print them
    headlines = soup.find_all('span', class_='mw-headline')
    for headline in headlines:
        print("Headline:", headline.text)
else:
    print("Failed to retrieve the page.")
