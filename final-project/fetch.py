import requests
import matplotlib.pyplot as plt
from datetime import datetime

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
        timestamps = [datetime.now().strftime('%H:%M:%S') for _ in player_counts]
        plt.plot(timestamps, player_counts, marker='o')
        plt.title('TF2 Player Counts Over Time')
        plt.xlabel('Time')
        plt.ylabel('Player Count')
        plt.xticks(rotation=45)
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