from flask import Flask, request, jsonify
from flask_cors import CORS 
app = Flask(__name__)
from someShitFunctions import get_state, display_board, check_termination, reset, new_move_dummy
CORS(app)
import numpy as np
import pickle
import json
import pandas as pd
from AgentSARSA import choose_action,update_qvalue,reward
board=np.zeros((3, 3),dtype=int)
@app.route('/api/logMove', methods=['POST'])
def receive_cell_data():
    #receives the move by the user from the frontend
    global board
    data = request.json
    row = data.get('row')
    col = data.get('col')
    move = data.get('move')
    if row==-1:
        board=reset(board)
        display_board(board)
        return jsonify({"message":"kardiya reset bc","termination":False})
    tStatus=check_termination(board,(row,col),1)
    '''
    if(tStatus!=-1):
        try:
           with open('q_values.json', 'r') as file:
                q_values = json.load(file)
                print("Loaded Q values:", q_values)
        except EOFError:
                print("File is empty or does not contain valid pickled data.")
        qValue=q_values.get(str(get_state(board)),0.0)    
        q_values[str(get_state(board))]=(qValue+0.1*(reward(board,(row,col),1)-qValue))    
        with open('q_values.json','w') as file:
            json.dump(q_values,file,indent=4)
    '''        
            
    board[row][col]=1
    
    if row is not None and col is not None:
        print(f"Received data - Row: {row}, Column: {col}, Move:{move}")
        display_board(board)
        if tStatus!=-1:
            board=reset(board)
            display_board(board)
        return jsonify({"message": "Maal mil gaya guysssss","termination":tStatus})
    else:
        return jsonify({"error": "Invalid data"}), 400            
@app.route('/api/newMove',methods=['GET'])  
def send_move():
    #sends the move by agent to the frontend
    global board
    move=choose_action(board,0)
    update_qvalue(board, move, 0.5, 1,2)
    row,col=move
    board[row][col]=2
    display_board(board)
    tStatus=check_termination(board)
    response =jsonify({
        "row":row,
        "col":col,
        "termination":tStatus
        })
    print(response.data)
    if(tStatus!=-1):
        board=reset(board)
        display_board(board)
    return response
if __name__ == '__main__':
    app.run(debug=True)
