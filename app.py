from flask import Flask, render_template
from keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing.image import load_img
import numpy as np
from flask import request, jsonify
import os
from werkzeug.utils import secure_filename
app = Flask(__name__)
model = load_model('model/model.keras', compile=False)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/klasifikasi')
def klasifikasi():
    return render_template('classification.html')

# Menguji model dengan input gambar
def load_and_preprocess_image(image_path):
    img = load_img(image_path, target_size=(224, 224))  # Resize gambar ke ukuran yang sesuai
    img = np.array(img) / 255.0  # Normalisasi
    img = np.expand_dims(img, axis=0)  # Tambahkan dimensi batch
    return img

@app.route('/proses', methods=['POST'])
def proses():
    labels = ['Bukan Tanah Gambut','Fibrik', 'Hemik', 'Saprik']
    
    if 'image' not in request.files:
        return jsonify({'error': 'Tidak ada file yang dikirim'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'Nama file kosong'}), 400
    filename = secure_filename(file.filename)
    filepath = os.path.join('uploads', filename)
    file.save(filepath)
    
    img = load_and_preprocess_image(filepath)
    predictions = model.predict(img)[0]
    pred_percent = [float(p) * 100 for p in predictions]
    max_index = np.argmax(predictions)
    confidence = round(pred_percent[max_index], 2)
    predict_label = labels[max_index]
    return jsonify({'kelas': predict_label, 'persentase': confidence})

if __name__ == '__main__':
    app.run(debug=True)