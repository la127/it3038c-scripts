import random
from datetime import datetime

def show_menu():
    print("Choose a game to play:")
    print("1. Calculate how many seconds old you are")
    print("2. Count letters, vowels, and consonants in a word")
    print("3. Play the Guess the Number game")
    print("4. Quit")

def calculate_seconds_old():
    birthday_date = input("Enter your birthday in MM/DD/YY format: ")
    
    try:
        birthdate = datetime.strptime(birthday_date, "%m/%d/%y")
        current_date = datetime.now()
        
        age_in_seconds = (current_date - birthdate).total_seconds()
        print(f"You are approximately {int(age_in_seconds)} seconds old.")
    except ValueError:
        print("Invalid date format. Please use MM/DD/YY.")

def count_letters_vowels_consonants(word):
    letters = len(word)
    vowels = sum(1 for char in word if char.lower() in 'aeiou')
    consonants = letters - vowels
    
    print(f"Word: {word}")
    print(f"Letters: {letters}")
    print(f"Vowels: {vowels}")
    print(f"Consonants: {consonants}")

def guess_the_number_game():
    # Generate a random number between 1 and 100
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 5  # only 5 tries

    print("Welcome to Guess the Number!")
    print("I'm thinking of a number between 1 and 100.")
    print(f"You have {max_attempts} attempts to guess the correct number.")

    while attempts < max_attempts:
        try:
            user_guess = int(input("Guess the number: "))
            attempts += 1

            if user_guess < secret_number:
                print("Too low! Try again.")
            elif user_guess > secret_number:
                print("Too high! Try again.")
            else:
                print(f"Congratulations! You guessed the number {secret_number} in {attempts} attempts.")
                break

            if attempts < max_attempts:
                print(f"You have {max_attempts - attempts} attempts left.")

        except ValueError:
            print("Invalid input. Please enter a valid number.")

    if attempts >= max_attempts:
        print(f"Sorry, you've used all {max_attempts} attempts. The secret number was {secret_number}.")

if __name__ == "__main__":
    while True:
        show_menu()
        choice = input("Enter your choice (1/2/3/4): ")

        if choice == "1":
            calculate_seconds_old()
        elif choice == "2":
            user_input = input("Enter a word: ")
            count_letters_vowels_consonants(user_input.lower())
        elif choice == "3":
            guess_the_number_game()
        elif choice == "4":
            print("Goodbye!")
            break
        else:
            print("Invalid choice. Please enter a valid option (1/2/3/4).")
