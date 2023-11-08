#####################
# Welcome to Cursor #
#####################

"""
Step 1: Try generating with Cmd+K or Ctrl+K on a new line. Ask for CLI-based game of TicTacToe.

Step 2: Hit Cmd+L or Ctrl+L and ask the chat what the code does.
   - Then, try running the code

Step 3: Try highlighting all the code with your mouse, then hit Cmd+k or Ctrl+K.
   - Instruct it to change the game in some way (e.g. add colors, add a start screen, make it 4x4 instead of 3x3)

Step 4: To try out cursor on your own projects, go to the file menu (top left) and open a folder.
"""


import os
from termcolor import colored


def print_board(board):
    for row in board:
        print(
            " ".join(
                [
                    colored(cell, "red")
                    if cell == "X"
                    else colored(cell, "blue")
                    if cell == "O"
                    else cell
                    for cell in row
                ]
            )
        )


def check_win(board):
    for row in board:
        if row.count(row[0]) == len(row) and row[0] != " ":
            return True

    for col in range(len(board)):
        check = []
        for row in board:
            check.append(row[col])
        if check.count(check[0]) == len(check) and check[0] != " ":
            return True

    if board[0][0] == board[1][1] == board[2][2] == board[3][3] and board[0][0] != " ":
        return True
    if board[0][3] == board[1][2] == board[2][1] == board[3][0] and board[0][3] != " ":
        return True

    return False


def tictactoe():
    os.system("clear")
    print("Welcome to Tic Tac Toe!")
    print("Player X is red and Player O is blue.")
    input("Press Enter to start...")
    os.system("clear")

    board = [[" " for _ in range(4)] for _ in range(4)]
    player = "X"

    while True:
        print_board(board)
        print("Player", player, "turn")
        row = int(input("Enter row: "))
        col = int(input("Enter column: "))

        if board[row][col] != " ":
            print("Invalid move, try again.")
            continue

        board[row][col] = player

        if check_win(board):
            print("Player", player, "wins!")
            break

        player = "O" if player == "X" else "X"


tictactoe()
