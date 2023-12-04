import requests
import matplotlib.pyplot as plt
from datetime import datetime
import numpy as np
# pip install python-gobject
# pip install python-qt5

BASE_URL = 'http://localhost:3000/api'

def get_player_counts():
    url = f'{BASE_URL}/player-counts'
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()['playerCounts']
    else:
        return None

def plot_player_counts(player_counts):
    if player_counts:
        timestamps = [datetime.fromisoformat(entry['timestamp'].replace('Z', '+00:00')) for entry in player_counts]
        counts = [entry['count'] for entry in player_counts]

        # Create evenly spaced intervals for x-axis ticks
        x_ticks = np.linspace(0, len(timestamps) - 1, num=len(timestamps))
        
        plt.plot(x_ticks, counts, marker='o')
        plt.title('TF2 Player Counts Over Time')
        plt.xlabel('Time')
        plt.ylabel('Player Count')

        # Set x-axis labels to be the formatted timestamps
        plt.xticks(x_ticks, [timestamp.strftime('%Y-%m-%d %H:%M:%S') for timestamp in timestamps], rotation=45, ha='right')

        plt.tight_layout()
        plt.show()
    else:
        print("No player counts available.")

if __name__ == '__main__':
    # Fetch player counts
    player_counts = get_player_counts()

    # Display player counts in CLI
    print(f"TF2 Player Counts: {player_counts}")

    # Plot player counts
    plot_player_counts(player_counts)