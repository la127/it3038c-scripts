import requests
import json  # Import the json module

# Fetch all widgets from the Node.js server
def get_all_widgets():
    response = requests.get('http://localhost:3000/')
    if response.status_code == 200:
        return response.json()
    else:
        print('Failed to fetch widgets')
        return None

# Fetch blue widgets from the Node.js server
def get_blue_widgets():
    response = requests.get('http://localhost:3000/blue')
    if response.status_code == 200:
        return response.json()
    else:
        print('Failed to fetch blue widgets')
        return None

# Fetch a specific widget by ID from the Node.js server
def get_widget_by_id(widget_id):
    response = requests.get(f'http://localhost:3000/widgets/{widget_id}')
    if response.status_code == 200:
        return response.json()
    else:
        print(f'Failed to fetch widget with ID {widget_id}')
        return None

# Example usage
all_widgets = get_all_widgets()
print("All Widgets:")
print(all_widgets)

blue_widgets = get_blue_widgets()
print("Blue Widgets:")
print(blue_widgets)

widget_id = 2  # Replace with an existing widget ID
widget = get_widget_by_id(widget_id)
print(f"Widget with ID {widget_id}:")
print(widget)

