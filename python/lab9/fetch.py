import requests
import json

# Function to make a request to the Node.js server
def fetch_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f'Failed to fetch data from {url}')
        return None

# Fetch all widgets from the Node.js server
def get_all_widgets():
    return fetch_data('http://localhost:3000/')

# Fetch blue widgets from the Node.js server
def get_blue_widgets():
    return fetch_data('http://localhost:3000/blue')

# Fetch a specific widget by ID from the Node.js server
def get_widget_by_id(widget_id):
    return fetch_data(f'http://localhost:3000/widgets/{widget_id}')

# Example usage
all_widgets = get_all_widgets()
print("All Widgets:")
print(json.dumps(all_widgets, indent=2))

blue_widgets = get_blue_widgets()
print("Blue Widgets:")
print(json.dumps(blue_widgets, indent=2))

widget_id = 1  # Replace with an existing widget ID
widget = get_widget_by_id(widget_id)
print(f"Widget with ID {widget_id}:")
print(json.dumps(widget, indent=2))