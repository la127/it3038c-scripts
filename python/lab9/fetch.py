import requests

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

# Example usage to display widgets in the format "WidgetX is Color"
def display_widgets_info(widgets):
    print("Widgets Information:")
    for index, widget in enumerate(widgets, start=1):
        print(f"Widget{index} is {widget['color']}.")

# Example usage
all_widgets = get_all_widgets()
display_widgets_info(all_widgets)
