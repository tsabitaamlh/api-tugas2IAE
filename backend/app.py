from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simulasi database
movies = []
id_counter = 1

@app.route('/movies', methods=['GET'])
def get_movies():
    return jsonify(movies)

@app.route('/movies', methods=['POST'])
def add_movie():
    global id_counter
    data = request.get_json()
    new_movie = {
        "id": id_counter,
        "title": data['title'],
        "year": data['year'],
        "rating": data['rating']
    }
    movies.append(new_movie)
    id_counter += 1
    return jsonify(new_movie), 201

@app.route('/movies/<int:id>', methods=['PUT'])
def update_movie(id):
    data = request.get_json()
    for movie in movies:
        if movie["id"] == id:
            movie["title"] = data["title"]
            movie["year"] = data["year"]
            movie["rating"] = data["rating"]
            return jsonify(movie)
    return jsonify({"error": "Movie not found"}), 404

@app.route('/movies/<int:id>', methods=['DELETE'])
def delete_movie(id):
    global movies
    movies = [m for m in movies if m["id"] != id]
    return jsonify({"message": "Movie deleted"})

if __name__ == '__main__':
    app.run(debug=True)
